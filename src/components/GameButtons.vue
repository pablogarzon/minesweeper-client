<template>
  <div class="text-center">
    <div class="my-2">
      <v-btn
        color="info"
        dark
        outlined
        style="min-width: 200px"
        :disabled="isNewGameDisabled"
        @click="createNewGame"
      >
        New Game
      </v-btn>
    </div>
    <div class="my-2">
      <v-btn
        color="info"
        dark
        outlined
        style="min-width: 200px"
        @click="changeDificulty"
      >
        Change Difficulty
      </v-btn>
    </div>
    <div class="my-2">
      <v-btn
        color="info"
        dark
        outlined
        style="min-width: 200px"
        :disabled="isResumeGameDisabled"
        @click="pauseGame"
      >
        {{ pauseGameButtonLabel }}
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { GAME_STATES } from '../constants/gameStates'

export default {
  data() {
    return {
      activeLabel: 'Pause Game',
      pausedLabel: 'Resume Game',
    }
  },
  methods: {
    createNewGame() {
      this.$store.dispatch('createNewGameWithSameDimensions')
    },
    changeDificulty() {
      this.$store.dispatch('updateGameState', GAME_STATES.ABANDONED)
      this.$router.push('/settings')
    },
    pauseGame() {
      if (this.gameState === GAME_STATES.ACTIVE) {
        this.$store.dispatch('updateGameState', GAME_STATES.PAUSED)
      } else {
        this.$store.dispatch('setGameStateToActive')
      }
    },
  },
  computed: {
    gameState() {
      return this.$store.state.gameState
    },
    pauseGameButtonLabel() {
      if (this.gameState === GAME_STATES.ACTIVE) {
        return this.activeLabel
      } else {
        return this.pausedLabel
      }
    },
    isNewGameDisabled() {
      return this.gameState === GAME_STATES.NOT_STARTED
    },
    isResumeGameDisabled() {
      return (
        this.gameState !== GAME_STATES.ACTIVE &&
        this.gameState !== GAME_STATES.PAUSED
      )
    },
  },
}
</script>

<style scoped>
</style>