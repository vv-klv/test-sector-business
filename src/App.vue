<template>
  <v-app class="app">
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
@import 'css/reset';
@import 'css/_variables.scss';

.app {
    font-family: Roboto, Arial, sans-serif;
}
</style>
