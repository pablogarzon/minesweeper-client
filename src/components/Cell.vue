<template>
  <v-btn
    class="pa-2"
    color="grey"
    outlined
    @click="expose"
    @click.right="mark"
    :disabled="isDisabled"
  >
    <v-icon large color="black darken-2">
      {{ icon }}
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
export default {
  name: "Cell",
  props: ["cell"],
  data() {
    return {
      state: 1,
      hasMine: false,
    };
  },
  computed: {
    icon() {
      return "";
    },
    isDisabled() {
      return false;
    },
  },
  methods: {
    expose() {},
    mark() {},
  },
};
</script>

<style scoped>
.v-btn:not(.v-btn--round).v-size--default {
  min-width: 36px;
}
</style>