<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline"> User last games: </v-card-title>
        <v-simple-table fixed-header height="300px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Rows</th>
                <th class="text-left">Columns</th>
                <th class="text-left">Mines</th>
                <th class="text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in userStats" :key="i">
                <td>{{ item.rows }}</td>
                <td>{{ item.columns }}</td>
                <td>{{ item.mines }}</td>
                <td>{{ item.time }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDialog">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
export default {
  data() {
    return {
      desserts: [],
    };
  },
  computed: {
    dialog() {
      return this.$store.state.dialog;
    },
  },
  methods: {
    closeDialog() {
      this.$store.dispatch("showDialog", false);
    },
  },
};
</script>

<style scoped>
</style>