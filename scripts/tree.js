var front = document.getElementsByClassName('front'),
	behind = document.getElementsByClassName('behind'),
	text = document.getElementById('text'),
	inq = document.getElementById('inquire'),
	div = document.getElementsByClassName('tree'),
	parent = document.getElementsByClassName('tree')[0],
	sel = document.getElementById('sel'),
	stack = [],
	arr = [],	//将访问过的节点放入该数组
	queue = [],
	tem = null,
	flag = false;

// 深度优先 递归实现
function DFS_rec(node) {
	if (isRepeat(node,arr)) {
		console.log(node);
		arr.push(node);
	}
	if (node.childNodes[1] && isRepeat(node.childNodes[1],arr)) { // 当还有未访问过的子节点时，将子节点赋给当前节点
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
function DFS_stack(node,text){
	console.log(node);
	stack.push(node);	//根节点入栈
	arr.push(node);	//访问过的节点
	// if (node.childNodes[0].nodeValue.trim() == text) {
	// 	flag = true;
	// 	alert('找到啦！！！');
	// 	return node;
	// }
	var temp = null;

	while (stack.length != 0) {		//当栈非空
		temp = stack[stack.length-1];	//	temp取栈顶的元素
		for(var i=0;i<temp.childNodes.length;i++){
			if (temp.childNodes[i].nodeType == 1 && isRepeat(temp.childNodes[i],arr)) {	//存在并找到temp的子节点且未访问过
				console.log(temp.childNodes[i]);
				stack.push(temp.childNodes[i]);		//访问并入栈
				arr.push(temp.childNodes[i]);
				break;	//跳出循环
			}
			if (i == temp.childNodes.length-1) {	//当循环结束还是没找到未访问过的节点时，当前栈顶出栈
				stack.pop();
			}
		}
	}
}

// 广度优先 队列实现
function BFS(node) {
	console.log(node);
	queue.push(node);
	arr.push(node);
	var temp = null;

	while (queue.length != 0) {
		temp = queue[0];
		for (var i=0;i<temp.childNodes.length;i++) {
			if (temp.childNodes[i].nodeType == 1 && isRepeat(temp.childNodes[i],arr)) {
				console.log(temp.childNodes[i]);
				queue.push(temp.childNodes[i]);
				arr.push(temp.childNodes[i]);
			}
			if (i == temp.childNodes.length-1) {
				queue.shift();	//队列头的子节点都遍历完，将它移出队列
			}
		}		
	}
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
