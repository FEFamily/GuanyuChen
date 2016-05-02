var img = document.getElementById('images'),
	but = document.getElementById('add'),
	index = 0;

but.onclick = function(){
	if (index < 6) {
		index++;
		var cla = addImg();
		for(var i=0;i<img.childNodes.length;i++){
			img.childNodes[i].className = cla;
		}
	} else {
		alert('测试版，六张图片得了');
	}
}

function addImg() {
	var tem = document.createElement('img');
	tem.src = 'img/'+Math.round(Math.random()*10)+'.jpg';
	img.appendChild(tem);
	var length = img.getElementsByTagName('img').length,
		cla = '';
	switch (length) {
		case 1:
			cla = 'one';
			break;
		case 2:
			cla = 'two';
			break;
		case 3:
			cla = 'three';
			break;
		case 4:
			cla = 'four';
			break;
		case 5:
			cla = 'five';
			break;
		case 6:
			cla = 'six';
			break;
		default:
			cla = 'six';
			alert('太多了,不能增加了');
			img.removeChild(tem);
			break;
	}
	return cla
}