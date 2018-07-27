<template>
  <div class="helper">
    <span class="left">{{unFinishedTodoLen}} items left</span>
    <span class="tabs">
      <span
        v-for="state in states"
        :key="state"
        :class="[filter === state ? 'active' : '']"
        @click="toggleFilter(state)"
      >
        {{state}}
      </span>
    </span>
    <span class="clear" @click="clearAllCompleted">Clear Completed</span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true,
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      states: ['all', 'active', 'completed']
    }
  },
  computed: {
    unFinishedTodoLen() {
      return this.todos.filter(todo => !todo.completed).length
    }
  },
  methods: {
    toggleFilter(state) {
      this.$emit('toggle', state)
    },
    clearAllCompleted() {
      this.$emit('clearAllCompleted')
    }
  }
}
</script>

<style lang="stylus" scoped>

.helper {
  padding 20px 0 20px 20px
  background #fff

  span {
    display inline-block

    &.left {
      margin-right 110px
    }
    &.tabs {
      margin-right 30px
      span {
        display inline-block
        margin-right 10px
        padding 10px
        cursor pointer

        &.active {
          border 1px solid #999
          border-radius 10px
          background rgba(200,200,200,0.1)
        }
      }
    }
    &.clear {
      font-size 18px 
      cursor pointer
    }
  }
}
</style>


