<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <todo></todo>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './todo/header.vue'
import Todo from './todo/todo.vue'
import Footer from './todo/footer.vue'


export default {
  components: {
    Header,
    Footer,
    Todo,
  }
}

</script>

<style scoped>
#app {
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
} 
#cover {
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  background: rgba(144,144,144,0.9);
  z-index: -1;
}
</style>
