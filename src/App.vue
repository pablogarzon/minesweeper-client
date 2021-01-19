<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-btn
        href="https://github.com/"
        target="_blank"
        text
      >
        <span class="mr-2">view on github</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Game/>
    </v-main>
  </v-app>
</template>

<script lang="ts"> 
  import Game from './views/Game.vue'

  export default {
    name: 'App',

    components: {
      Game,
    },

    data: () => ({
      //
    }),
  };
</script>
