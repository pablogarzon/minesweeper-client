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
    setGameId(state, gameId) {
      state.gameId = gameId
    },
    updateGameState(state, gameState) {
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
  },
  actions: {
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
      context.commit('updateGameState', GAME_STATES.NOT_STARTED)
      context.commit('setRows', payload.rows)
      context.commit('setColumns', payload.columns)
      context.commit('setMines', payload.mines)
      context.commit('resetTime')
      context.dispatch('createBoard', payload)
      // call api for get gameId
      // context.commit('setGameId', received gameId)
    },
    async createNewGameWithSameDimensions(context) {
      console.log("ping");
      // call api 
      context.dispatch('updateGameState', GAME_STATES.ABANDONED)
      //
      await context.dispatch('createGame', {
        rows: context.state.rows,
        columns: context.state.columns,
        mines: context.state.mines
      })
    },
    setGameStateToActive(context) {
      interval = setInterval(() => context.commit('incrementTime'), 1000)
      context.commit('updateGameState', GAME_STATES.ACTIVE)
    },
    async startGame(context, payload) {
      await context.dispatch('loadUncoveredCells', payload)
      context.dispatch('setGameStateToActive')
    },
    updateGameState(context, gameState) {
      clearInterval(interval)
      context.commit('updateGameState', gameState)
    },
    async uncoverCell(context, payload) {
      if (context.state.gameState == GAME_STATES.NOT_STARTED) {
        return context.dispatch('startGame', payload)
      }
      await context.dispatch('loadUncoveredCells', payload)
    },
    async loadUncoveredCells(context, payload) {
      // call api
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
      // ----
    },
    updateCellState() { //(context, payload) {
      // call api
    }
  },
  modules: {
  }
})
