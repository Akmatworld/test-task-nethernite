<template>
  <div id="app">
      <div class="wrapper">
          <VPopup/>
          <VHeader/>
          <VContent/>
      </div>
      <VFooter/>
  </div>
</template>

<script>
    import VHeader from "@/components/VHeader";
    import VContent from "@/components/VContent";
    import VFooter from "@/components/VFooter";
    import VPopup from "@/components/VPopup";
    import {eventEmitter} from "./main";

    export default {
        name: 'App',
        components: {
            VContent,
            VFooter,
            VPopup,
            VHeader,
        },
        created() {
            window.addEventListener('keyup', (e) => {
                if (e.keyCode === 27)
                    eventEmitter.$emit('closePopup');
            });
        },
        beforeDestroy() {
            window.removeEventListener('keyup');
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
        position: relative;
        font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
        height: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        max-width: 1200px;
        margin: 0 auto;
    }
    .wrapper {
        min-height: 100%;
    }
</style>
