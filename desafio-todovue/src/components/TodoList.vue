<template>
  <div>
    <!-- INPUT QUE O USUÁRIO INSERE A TERFA -->
    <input type="text" class="todo-input" placeholder="O que precisa ser feito?"
    v-model="newTodo" @keyup.enter="addTodo">
    <!-- DIV QUE APARECE QUANDO A TAREFA É INSERIDA -->
    <transition-group name="fade" enter-active-class="animated fadeInUp"
    leave-active-class="animated fadeOutDown">
    <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
      <!-- EDIÇÃO DE TAREFAS -->
      <div class="todo-item-left">
        <input type="checkbox" v-model="todo.completed">
        <div v-if="!todo.editing" @dblclick="editTodo(todo)"
        class="todo-item-label" :class="{ completed : todo.completed }">{{ todo.tarefa}}</div>
        <input v-else class="todo-item-edit" type="text"
         v-model="todo.title" @blur="doneEdit(todo)"
         @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)"
         v-focus>
      </div>
      <div class="remove-item" @click="removeTodo(index)">
        &times;
      </div>
    </div>
    </transition-group>

    <!-- DIV QUE MOSTRA INPUT E RESTANTES-->
    <div class="extra-container">
      <div><label> <input type="checkbox" :checked="!anyRemaining"
      @change="checkAllTodos"> Marcar todas </label></div>
      <div> {{ remaining }}  tarefas restantes </div>
    </div>

    <!-- DIV QUE BOTÕES DE AÇÃO-->
    <div class="extra-container">
      <div>
        <button :class="{ active: filter == 'all'}" @click="filter = 'all'">Todas</button>
        <button :class="{ active: filter == 'active'}" @click="filter = 'active'">Ativas</button>
        <button :class="{ active: filter == 'completed'}" @click="filter = 'completed'">Completadas</button>
      </div>

      <div>
        <transition name="fade">
        <button v-if="showClearCompletedButton" @click="clearCompleted">
          Limpar Completadas</button>
        </transition>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'todo-list',
  data () {
    return {
      newTodo: '',
      idForTodo: 3,
      beforeEitCache: '',
      filter: 'all',
      todos: [

      ]
    }
  },
  computed: {
    remaining() {
      return this.todos.filter( todo => !todo.completed).length
    },
    anyRemaining() {
      return this.remaining != 0
    },
    todosFiltered() {
      if (this.filter == 'all') {
        return this.todos
      } else if (this.filter == 'active') {
          return this.todos.filter(todo => !todo.completed)
      } else if (this.filter == 'completed') {
          return this.todos.filter(todo => todo.completed)
      }

      return this.todos
    },
    showClearCompletedButton() {
      return this.todos.filter(todo => todo.completed).length > 0
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return
      }

      this.todos.push({
        id: this.idForTodo,
        tarefa: this.newTodo,
        completed: false,
      })

      this.newTodo = ''
      this.idForTodo ++
    },
    editTodo(todo) {
      todo.editing = true
    },
    doneEdit(todo) {
      if (todo.tarefa.trim() == '') {
        todo.tarefa = this.beforeEitCache
      }
      todo.editing = false
    },
    cancelEdit(todo) {
      todo.tarefa = this.beforeEitCache = todo.tarefa
      todo.editing = false
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    },
    checkAllTodos() {
      this.todos.forEach((todo) => todo.completed = event.target.checked)
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
  }
  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.6s;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
  }
  .todo-item-left {
    display: flex;
    align-items: center;
  }
  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 122px;
  }
  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }
  button {
    font-size: 14px;
    background-color: white;
    appearance: none;
    border-radius: 20px;
  }
  .active {
    background: #41b982;
  }

  .fade-enter-active .fade-leave-active {
    transition:  opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
