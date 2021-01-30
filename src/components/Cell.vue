<template>
  <v-btn
    class="pa-2 mw-cell"
    color="grey"
    outlined
    @click="uncover"
    @click.right="mark"
  >
    <v-icon large :color="icon.color">
      {{ icon.icon }}
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import { CELL_ICONS } from "../constants/cellIcons";
import { CELL_STATES } from "../constants/cellStates";

export default {
  name: "Cell",
  props: {
    cell: {
      type: Object,
      required: true,
    },
  },
  computed: {
    icon() {
      if (this.cell.state === CELL_STATES.UNCOVERED) {
        return CELL_ICONS[this.cell.value];
      }
      if (this.cell.hasMine) {
        return CELL_ICONS["MINE"];
      }
      return CELL_ICONS[this.cell.state.name];
    },
  },
  methods: {
    uncover() {
      if (this.cell.state === CELL_STATES.UNCOVERED) {
        return;
      }
      this.$store.dispatch("uncoverCell", this.cell);
    },
    mark() {
      if (this.cell.state === CELL_STATES.UNCOVERED) {
        return;
      }
      if (this.cell.state === CELL_STATES.COVERED) {
        this.cell.state = CELL_STATES.MARKED_WITH_FLAG;
      } else if (this.cell.state === CELL_STATES.MARKED_WITH_FLAG) {
        this.cell.state = CELL_STATES.MARKED_WITH_QUESTION;
      } else {
        this.cell.state = CELL_STATES.COVERED;
      }
      this.$store.dispatch("updateCellState", this.cell);
    },
  },
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 54px;
}
.mw-cell {
  padding: 8px !important;
}
</style>