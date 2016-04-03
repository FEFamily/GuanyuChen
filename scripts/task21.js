window.onload = function(){
	var inp = document.getElementById('tag'),
		tags = document.getElementsByClassName('tags')[0],
		text = document.getElementById('text'),
		but = document.getElementById('confirm'),
		hobbys = document.getElementsByClassName('hobbys')[0];

	// input的键盘监听事件
	inp.onkeypress = function(event){
		if(event.keyCode == 13 || event.keyCode == 32 || event.keyCode == 34){
			addEle(tags,this.value.trim(),'tag','tag delete');
			this.value = '';
		}
	}

	// button的鼠标点击事件
	but.onclick = function(){
		// split 使用多个分隔符分割字符串 使用正则表达式
		// 分别对应逗号 顿号 空格 回车
		//var arr = text.value.split(/,|、| |'\r\n'/);
		var arr = text.value.split(/[，, 、\r\n]/);

		//arr每个值循环调用addEle函数
		for(var i=0;i<arr.length;i++){
			addEle(hobbys,arr[i],'hobby','hobby delete');
		}

		//将textarea值清空
		text.value = null;
	}

	// 封装一个添加节点的函数
	function addEle(parent,value,before,after){
		//创建一个span节点
		var tem = document.createElement('span');
		tem.innerHTML = value;
		tem.className = before;

		//重复性检测
		var j = 0;
		for(var i=0;i<parent.childNodes.length;i++){
			if(parent.childNodes[i].innerHTML != value){
				j++;
			}
		}
		if (j == parent.childNodes.length && value.length > 1) {
			//兴趣爱好及标签节点都不能超过10
			if (parent.childNodes.length >= 10){
				parent.removeChild(parent.childNodes[parent.childNodes.length-1]);
			}
			parent.insertBefore(tem,parent.childNodes[0]);

			//为新增加的标签绑定鼠标悬停事件
			tem.onmouseover = function(){
				tem.innerHTML = '点击删除' + tem.innerHTML;
				tem.className = after;

				this.onclick = function(){
					parent.removeChild(this);
				}
			}
			tem.onmouseout = function(){
				tem.innerHTML = value;
				tem.className = before;
			}
		} 
		// else if (value.length <= 1) {
		// 	alert("还没有输入内容呐！");
		// } else {
		// 	alert("已经有这个标签啦！");
		// }
	}
}