<template>
  <v-container class="grey lighten-5">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="8">
        <v-card class="d-flex justify-center mb-6">
          <v-card
            class="pa-2"
            align="center"
            justify="center"
            outlined
            tile
            :disabled="isBoardDisabled"
          >
            <v-row no-gutters v-for="(row, index) in board" :key="index">
              <Cell
                v-for="square in row"
                :key="square.coordinates"
                :square="square"
              >
              </Cell>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="6" md="4">
        <v-row no-gutters>
          <v-card class="pa-2" outlined tile>
            <v-row justify="center" align="center">
              <v-icon color="warning" x-large>{{ icon }}</v-icon>
            </v-row>
            <v-row justify="center" align="center">
              <Timer />
            </v-row>
            <v-row no-gutters>
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

export default {
  name: "Game",
  components: {
    Cell,
    Timer,
    GameButtons,
  },
  computed: {
    icon() {
      return "mdi-emoticon";
    },
    isBoardDisabled() {
      return true;
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