import Vue from 'vue'
import Vuex from 'vuex'
import { GAME_STATES } from '../constants/gameStates'

Vue.use(Vuex)

let interval = null

export default new Vuex.Store({
  state: {
    gameId: 0,
    gameState: GAME_STATES.NOT_STARTED,
    board: [],
    rows: 10,
    columns: 10,
    mines: 10,
    time: 0
  },
  mutations: {
    updateGameState(state, gameState) {
      state.gameState = gameState
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
    setBoard(state, board) {
      state.board = board
    },
    updateCell(state, cell) {
      state.board[cell.coordinates.y][cell.coordinates.x].state = cell.state
      state.board[cell.coordinates.y][cell.coordinates.x].value = cell.value
    },
    incrementTime(state) {
      state.time++
    }
  },
  actions: {
    createBoard(context, payload) {
      let board = []
      for (let y = 0; y < payload.rows; y++) {
        let rowArr = []
        for (let x = 0; x < payload.columns; x++) {
          rowArr.push({ id: x + "-" + y, coordinates: { x, y }, value: 0, state: 0 })
        }
        board.push(rowArr)
      }
      context.commit('setBoard', board)
    },
    async createGame(context, payload) {
      await context.dispatch('createBoard', payload)
      context.commit('setRows', payload.rows)
      context.commit('setColumns', payload.columns)
      context.commit('setMines', payload.mines)
    },
    setGameStateToActive(context) {
      interval = setInterval(() => context.commit('incrementTime'), 1000)
      context.commit('updateGameState', GAME_STATES.ACTIVE)
    },
    setGameStateToPause(context) {
      clearInterval(interval)
      context.commit('updateGameState', GAME_STATES.PAUSED)
    },
    setGameStateToFail(context) {
      clearInterval(interval)
      context.commit('updateGameState', GAME_STATES.FAIL)
    },
    async uncoverCell(context, payload) {
      //mock expose
      if (context.state.gameState == GAME_STATES.ACTIVE) {
        context.dispatch("setGameStateToFail")
        return
      }
      if (context.state.gameState == GAME_STATES.NOT_STARTED) {
        context.dispatch("setGameStateToActive")
      }
      let response = [
        { coordinates: { x: payload.coordinates.x, y: payload.coordinates.y }, state: 1, value: 0 },
        { coordinates: { x: 1, y: 3 }, state: 1, value: 0 },
        { coordinates: { x: 1, y: 4 }, state: 1, value: 0 },
        { coordinates: { x: 1, y: 2 }, state: 1, value: 1 },
        { coordinates: { x: 3, y: 2 }, state: 1, value: 2 },
        { coordinates: { x: 0, y: 1 }, state: 1, value: 3 },
        { coordinates: { x: 2, y: 2 }, state: 1, value: 4 },
        { coordinates: { x: 0, y: 0 }, state: 1, value: 5 },
        { coordinates: { x: 5, y: 6 }, state: 1, value: 6 },
        { coordinates: { x: 4, y: 7 }, state: 1, value: 7 },
        { coordinates: { x: 2, y: 3 }, state: 1, value: 8 }
      ]
      response.forEach(element => {
        context.commit('updateCell', element)
      })
    }
  },
  modules: {
  }
})
