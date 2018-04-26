(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!

	var vm = new Vue({
		el:"#app",
		data:{
			newList:"",
			isEdit:"",
			isSelected:"All",
			list:[],
		},
		methods: {
			addList(e){
				e.preventDefault();
				this.list.push({
					text:this.newList,
					isComplete:false,
				});
				localStorage.setItem("toDo",JSON.stringify(this.list))
				this.newList = ""
			},
			getList(){
				var list = localStorage.getItem("toDo")
				// console.log(list);
				this.list = JSON.parse(list || "[]")
			},
			delList(id){
				this.list.splice(id,1);
				localStorage.setItem("toDo",JSON.stringify(this.list))
			},
			editList(id){
				this.isEdit = id;
			},
			doEdit(){
				this.isEdit = "";
				localStorage.setItem("toDo",JSON.stringify(this.list))
			},
			isShow(v){
				switch (this.isSelected) {
					case "All":
						return true;
						break;
					case "Active":
						return !v.isComplete;
						break;
					case "Completed":
						return v.isComplete;
						break;
					default:
						break;
				}
			},
			clearCom(){
				this.list = this.list.filter(v => !v.isComplete)
				localStorage.setItem("toDo",JSON.stringify(this.list))
			}
		},
		computed: {
			toggleAll:{
				get(){ // 获取
					var comList = this.list.filter(v => !v.isComplete)
					// 过滤出没有没有被选中的项
					// console.log(comList);
					// comList.length如果等于0, 则表示全部被选中,表达式成立, 返回true
					return comList.length == 0
				},
				set(newValue){ // 设置
					// console.log(newValue);
					this.list.forEach(v => {
						v.isComplete = newValue;
					})
				}
			}
		},
		mounted () {
			this.getList();
		}
	})

})(window);
