 import * as types from './mutations_type'

 export default {
 	/*
 	*增加todo actions
 	*@param commit
 	*@param mobile
 	*/
 	addTodo ({ commit }, todoText) {
 		commit(types.ADD_TODO, todoText)
 	},
 	delTodo ({ commit }, index) {
 		commit(types.DEL_TODO, index)
 	},
 	doneTodo ({ commit }, id) {
 		commit(types.DONE_TODO, id)
 	},
 	selectType ({ commit }, type) {
 		commit(types.SELECT_TYPE, type)
 	}
 }