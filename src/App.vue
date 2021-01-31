<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn href="https://github.com/" target="_blank" text>
        <span class="mr-2">view on github</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <div v-if="isLogged">
        <v-icon>mdi-account</v-icon>
        <strong v-html="user"></strong>
      </div>
      <v-menu bottom left v-if="isLogged">
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn text color="primary" @click="signout">
              <v-icon color="primary">mdi-account-switch</v-icon>
              Sign out
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default {
  name: "App",
  data: () => ({}),
  computed: {
    user() {
      return this.$store.state.user;
    },
    isLogged() {
      return !!this.user
    }
  },
  methods: {
    signout() {
      this.$store.dispatch('changeUser', '')
      this.$router.push("/");
    },
  },
};
</script>
