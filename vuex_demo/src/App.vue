<template>
  <div id="app">
    <add-todo></add-todo>
    <todo-list></todo-list>
  </div>
</template>

<script>
  import addTodo from './components/addTodo'
  import todoList from './components/todoList'
  export default {
    components: {
      addTodo,
      todoList
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
