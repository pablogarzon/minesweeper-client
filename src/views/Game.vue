<template>
  <v-container class="grey lighten-5">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="8">
        <v-card class="d-flex justify-center mb-6 mw-card">
          <v-card
            class="pa-2"
            align="center"
            justify="center"
            outlined
            tile
            :disabled="isBoardDisabled"
          >
            <v-row no-gutters v-for="(row, y) in rows" :key="y">
              <Cell
                v-for="(column, x) in columns"
                :key="x"
                :cell="{
                  y,
                  x,
                }"
              >
              </Cell>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="6" md="4">
        <v-row no-gutters>
          <v-card class="pa-2 game-card" outlined tile>
            <v-row class="mw-row" justify="center" align="center">
              <v-icon color="warning" x-large>{{ icon }}</v-icon>
            </v-row>
            <v-row class="mw-row" justify="center" align="center">
              <Timer/>
            </v-row>
            <v-row no-gutters>
              <GameButtons/>
            </v-row>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Cell from '../components/Cell.vue'
import Timer from '../components/Timer.vue'
import GameButtons from '../components/GameButtons.vue'

export default {
  name: 'Game',
  components: {
    Cell,
    Timer,
    GameButtons
  },
  computed: {
    icon() {
      return 'mdi-emoticon';
    },
    isBoardDisabled() {
      return true;
    },
    rows() {
      return 10;
    },
    columns() {
      return 10;
    },
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