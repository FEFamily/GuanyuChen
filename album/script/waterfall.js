var cont = document.getElementById('content'),
	rowHeight = [];		//存储每一个列的宽度

var start = init(4,16);	//初始化四列
for (var i=0;i<rowHeight.length;i++) {
	start(i);			//为四列每一列添加第一张图片
}
var i = 0;
while (i < 40) {
	i++;
	var min = 0;
	//setTimeout(function(){
		for (var j=1;j<rowHeight.length;j++) {
			if (rowHeight[min] > rowHeight[j]) {
				min = j;
			}
		}
		start(min);
	//},1000);

}

//初始化函数,初始化row列,返回存储每列高度的数组
function init(row, distance) {
	var client = document.body.clientWidth,
		width = Math.floor((client-100-3*distance)/row);	//计算出每一个列的宽度

	cont.style.width = client-100 + 'px';

	for (var i=0;i<row;i++) {
		var tem = document.createElement('div');	//新建一个div节点
		tem.className = 'row';
		tem.style.width = width + 'px';
		if (i != row-1) {
			tem.style.marginRight = distance + 'px'
		}
		cont.appendChild(tem);
		rowHeight[i] = 0;
	}

	//加载图片
	function addimg(index) {
		var tem = document.createElement('div'),
			img = document.createElement('img'),
			par = document.getElementsByClassName('row');

		img.style.width = 0.9 * width + 'px';
		img.src = 'img/'+Math.round(Math.random()*10)+'.jpg';
		img.onload = function(){
			//console.log(img.offsetHeight);
			rowHeight[index] += img.offsetHeight;
		}
		tem.appendChild(img);
		tem.className = 'block';
		tem.style.width = width + 'px';
		tem.style.top = rowHeight[index] + 'px';
		tem.style.left = (width+distance)*index + 'px'
		par[index].appendChild(tem);
		//console.log(window.getComputedStyle(tem.childNodes[tem.childNodes.length-1]).getPropertyValue('height'));
	}

	return addimg;
}
