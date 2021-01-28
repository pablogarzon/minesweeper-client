<template>
  <v-container class="grey lighten-5">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="8">
        <v-card class="d-flex justify-center mb-6 mw-card" :ripple="false">
          <v-card
            class="pa-2"
            align="center"
            justify="center"
            outlined
            tile
            :ripple="false"
            :disabled="isBoardDisabled"
          >
            <v-row no-gutters v-for="(row, index) in board" :key="index">
              <Cell
                v-for="cell in row"
                :key="cell.id"
                :cell="cell"
              >
              </Cell>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="6" md="4">
        <v-row no-gutters>
          <v-card class="pa-2 mw-card" outlined tile>
            <v-row justify="center" align="center" class="mw-row">
              <v-icon color="warning" x-large>{{ icon }}</v-icon>
            </v-row>
            <v-row justify="center" align="center" class="mw-row">
              <Timer />
            </v-row>
            <v-row no-gutters class="mw-row">
              <GameButtons />
            </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Cell from "../components/Cell.vue";
import Timer from "../components/Timer.vue";
import GameButtons from "../components/GameButtons.vue";

import { GAME_ICONS } from '../constants/gameIcons';
import { GAME_STATES } from '../constants/gameStates';

export default {
  name: "Game",
  components: {
    Cell,
    Timer,
    GameButtons,
  },
  computed: {
    icon() {
      return GAME_ICONS[this.$store.state.gameState.name];
    },
    isBoardDisabled() {
      return this.$store.state.gameState !== GAME_STATES.ACTIVE
              && this.$store.state.gameState !== GAME_STATES.NOT_STARTED
    },
    rows() {
      return this.$store.state.rows;
    },
    columns() {
      return this.$store.state.columns;
    },
    board() {
      return this.$store.state.board;
    }
  },
};
</script>

<style scoped>
.row + .row {
  margin-top: 0;
}
.mw-card {
  padding: 2em !important;
}

.mw-row {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
</style>