// 多叉树遍历，深度优先广度优先，节点的选择增加与删除的功能

window.onload = function(){
	var front = document.getElementsByClassName('front'),
		behind = document.getElementsByClassName('behind'),
		text = document.getElementById('text'),
		inq = document.getElementById('inquire'),
		div = document.getElementsByTagName('div'),
		parent = document.getElementsByTagName('div')[0],
		stack = [],
		arr = [],	//将访问过的节点放入该数组
		queue = [],
		tem = null;

	for (var i=0;i<div.length;i++) {	//为每个节点绑定选中事件
		div[i].onmousedown = function(event){		//用onmousedown事件区分左右键
			tem = this;
			document.oncontextmenu = function(event){	//去掉默认的contextmenu事件
				event.preventDefault();
			}

			if (event.button == 0) {
				for (var j=0;j<div.length;j++) {
					if (div[j].className.indexOf(' choose') > 0) {	//indexOf()搜索指定子字符串 如果存在返回索引
						div[j].className = div[j].className.slice(0,div[j].className.indexOf(' choose'));	//slice(start,end)截取字符串
					}
				}
				tem.className = tem.className + ' choose';
				event.stopPropagation();	//阻止事件冒泡
			} else if (event.button == 2) {
				var x = event.clientX;
				var y = event.clientY;
				del(x,y);
				event.stopPropagation();	//阻止事件冒泡
			}

			function del(x,y) {
				var dialog = document.createElement('button');
				dialog.className = 'dialog';
				dialog.style.position = 'absolute';
				dialog.style.left = x + 'px';
				dialog.style.top = y + 'px';
				dialog.innerHTML = '删除'
				document.documentElement.appendChild(dialog);

				dialog.onclick = function(){
					delete_node(tem);
					this.parentNode.removeChild(this);	//删除节点之后，按钮节点也删除
				}
			}

			function delete_node(temp){
				temp.parentNode.removeChild(temp);
			}

			inq.onclick = function(){
				var cla = tem.className.split(' ')[0];
				switch (cla) {
					case 'parent':
						cla = 'first';
						break;
					case 'first':
						cla = 'second';
						break;
					case 'second':
						cla = 'third';
						break;
					case 'third':
						cla = 'fourth';
						break;
					default:
						console.log('类名出问题了');
						break;
				}
				addNode(text.value,cla);
				text.value = '';
			}

			function addNode(text,name){
				var temp = document.createElement('div');
				var tn = document.createTextNode(text);
				temp.className = name + ' flex';
				temp.appendChild(tn);
				tem.appendChild(temp);

			}
		}
	}

	front[0].onclick = function(){
		DFS_rec(parent);
		arr = [];
	}

	front[1].onclick = function(){
		DFS_stack(parent);
		stack = [];
		arr = [];
	}

	behind[0].onclick = function(){
		BFS(parent);
	}

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
	function DFS_stack(node){
		console.log(node);
		stack.push(node);	//根节点入栈
		arr.push(node);	//访问过的节点
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
}