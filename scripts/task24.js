// 多叉树遍历，深度优先广度优先，节点的选择增加与删除的功能

window.onload = function(){
	var front = document.getElementsByClassName('front'),
		behind = document.getElementsByClassName('behind'),
		text = document.getElementById('text'),
		inq = document.getElementById('inquire'),
		div = document.getElementsByTagName('div'),
		parent = document.getElementsByTagName('div')[0],
		stack = [],
		queue = [];

	front[0].onclick = function(){
		DFS_rec(parent);
		stack = [];
	}

	front[1].onclick = function(){
		DFS_stack(parent);
		stack = [];
	}

	behind[0].onclick = function(){
		BFS_rec(parent);
	}

	behind[1].onclick = function(){
		BFS_queue(parent);
	}

	inq.onclick = function(){
		
	}

	// 深度优先 递归实现
	function DFS_rec(node) {
		if (isRepeat(node,stack)) {
			console.log(node);
			stack.push(node);
		}
		if (node.childNodes[1] && isRepeat(node.childNodes[1],stack)) { // 当还有未访问过的子节点时，将子节点赋给当前节点
			node = node.childNodes[1];
		} else if (node.nextSibling.nextSibling) { // 当还有下邻节点时，下邻节点赋给当前节点
			node = node.nextSibling.nextSibling;
		} else if (node.parentNode != div[0]) { // 当父节点不是根节点时，父节点赋给当前节点
			node = node.parentNode;
		} else { // 当树遍历到结尾时，退出函数
			return
		}
		DFS_rec(node);
	}

	// 深度优先 栈实现
	function DFS_stack(node){
		console.log(node);
		stack.push(node);
		while (stack.length != 0) { // 当栈非空
			//console.log(stack[stack.length-1].childNodes.length);
			for (var i=0;i<stack[stack.length-1].childNodes.length;i++) {
				if (stack[stack.length-1].childNodes[i].nodeType == 1 && isRepeat(stack[stack.length-1].childNodes[i],stack)) {
					stack.push(stack[stack.length-1].childNodes[i]);
					console.log(stack[stack.length-1].childNodes[i]);
					break; // 跳出当前循环
				} else {
					stack.pop();
				}
			}
		}
	}

	// 广度优先 递归实现
	function BFS_rec() {

	}

	// 广度优先 队列实现
	function BFS_queue() {

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