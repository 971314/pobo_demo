<template>
	<div>
		<!-- 事情列表 -->
		<div class="todoList">
			<p v-for="(todo, index) in currentTodoList" class="todoItem">
				<span class="radio" @click="doneTodo(todo.id)"></span>
				<span :class="{ 'isDone': todo.isDone}">{{ todo.text }}</span>
				<button class="del-btn" @click="delTodo(index)">删除</button>
			</p>
		</div>
		<div class="select-section">
			<p class="space"></p>
			<span :class="{ 'select-type': getSelected === 0,'select': true}" @click="selectType(0)">全部</span>
			<span :class="{ 'select-type': getSelected === 1,'select': true}" @click="selectType(1)">已完成</span>
			<span :class="{ 'select-type': getSelected === 2,'select': true}" @click="selectType(2)">未完成</span>
		</div>
	</div>
</template>

<script>
	import {/*mapState*/ mapGetters, mapActions } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			//经量少用mapState
			// ...mapState([
			// 		'todoList',
			// 		'selected'
			// 	]),
			...mapGetters([
					'getTodoList',
					'getSelected',
					'filterDoned',
					'filterNoDoned'
				]),
			currentTodoList() {
				if (this.getSelected === 0) {
					return this.getTodoList
				}
				else if (this.getSelected === 1) {
					return this.filterDoned
				}
				else if (this.getSelected === 2) {
					return this.filterNoDoned
				}
			}
		},
		methods: {
			...mapActions([
					'doneTodo',
					'delTodo',
					'selectType'
				])
		}
	}
</script>

<style scoped>
/*不让外部组件访问*/
  .todoList{
    width: 290px;
    min-height: 140px;
    margin:40px auto;
    padding-left: 5px;
    padding-top: 5px;
    margin-top: 20px;
    margin-bottom: 50px;
  }
  .todoItem{
    width: 95%;
    height: 20px;
    border-bottom: 1px solid #b8b8bf;
    padding-bottom: 5px;
  }
  .radio{
    display: inline-block;
    width: 15px;
    height: 15px;
    float: left;
    border: 1px solid #979797;
    margin-top: 2px;
    margin-right: 5px;
    border-radius: 8px;
    cursor: pointer;
  }
  .todoItem:hover{
    color:black;
  }
  .radio:hover{
    border:1px solid #141414;
  }
  .isDone{
    text-decoration: line-through;
  }

  .select-type{
    background-color: #42b983;
    color:white;

  }
  .select{
    display: inline-block;
    width: 60px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin-top: 10px;
    cursor: pointer;
  }

  .select-section{
    width: 300px;
    height: 40px;
    margin: 0 auto;
    margin-top : -40px;
  }
  .del-btn{
  	border-radius: 10px;
  	box-shadow: 0px 0px 5px #fb80ec;
    border: 1px solid #e09595;
    background: none;
    outline: none;
  }
</style>