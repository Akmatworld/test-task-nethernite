<template>
  <div id="app">
      <VPopup/>
      <VMain/>
  </div>
</template>

<script>
    import VMain from '@/components/VMain';
    import VPopup from "@/components/VPopup";

    export default {
        name: 'App',
        components: {
          VMain,
          VPopup,
        }
    }
</script>

<style lang="scss">
    * {
        box-sizing: border-box;
    }
    html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
    #app {
        height: 100%;
        font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
