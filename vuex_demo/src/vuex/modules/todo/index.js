 import actions from './actions'
 import mutations from './mutations'
 import localStates from '../../localStorage'

 export default {
 	state: {
 		todoList: localStates.fetch(),
 		todoInfo: {
 			id: 0,
 			text: '',
 			isDone: false
 		},
 		selected: 0
 	},
 	actions: actions,
 	mutations: mutations,
 	getters: {
 		getTodoList(state) {
 			return state.todoList
 		},
 		getSelected(state) {
 			return state.selected
 		},
 		filterDoned(state) { //已完成的todo
 			let todoList = state.todoList.filter((item) => {
 				if (item.isDone) {
 					return item
 				}
 			})
 			return todoList
 		},
 		filterNoDoned(state) { //未完成的todo
 			let todoList = state.todoList.filter((item) => {
 				if (!item.isDone) {
 					return item
 				}
 			})
 			return todoList
 		}
 	}
 }