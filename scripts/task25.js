for(var k=0;k<div.length;k++){
	if (div[k].childNodes.length > 1) {
		addTri(div[k]);	//为树的每个有子节点的节点添加三角按钮
	}
}

var dis = document.getElementsByClassName('triangle-right');
for (var i=0;i<dis.length;i++) {
	dis[i].onclick = dis_hide;
}
var	hid = document.getElementsByClassName('triangle-down');
for (var j=0;j<hid.length;j++) {
	hid[j].onclick = dis_hide;
}

sel.onclick = select;

//新建三角按钮
function addTri(node){
	var temp = document.createElement('span');
	temp.className = 'triangle-right';
	node.parentNode.insertBefore(temp,node);
	temp.style.position = 'relative';
	//temp.style.left = -24 + 'px';
	//temp.style.top = 24 + 'px';
	if (window.getComputedStyle(temp.nextSibling).display == 'none') {
		temp.style.display = 'none';
	}
	return temp;
}


//控制显示或隐藏
function dis_hide(){
	var that = this;
	var cla = that.className,
		son = that.nextSibling.childNodes,
		par = that.nextSibling,
		sum = 0;
	if (cla == 'triangle-right') {//当前隐藏
		for (var i=1;i<son.length;i++) {
			if (son[i].nodeType == 1) {
				son[i].style.display = 'block';
				son[i].style.marginLeft += 20+'px' ;
				sum++;
			}
		}
		console.log(sum);
		par.style.height = (sum+1)*26 + 'px'
		that.className = 'triangle-down';
	} else {
		for (var i=1;i<son.length;i++) {
			if (son[i].nodeType == 1) {
				son[i].style.display = 'none';
			}
		}
		par.style.height = 24 + 'px';
		that.className = 'triangle-right';
	}
}

function select(){
	var result = DFS_stack(parent,text.value);
	stack = [];	//遍历函数执行完毕之后一定要清空用到的数组
	arr = [];
	text.value = '';
	res(result);

	function res(result){
		if (result.parentNode.className.indexOf(' tree') > 0) {
			result = result.parentNode;
			for (var i=1;i<result.childNodes.length;i++) {
				if (result.childNodes[i].nodeType == 1) {
					result.childNodes[i].style.display = 'block';
					result.childNodes[i].style.marginLeft += 20+'px' ;
				}
			}
			result.previousSibling.className = 'triangle-down';
			console.log(result);
			res(result);
		}
	}
}