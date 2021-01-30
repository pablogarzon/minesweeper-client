import Vue from 'vue'
import Vuex from 'vuex'
import { GAME_STATES } from '../constants/gameStates'
import { CELL_STATES } from '../constants/cellStates'

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
          rowArr.push({ id: x + "-" + y, coordinates: { x, y }, value: 0, state: CELL_STATES.COVERED, hasMine: false })
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
        //context.dispatch("setGameStateToFail")
        return
      }
      if (context.state.gameState == GAME_STATES.NOT_STARTED) {
        context.dispatch('setGameStateToActive')
      }
      let response = [
        { coordinates: { x: payload.coordinates.x, y: payload.coordinates.y }, state: CELL_STATES.UNCOVERED, value: 0, hasMine: false },
        { coordinates: { x: 1, y: 3 }, state: CELL_STATES.UNCOVERED, value: 0, hasMine: false },
        { coordinates: { x: 1, y: 4 }, state: CELL_STATES.UNCOVERED, value: 0, hasMine: true },
        { coordinates: { x: 1, y: 2 }, state: CELL_STATES.UNCOVERED, value: 1, hasMine: false },
        { coordinates: { x: 3, y: 2 }, state: CELL_STATES.UNCOVERED, value: 2, hasMine: false },
        { coordinates: { x: 0, y: 1 }, state: CELL_STATES.UNCOVERED, value: 3, hasMine: false },
        { coordinates: { x: 2, y: 2 }, state: CELL_STATES.UNCOVERED, value: 4, hasMine: false },
        { coordinates: { x: 0, y: 0 }, state: CELL_STATES.UNCOVERED, value: 5, hasMine: false },
        { coordinates: { x: 5, y: 6 }, state: CELL_STATES.UNCOVERED, value: 6, hasMine: false },
        { coordinates: { x: 4, y: 7 }, state: CELL_STATES.UNCOVERED, value: 7, hasMine: false },
        { coordinates: { x: 2, y: 3 }, state: CELL_STATES.UNCOVERED, value: 8, hasMine: false }
      ]
      response.forEach(element => {
        context.commit('updateCell', element)
      })
    },
    updateCellState(context, payload){
      console.log('updateCellState', payload.state.name);
    },
  },
  modules: {
  }
})
