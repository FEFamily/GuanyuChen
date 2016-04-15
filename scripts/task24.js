//多叉树遍历，深度优先广度优先，节点的选择增加与删除的功能

window.onload = function(){
	var front = document.getElementById('front'),
		behind = document.getElementById('behind'),
		text = document.getElementById('text'),
		inq = document.getElementById('inquire'),
		div = document.getElementsByTagName('div'),
		parent = document.getElementsByTagName('div')[0],
		stack = [],
		queue = [];

	front.onclick = function(){
		DFS(parent);
	}

	behind.onclick = function(){
		BFS(parent);
	}

	inq.onclick = function(){
		
	}

	// 深度优先
	function DFS(node) {
		// 当前栈顶
		stack.push(node);
		console.log(node);

		if (node.childNodes[1] && isRepeat(node.childNodes[1],stack)) {
			node = node.childNodes[1];
			DFS(node);
		} else {
			stack.pop();
		}

	}

	// 广度优先
	function BFS() {

	}

	// 当前遍历的节点
	function now(temp){
		// console.log(temp);
		for(var i=0;i<div.length;i++){
			div[i].style.backgroundColor = '#fff' ;
		}
		temp.style.backgroundColor = '#8DEEEE' ;
		//背景色变蓝1s之后变回白色
		setTimeout(function(){
			temp.style.backgroundColor = '#fff' ;
		},500);
	}

	// 判断节点是否遍历过
	function isRepeat(node,arr){
		var temp = true;
		for(var i=0;i<arr.length;i++){
			if (arr[i] == node) {
				temp = false;
			}
		}

		return temp;
	}

}