<template>
  <div>
    <v-card flat>
      <v-subheader>Rows:</v-subheader>
      <v-card-text>
        <v-slider
          v-model="rows"
          step="1"
          ticks="always"
          tick-size="4"
          :thumb-size="24"
          thumb-label="always"
          min="10"
          max="20"
        ></v-slider>
      </v-card-text>

      <v-subheader>Columns:</v-subheader>
      <v-card-text>
        <v-slider
          v-model="columns"
          step="1"
          ticks="always"
          tick-size="4"
          :thumb-size="24"
          thumb-label="always"
          min="10"
          max="20"
        ></v-slider>
      </v-card-text>

      <v-subheader>Mines:</v-subheader>
      <v-card-text>
        <v-slider
          v-model="mines"
          step="1"
          ticks="always"
          tick-size="4"
          :thumb-size="24"
          thumb-label="always"
          min="10"
          :max="maxMines"
        ></v-slider>
      </v-card-text>
      <v-card-text>
        <div class="text-center">
          <v-btn class="ma-2" outlined color="indigo" @click="play">
            Play
          </v-btn>
          <v-btn class="ma-2" outlined color="indigo" @click="cancel">
            Cancel
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      rows: 10,
      columns: 10,
      mines: 10,
    }
  },
  methods: {
    play() {
      this.$router.push('/game')
    },
    cancel() {
      this.$router.push('/game')
    },
  },
  computed: {
    maxMines: function () {
      return (this.rows * this.columns) / 2
    },
  },
}
</script>

<style scoped>
</style>