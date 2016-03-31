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

// 用于渲染图表的数据
var chartData = {};

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
  if(page.nowGraTime == 'day'){
    //每次渲染新的粒度的图表，之前的图表都删除
    remove(main);

    var i = pageState.nowSelectCity ;
    for(var date in dataArr[i]){
      addElement('day',dataArr[i][date]);
    }
  }else if (pageState.nowGraTime == 'week') {
    //每次渲染新的粒度的图表，之前的图表都删除
    remove(main);

    var i = pageState.nowSelectCity ;
    var j=1,sum = 0;
    for(var date in dataArr[i]){
      sum += dataArr[i][date];
      j++;
      if(j%7==0){
        addElement('week',sum/7);
        sum = 0;
      }
    }    
  }else{
    //每次渲染新的粒度的图表，之前的图表都删除
    remove(main);

    var i = pageState.nowSelectCity ;
    var j=1,sum = 0;
    for(var date in dataArr[i]){
      sum += dataArr[i][date];
      j++;
      if (j==31) {
        addElement('week',sum/31);
        sum = 0;
      }else if (j==60) {
        addElement('week',sum/31);
        sum = 0;
      }else if (j==91) {
        addElement('week',sum/31);
        sum = 0;
      }
    }    
  }
}

function remove(parent){
  var child = parent.childNodes ;
  for(var i=child.length-1;i>=0;i--){
    main.removeChild(child[0]);
  }
}

function addElement(time,hei){
  var tem = document.createElement('div')
  tem.className = time ;
  tem.style.height = hei + 'px';
  var x = main.appendChild(tem);
  console.log(2);
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

      renderChart(pageState,aqiSourceData);
    }
  }
  // 设置对应数据

  // 调用图表渲染函数
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

        renderChart(pageState,aqiSourceData);
      }
    }
  }
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData(data) {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for(var city in data){
    dataArr.push(data[city]);
  }
  console.log(dataArr); 
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData(aqiSourceData);
  graTimeChange();
  citySelectChange();
}

init();