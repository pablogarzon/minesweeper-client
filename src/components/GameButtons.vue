<template>
  <div class="text-center">
    <div class="my-2">
      <v-btn
        color="info"
        dark
        outlined
        style="min-width: 200px"
        :disabled="isNewGameDisabled"
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
export default {
  data() {
    return {
      activeLabel: "Pause Game",
      pausedLabel: "Resume Game",
    };
  },
  methods: {
    changeDificulty() {
      this.$router.push('/settings')
    },
    pauseGame() {},
  },
  computed: {
    gameState() {
      return null;
    },
    pauseGameButtonLabel() {
      return this.activeLabel;
    },
    isNewGameDisabled() {
      return false;
    },
    isResumeGameDisabled() {
      return false;
    },
  },
};
</script>

<style scoped>
</style>