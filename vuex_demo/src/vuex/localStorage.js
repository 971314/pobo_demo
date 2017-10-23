 const STORAGE_KEY = 'todoList'

 export default {
 	fetch() {
 		return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
 	},
 	save(items) {
 		window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
 	}
 }
