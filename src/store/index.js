import Vue from 'vue'
import Vuex from 'vuex'
import { GAME_STATES } from '../constants/gameStates'
import { CELL_STATES } from '../constants/cellStates'

Vue.use(Vuex)

let interval = null

const state = {
  gameId: 0,
  gameState: GAME_STATES.NOT_STARTED,
  board: [],
  rows: 10,
  columns: 10,
  mines: 10,
  time: 0,
  user: '',
  dialog: false
}

const mutations = {
  setGameId(state, gameId) {
    state.gameId = gameId
  },
  setGameState(state, gameState) {
    state.gameState = gameState
  },
  setBoard(state, board) {
    state.board = board
  },
  setRows(state, rows) {
    state.rows = rows
  },
  setColumns(state, columns) {
    state.columns = columns
  },
  setMines(state, mines) {
    state.mines = mines
  },
  resetTime(state) {
    state.time = 0
  },
  incrementTime(state) {
    state.time++
  },
  updateCell(state, cell) {
    state.board[cell.coordinates.y][cell.coordinates.x].state = cell.state
    state.board[cell.coordinates.y][cell.coordinates.x].value = cell.value
    state.board[cell.coordinates.y][cell.coordinates.x].hasMine = cell.hasMine
  },
  setUser(state, user) {
    state.user = user
  },
  setDialog(state, dialog) {
    state.dialog = dialog
  }
}

const actions = {
  createBoard(context, payload) {
    let board = []
    for (let y = 0; y < payload.rows; y++) {
      let rowArr = []
      for (let x = 0; x < payload.columns; x++) {
        rowArr.push({ id: x + '-' + y, coordinates: { x, y }, value: 0, state: CELL_STATES.COVERED, hasMine: false })
      }
      board.push(rowArr)
    }
    context.commit('setBoard', board)
  },
  async createGame(context, payload) {
    try {
      if (context.state.gameId !== 0) {
        context.dispatch('abandoneGame') 
      }
      const body = { rows: payload.rows, columns: payload.columns, mines: payload.mines }
      const result = await Vue.axios.post('/game/create', body)
      context.commit('setGameId', result.data.gameId)
      context.commit('setGameState', GAME_STATES.NOT_STARTED)
      context.commit('setRows', payload.rows)
      context.commit('setColumns', payload.columns)
      context.commit('setMines', payload.mines)
      context.commit('resetTime')
      context.dispatch('createBoard', payload)
    } catch (error) {
      console.log(error)
    }
  },
  async createNewGameWithSameDimensions(context) {
    await context.dispatch('createGame', {
      rows: context.state.rows,
      columns: context.state.columns,
      mines: context.state.mines
    })
  },
  updateGameState(context, newGameState) {
    console.log(newGameState)
    const previousState = context.state.gameState
    if (previousState === newGameState) {
      return
    }
    if (newGameState === GAME_STATES.ACTIVE) {
      interval = setInterval(() => context.commit('incrementTime'), 1000)
    } else {
      clearInterval(interval)
    } 
    if (newGameState === GAME_STATES.VICTORY) {
      // call api to get user stats
      context.dispatch('showDialog', true)
    }
    context.commit('setGameState', newGameState)
  },
  async pauseGame(context) {
    context.dispatch('updateGameState', GAME_STATES.PAUSED)
    await Vue.axios.patch(`game/${context.state.gameId}/pause`, {time: context.state.time})
  },
  async resumeGame(context) {
    context.dispatch('updateGameState', GAME_STATES.ACTIVE)
    await Vue.axios.patch(`game/${context.state.gameId}/resume`)
  },
  async abandoneGame(context) {
    context.dispatch('updateGameState', GAME_STATES.ABANDONED)
    // await Vue.axios.patch(`game/${context.state.gameId}/abandone`)
  },
  async uncoverCell(context, payload) {
    try {
      const body = { coordinates: payload.coordinates, gameId: context.state.gameId }
      const result = await Vue.axios.post(`/game/move`, body)
      result.data.uncoveredCells.forEach(element => {
        element.state = CELL_STATES.UNCOVERED
        context.commit('updateCell', element)
      })
      context.dispatch('updateGameState', GAME_STATES[result.data.gameState])
    } catch (error) {
      console.log(error)
    }
  },
  async updateCellState(context, payload) { //(context, payload) {
    const gameId = context.state.gameId
    const body = {coordinates: payload.coordinates, state: payload.state.value }
    await Vue.axios.patch(`/game/${gameId}/updateCell`, body)
  },
  changeUser(context, user) {
    context.commit('setUser', user)
  },
  showDialog(context, dialog) {
    context.commit('setDialog', dialog)
  }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions
})
