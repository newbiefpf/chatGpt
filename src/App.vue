<template>
  <div id="app">
    <!-- <chatGroup /> -->
    <ChatBox />
  </div>
</template>

<script>
import ChatBox from "./components/ChatBox.vue";
// import chatGroup from "./components/chatGroup.vue";
export default {
  name: "App",
  components: {
    ChatBox,
    // chatGroup,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
html {
  margin: 0;
  padding: 0;
  background: rgba(52, 53, 65, 1);
}
body {
  margin: 0;
  padding: 0;
  min-width: 700px;
  overflow: hidden;
}
body::-webkit-scrollbar {
  width: 6px !important;
  background: #fff !important;
  border-radius: 6px;
}
body::-webkit-scrollbar-thumb {
  background: #aaa !important;
  height: 6px !important;
  border-radius: 6px;
}
</style>
