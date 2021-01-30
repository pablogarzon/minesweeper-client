<template>
  <v-chip class="ma-2">
    <v-avatar left>
      <v-icon>mdi-timer-outline</v-icon>
    </v-avatar>
    {{ label }}
  </v-chip>
</template>

<script lang="ts">
export default {
  computed: {
    label() {
      var date = new Date(0);
      date.setSeconds(this.$store.state.time);
      return date.toISOString().substr(11, 8);
    },
  },
};
</script>

<style scoped>
</style>