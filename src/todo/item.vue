<template>
  <div :class="['todo-item', todo.completed ? 'completed' : '', todo === editTodos ? 'editing' : '']"> 
    <div class="list-item">
      <input 
        type="checkbox"
        class="toggle"
        v-model="todo.completed"
      />
      <label class="label" @dblclick="eidtTodo">{{todo.content}}</label>
      <button class="destory" @click="deleteTodo"></button>
    </div>
    <input
      type="text"  
      class="edit-item" 
      v-focus="editTodos === todo" 
      v-model="todo.content"
      @blur="editedTodo()" 
      @keyup.enter="editedTodo()" 
      @keyup.esc="cancelTodo()" 
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      beforeContent: ''
    }
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
    editTodos: {
      type: Object
    }
  },
  methods: {
    deleteTodo() {
      // 父组件通过 props 传进来， 子组件通过事件告诉父组件
      this.$emit('del', this.todo)
    },

    // 从父级传过来的值要在父级修改
    eidtTodo() {
      // console.log(this.todo.id);
      this.beforeContent = this.todo.content;
      this.$emit('eidtTodo', this.todo);
    },
    cancelTodo() {
      this.todo.content = this.beforeContent;
      this.beforeContent = '';
      this.$emit('editedTodo', this.todo);
    },
    editedTodo() {
      // console.log('1:'+this.todo.content);
      this.beforeContent = '';
      this.$emit('editedTodo', this.todo);
    }
  },
  directives:{
    "focus":{
      update(el,binding){
        if(binding.value){
          el.focus();
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

.todo-item {
  position relative
  font-size 20px
  border-bottom 1px solid rgba(0,0,0,0.06)
  background #fff

  &:hover {
    .destory:after {
      content url('../assets/images/close.png')
    }
  }

  .label {
    display block
    padding 15px 60px 15px
    white-space pre-line
    word-break break-all
    line-height 1.2
    transition color 0.4s
  }

  &.completed {
    .label {
      text-decoration line-through
      color #d9d9d9
    }
  }
  
  .edit-item  {
    display none
  }

  &.editing {

    .list-item {
      display none
    }
    .edit-item {
      display block
      width 490px
      padding 12px 17px
      margin 0 0 0 60px
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

