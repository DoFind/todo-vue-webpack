<template>
  <section class="real-app">
    <input 
      type="text"
      class="add-input"
      autofocus='autofocus'
      placeholder="接下來做什麼？"
      @keyup.enter="addTodo"
    >
    <!-- <item :todo="todo"></item> -->
    <item
      :todo='todo'
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del='deleteTodo'
    />
    <tabs 
      :filter="filter" 
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    />
  </section>
</template> 

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  data() {
    return {
      // todo: {
      //   id: 0,
      //   content: 'this is todo',
      //   completed: false
      // },
      todos: [
        {
          id: id++,
          content: '吃饭',
          completed: false
        },
        {
          id: id++,
          content: '睡觉',
          completed: true
        },
        {
          id: id++,
          content: '打豆豆',
          completed: false
        }
      ],
      filter: 'all'
    }
  },
  components: {
    Item,
    Tabs,
  },
  computed: {
    filteredTodos() {
      if(this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo(e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter(state) {
      this.filter = state
    },
    clearAllCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  position: relative;
  margin: 0;
  padding: 16px 16px 16px 60px;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: none;
  outline: none;
  box-sizing: border-box;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.3)
}
</style>


