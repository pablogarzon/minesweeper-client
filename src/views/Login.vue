<template>
  <v-container>
    <v-card flat>
      <v-card class="mx-auto" max-width="500" tile>
        <v-list flat>
          <v-subheader>click to select user and play:</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="item in users"
              :key="item.user"
              @click="play"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.user"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-card>
          <v-form>
            <v-subheader>Create a new one:</v-subheader>
            <v-row no-gutters class="mw-margin">
              <v-col cols="10" sm="8" md="10" class="mw-padded">
                <v-text-field label="Create User"></v-text-field>
              </v-col>
              <v-col cols="2" md="2">
                <v-btn class="ma-2" outlined color="indigo" @click="add">
                  <v-icon> mdi-account-plus-outline </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-card>
    </v-card>
  </v-container>
</template>

<script lang="ts">
export default {
  name: "Login",
  data() {
    return {
      selectedItem: '',
      users: [{ user: "Pablo" }, { user: "Gabriel" }, { user: "Mard" }],
    };
  },
  methods: {
    play(e) {
      this.selectedItem = e.target.innerHTML
      if(this.selectedItem === '' || this.selectedItem.includes('<div')) {
          return
      }
      this.$store.dispatch('changeUser', this.selectedItem)
      this.$router.push('/settings')
    },
    add() {
      console.log("bump nena");
    },
  },
};
</script>

<style scoped>
.mw-padded {
    padding-left: 5px !important;
    padding-right: 5px !important;
}

.v-item--active {
    background-color: aliceblue;
}
</style>