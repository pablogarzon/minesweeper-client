import Vue from 'vue'
import Vuex from 'vuex'
import {GAME_STATES} from '../constants/gameStates'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameId: 0,
    gameState: GAME_STATES.NOT_STARTED.value,
    board: [],
    rows: 10,
    columns: 10,
    mines: 10,
    timer: 0
  },
  mutations: {
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
    updateCell (state, cell) {
      state.board[cell.coordinates.y][cell.coordinates.x].state = cell.state
      state.board[cell.coordinates.y][cell.coordinates.x].value = cell.value
    }
  },
  actions: {
    createBoard(context, payload) {
      let board = []
      for (let y = 0; y < payload.rows; y++) {
        let rowArr = []
        for (let x = 0; x < payload.columns; x++) {
          rowArr.push({ id:x + "-" + y, coordinates:{ x, y }, value:0, state: 0})
        }
        board.push(rowArr)
      }
      context.commit('setBoard', board)
    },
    async createGame (context, payload) {
      await context.dispatch('createBoard', payload)
      context.commit('setRows', payload.rows)
      context.commit('setColumns', payload.columns)
      context.commit('setMines', payload.mines)
    },
    async uncoverCell(context, payload) {
      //mock expose
      await context.commit('updateCell',{ coordinates:{ x: payload.coordinates.x, y: payload.coordinates.y}, state: 1, value: 4}
      )
    }
  },
  modules: {
  }
})
