<script setup lang="ts">
// 定义待办事项的数据结构
interface TodoItem {
  id: number
  title: string
  completed: boolean
}

// 输入框绑定的数据
const newTodoTitle = ref('')

// 统一的待办事项列表
const todoList = ref<TodoItem[]>([])

// 通过计算属性分别获取“正在进行”和“已经完成”的列表
const activeTodos = computed(() => todoList.value.filter((todo) => !todo.completed))
const completedTodos = computed(() => todoList.value.filter((todo) => todo.completed))

// 添加新事项
const addTodo = () => {
  const title = newTodoTitle.value.trim()
  if (!title) return

  todoList.value.push({
    id: Date.now(),
    title,
    completed: false,
  })
  // 清空输入框
  newTodoTitle.value = ''
}

// 切换完成状态
const toggleTodo = (todo: TodoItem) => {
  todo.completed = !todo.completed
}

// 删除事项
const removeTodo = (id: number) => {
  todoList.value = todoList.value.filter((todo) => todo.id !== id)
}
//
const BlockText = ref<string>('Test')
</script>

<template>
  <div id="todolist_div">
    <h1 class="btn flex justify-center align-text-top">
      TODO-list
      <div class="i-fa7-regular:circle-user" />
    </h1>

    <Block :txt="BlockText" class="m-1"> </Block>
    <header id="todolist_header">
      <section>
        <!-- v-model 双向绑定，@keyup.enter 监听回车 -->
        <input
          v-model="newTodoTitle"
          type="text"
          id="title"
          name="title"
          placeholder="添加事项，按回车确认"
          autocomplete="off"
          @keyup.enter="addTodo"
        />
      </section>
    </header>

    <section id="last">
      <!-- 正在进行列表 -->
      <h2>
        正在进行<span id="todocount">{{ activeTodos.length }}</span>
      </h2>
      <ol id="todolist" class="demo-box">
        <li v-for="todo in activeTodos" :key="todo.id" @click="toggleTodo(todo)">
          <input type="checkbox" :checked="todo.completed" />
          <p>{{ todo.title }}</p>
          <a href="javascript:;" @click.stop="removeTodo(todo.id)">×</a>
        </li>
      </ol>

      <!-- 已经完成列表 -->
      <h2>
        已经完成<span id="donecount">{{ completedTodos.length }}</span>
      </h2>
      <ul id="donelist" class="demo-box">
        <li v-for="todo in completedTodos" :key="todo.id" @click="toggleTodo(todo)">
          <input type="checkbox" checked />
          <p>{{ todo.title }}</p>
          <a href="javascript:;" @click.stop="removeTodo(todo.id)">×</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="less" scoped>
/* 仅保留与 TODO 列表相关的核心样式 */
#todolist_div {
  width: 100%;
  z-index: 1;
  margin: 0 auto;
  max-width: 75rem;

  h1 {
    text-align: center;
    margin-top: 2rem;
  }

  header {
    position: relative;
    top: 20px;
    width: 100%;
    height: 100px;
    border: none;
    background-color: inherit;
  }

  section {
    width: 100%;
    align-items: center;
    padding: 0 auto;
  }

  header input {
    margin: 25px 5%;
    width: 90%;
    height: 50px;
    text-indent: 2em;
    border-radius: 50px;
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.5);
    border: none;

    &:focus {
      outline-width: 0;
    }
  }

  h2 {
    position: relative;
    padding: 0 5%;
  }

  span {
    position: absolute;
    top: 2px;
    right: 5px;
    display: inline-block;
    padding: 0 5px;
    height: 20px;
    border-radius: 20px;
    background: #e6e6fa;
    line-height: 22px;
    text-align: center;
    color: #666;
    font-size: 14px;
  }

  ol,
  ul {
    padding: 0;
    list-style: none;
    width: 90%;
    margin: 0 auto;
  }

  li {
    height: 32px;
    line-height: 32px;
    background: rgba(0, 0, 0, 0.3);
    position: relative;
    padding: 5px 45px;
    margin: 1.875rem 0;
    border-radius: 3px;
    border-left: 5px solid #629a9c;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07);
    cursor: pointer;

    input {
      position: absolute;
      left: 0.625rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.5625rem;
      height: 1.5625rem;
      cursor: pointer;
    }

    p {
      margin: 0;
      position: absolute;
      top: 6px;
      left: 40px;
      width: 70%;
      height: 20px;
      line-height: 20px;
      text-indent: 5px;
      font-size: 20px;
    }

    a {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      border-radius: 20px;
      border: 2px double #fff;
      background: #ccc;
      line-height: 20px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        background-color: red;
      }
    }

    &.done {
      border-left: 5px solid #999;
      opacity: 0.5;
      p {
        text-decoration: line-through;
        color: #999;
      }
    }
  }
}
</style>
