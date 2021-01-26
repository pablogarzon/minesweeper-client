<template>
  <v-btn
    class="pa-2 mw-cell"
    color="grey"
    outlined
    @click="uncover"
    @click.right="mark"
    :disabled="isDisabled"
  >
    <v-icon large :color="icon.color">
      {{ icon.icon }}
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import {CELL_ICONS} from '../constants/cellIcons'

export default {
  name: "Cell",
  props: {
      cell: {
          type: Object
      }
  },
  computed: {
    icon() {
      return CELL_ICONS[this.cell.value]
    },
    isDisabled() {
      return false
    },
  },
  methods: {
    uncover() {
        this.$store.dispatch('uncoverCell', this.cell)
    },
    mark() {
        return this.cell.value='FLAG'
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