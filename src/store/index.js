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
    }
  },
  actions: {
    createBoard(context, payload) {
      let board = []
      for (let y = 0; y < payload.rows; y++) {
        let rowArr = []
        for (let x = 0; x < payload.columns; x++) {
          rowArr.push({ coordinates:{ x, y }, gameId: context.state.gameId })
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
    }
  },
  modules: {
  }
})
