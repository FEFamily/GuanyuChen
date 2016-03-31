/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  //91天的数据
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}

//绘制图表的div
var main = document.getElementById("main");

//将原始数据对象解析为二维数组
var dataArr = [];

/**
 * 渲染图表
 */
function renderChart(page,data) {
  //一个大div 里面采用flex布局
  //取pageState里的数据
  //每一天、周、月都是一个div，宽度由小到大
  //高度根据数据计算
  
  var i = pageState.nowSelectCity ;
  if(page.nowGraTime == 'day'){
    //每次渲染新的粒度的图表，之前的图表都删除
    remove(main);
 
    for(var date in dataArr[i]){
      addElement('day',dataArr[i][date],date);
    }
  }else if (pageState.nowGraTime == 'week') {
    //每次渲染新的粒度的图表，之前的图表都删除
    remove(main);

    var j=1,sum = 0;
    for(var date in dataArr[i]){
      sum += dataArr[i][date];
      if ((j-3)%7==0) {
        if (j==3) {
          sum = Math.floor(sum/3);
        } else {
          sum = Math.floor(sum/7);
        }
        if (j<=31) {
          date = "2016-01第"+Math.ceil(j/7)+"周" ;
        }else if (j<=60) {
          date = "2016-02第"+Math.ceil((j-31)/7)+"周" ;
        } else {
          date = "2016-03第"+Math.ceil((j-59)/7)+"周" ;
        }
        addElement('week',sum,date);
        sum = 0;
      }else if(j==91){
        sum = sum/((91-3)%7)
        date = "2016-03第5周"
        addElement('week',sum,date);
      }
      j++;
    }    
  }else{
    //每次渲染新的粒度的图表，之前的图表都删除
    remove(main);

    var j=1,sum = 0;
    for(var date in dataArr[i]){
      sum += dataArr[i][date];
      if (j==31) {
        date = "2016-01"
        addElement('month',Math.floor(sum/31),date);
        sum = 0;
      }else if (j==60) {
        date = "2016-02"
        addElement('month',Math.floor(sum/31),date);
        sum = 0;
      }else if (j==91) {
        date = "2016-03"
        addElement('month',Math.floor(sum/31),date);
        sum = 0;
      }
      j++;
    }    
  }
}

//条件更改时删除节点
function remove(parent){
  var child = parent.childNodes ;
  for(var i=child.length-1;i>=0;i--){
    main.removeChild(child[0]);
  }
}

//添加节点的函数
function addElement(time,hei,date){
  var tem = document.createElement('div') ;//图表
  tem.className = time ;
  tem.style.height = hei + 'px';
  var title = document.createElement('div') ;//提示
  title.className = 'title';
  var p1 = document.createElement('p') ;//提示内容
  p1.innerHTML = date ;
  var p2 = document.createElement('p') ;//提示内容
  p2.innerHTML = hei ;
  title.appendChild(p1);
  title.appendChild(p2);
  tem.appendChild(title);
  tem.onmouseover = function(){
    title.style.display = 'block';
  }
  tem.onmouseout = function(){
    title.style.display = 'none';
  }
  var x = main.appendChild(tem);
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  var inp = document.getElementsByName('gra-time');
  for(var i=0;i<inp.length;i++){
    //为按钮绑定点击事件
    inp[i].onclick = function(){
      for(var j=0;j<inp.length;j++){
        var tem = inp[j].previousSibling.previousSibling ;
        tem.style.backgroundColor="white";
        tem.style.color="black";
      }
      var tem2 = this.previousSibling.previousSibling ;
      tem2.style.backgroundColor="black";
      tem2.style.color="white";//切换样式

      //更改时间粒度
      pageState.nowGraTime = this.value;

      //更改题目
      if (this.value == 'day') {
        document.getElementById('time').innerHTML = '每日' ;
      } else if (this.value == 'week') {
        document.getElementById('time').innerHTML = '周' ;
      } else {
        document.getElementById('time').innerHTML = '月' ;
      }

      //调用函数绘制图表
      renderChart(pageState,aqiSourceData);
    }
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var sel = document.getElementsByTagName('select')[0];
  //当select选项改变时
  sel.onchange = function(){
    for(var i=0;i<sel.length;i++){
      //selectedIndex select被选中项的索引
      if(sel.selectedIndex == i){
        // console.log(sel.options[i].value);
         
        //更改地点粒度
        pageState.nowSelectCity = i;
        document.getElementById("city").innerHTML = sel.options[i].value;

        //调用函数绘制图表  
        renderChart(pageState,aqiSourceData);
      }
    }
  }
}

/**
 * 初始化图表 日期粒度为日 城市为北京
 */
function initForm() {
  var inp = document.getElementsByName('gra-time')[0].previousSibling.previousSibling;
  inp.style.backgroundColor = 'black' ;
  inp.style.color = 'white' ; 
  for(var date in dataArr[0]){
    addElement('day',dataArr[0][date],date);
  }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData(data) {
  // 处理好的数据存到 dataArr 中
  for(var city in data){
    dataArr.push(data[city]);
  }
}

/**
 * 初始化函数
 */
function init() {
  initAqiChartData(aqiSourceData);
  initForm();
  graTimeChange();
  citySelectChange();
}

init();