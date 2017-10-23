<template>
	<div>
		<div class="addTodo">
			<!--trim属性用来过滤空格-->
			<input type="text" v-model="todoText" placeholder="今天要做点什么呢..." @keydown.enter="addTodoSomething">
			<button @click="addTodoSomething">增加</button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				todoText: ''
			}
		},
		methods: {
			//映射方法在click里面传参数
			...mapActions([
					'addTodo'
				]),
			addTodoSomething() {
				this.addTodo(this.todoText)
				this.todoText = ''
			}
		}
	}
</script>

<style scoped>
/*不让外部组件访问*/
  input{
    width: 200px;
    height:35px;
    border-radius: 2px;
    border:1px solid #a5a5a5;
    margin-top: 10px;
    padding-left: 5px;
/*    outline: none;*/
  }
  button{
    width: 90px;
    height: 37px;
    background-color: #42b983;
    color:white;
    border-radius: 2px;
    border:1px solid #42b983;
  }
  .addTodo{
    width: 310px;
    height: 40px;
    margin:0 auto;
  }
</style>