var cont = document.getElementById('content');

var rowHeight = init(4,16);
console.log(rowHeight);

//初始化函数,初始化row列,返回存储每列高度的数组
function init(row, distance) {
	var client = document.body.clientWidth,
		width = Math.floor((client-100-3*distance)/row),	//计算出每一个列的宽度
		rowHeight = [];		//存储每一个列的宽度

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
	return rowHeight;
}