<template>
  <div id="app" class="container">
    <div class="title-todo"> Lista de Tarefas com VueJs</div><img src="./assets/logo.png" class="logo">
    <todo-list></todo-list>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import TodoList from './components/TodoList' //Setando o novo componente

export default {
  name: 'App',
  components: {
    HelloWorld,
    TodoList, //exportando componente
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

.title-todo {
  text-align: center;
  font-family: Arial Rounded MT;
  color: #41b982;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}
</style>
