// 多叉树遍历，深度优先广度优先，节点的选择增加与删除的功能

for (var i=0;i<div.length;i++) {	//为每个节点绑定选中事件
	div[i].onmousedown = choose;		
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

inq.onclick = function(){
	addNode(text.value);
	text.value = '';
}

//选中节点 左键单击选中 右键单击生成删除按钮
function choose(event){
	tem = this;
	document.oncontextmenu = function(event){	//去掉默认的contextmenu事件
		event.preventDefault();
	}

	if (event.button == 0) {	//用onmousedown事件区分左右键
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

	//删除按钮
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

	//删除节点
	function delete_node(temp){
		var par = temp.parentNode
			pre = temp.previousSibling;
		par.removeChild(temp);
		if (pre.nodeName == 'SPAN') {
			par.removeChild(pre);
			par.style.height = (par.style.height - 26) +'px'
		}
		if (par.childNodes.length <= 1) {
			par.parentNode.removeChild(par.previousSibling);
		}
	}

	//增加节点
	addNode = function(text){
		var temp = document.createElement('div');
		var tn = document.createTextNode(text);
		temp.className = 'tree';
		temp.onmousedown = choose;
		temp.appendChild(tn);
		tem.appendChild(temp);
		tem.style.height += 26 + 'px';
		if (tem.previousSibling.nodeName != 'SPAN') {	//当新生成节点的父节点没有三角按钮时，新建一个并绑定显示隐藏事件
			console.log(tem.previousSibling.nodeName);
			var n = addTri(tem);
			n.onclick = dis_hide;
		}
	}
}
