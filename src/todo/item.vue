<template>
  <div :class="['todo-item', todo.completed ? 'completed' : '']">
    <input 
      type="checkbox"
      class="toggle"
      v-model="todo.completed"
    >
    <label>{{todo.content}}</label>
    <button class="destory" @click="deleteTodo"></button>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    }
  },
  methods: {
    deleteTodo() {
      // 父组件通过 props 传进来， 子组件通过事件告诉父组件
      this.$emit('del', this.todo.id)
    }
  }
}
</script>

<style lang="stylus" scoped>

.todo-item {
  position relative
  font-size 24px
  border-bottom 1px solid rgba(0,0,0,0.06)
  background #fff

  &:hover {
    .destory:after {
      content url('../assets/images/close.png')
    }
  }

  label {
    display block
    padding 15px 60px 15px
    white-space pre-line
    word-break break-all
    line-height 1.2
    transition color 0.4s
  }

  &.completed {
    label {
      text-decoration line-through
      color #d9d9d9
    }
  }
}

.toggle {
  position absolute
  top 0
  bottom 0
  width 40px
  height 40px
  text-align center
  border none
  appearance none
  outline none 
  cursor pointer

  &:after {
    content url('../assets/images/round.png')
  }
  &:checked:after {
    content url('../assets/images/done.png')
  }
}

.destory {
  position absolute
  top 4px
  right 10px
  border none
  appearance none
  outline none 
  background transparent 
  cursor pointer
}
</style>

