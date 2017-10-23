 import * as types from './mutations_type'
 import localStates from '../../localStorage'
 export default {
 	[types.ADD_TODO] (state, todoText) {
 		if (todoText) {
 			let todoInfo = {}
 			todoInfo.isDone = false
 			if (state.todoList.length == 0) {
 				todoInfo.id = 0
 			}
 			else if (state.todoList.length > 0) {
 				let todoFirst = state.todoList[state.todoList.length -1]
 				todoInfo.id = todoFirst.id + 1
 			}
 			todoInfo.text = todoText
 			state.todoList.push(todoInfo)
 			localStates.save(state.todoList)//将更新完的数据列表重新存入localStorage
 		}
 	},
 	[types.DEL_TODO] (state, index) {
 		state.todoList.splice(index, 1) //删除数组中的元素
 		localStates.save(state.todoList)
 	},
 	[types.DONE_TODO] (state, id) {
 		state.todoList.map((item) => {
 			if (item.id === id){
 				item.isDone = !item.isDone
 			}
 		})
 		localStates.save(state.todoList)
 	},
 	[types.SELECT_TYPE] (state, type) {
 		state.selected = type
 	}
 }