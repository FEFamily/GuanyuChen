for(var k=0;k<div.length;k++){
	addTri(div[k]);	//为树的每个节点添加三角按钮
}

var dis = document.getElementsByClassName('triangle-right');
for (var i=0;i<dis.length;i++) {
	dis[i].onclick = dis_hide;
}
var	hid = document.getElementsByClassName('triangle-down');
for (var j=0;j<hid.length;j++) {
	hid[j].onclick = dis_hide;
}

//新建三角按钮
function addTri(node){
	var temp = document.createElement('span');
	temp.className = 'triangle-right';
	node.parentNode.insertBefore(temp,node);
	return temp;
}


//控制显示或隐藏
function dis_hide(){
	var cla = this.className,
		son = this.nextSibling.childNodes;
	if (cla == 'triangle-right') {//当前隐藏
		for (var i=1;i<son.length;i++) {
			if (son[i].nodeType == 1) {
				son[i].style.display = 'block';
				son[i].style.marginLeft += 20+'px' ;
			}
		}
		this.className = 'triangle-down';
	} else {
		for (var i=1;i<son.length;i++) {
			if (son[i].nodeType == 1) {
				son[i].style.display = 'none';
			}
		}
		this.className = 'triangle-right';
	}
}