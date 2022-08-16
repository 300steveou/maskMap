
// hositing
// 全域變數 _ 底線

init();

var countyData = [];
var mapData= [];

function init(){ 
   getCountyData();
   getMapData();
   renderDay();  
}

function renderDay(){
  
   var dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   var current_datetime = new Date();
   var currentDay = current_datetime.getDay();
   var dayName = dayArray[currentDay]; 
   document.querySelector('.jsDate').textContent = dayName;
   
   var currentDate = current_datetime.getFullYear()+"/"+(current_datetime.getMonth()+1)+"/"+current_datetime.getDate();
   console.log(currentDate,'currentDate'); 
   
   judgeEvenOdd(currentDay);
}
 
function judgeEvenOdd(currentDay){
 if(currentDay===1 ||currentDay===3 ||currentDay===5){
   document.querySelector('.odd').style.display='block';
 }
 else if(currentDay===2 ||currentDay===4 ||currentDay===6){
   document.querySelector('.even').style.display='block';
 }
}

// 取得地圖資料
function getMapData(){
   var xhr = new XMLHttpRequest();
   var apiUrl = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR0oowBRjj1goAMqtnugBiXMTMY8OCl14TGmgt3YDJi9w5BXs4VsfZQ9mDI';

   xhr.open('get',apiUrl);
   xhr.send();
   xhr.onload = function(){
      //  console.log(xhr.responseText);
      mapData = JSON.parse(xhr.responseText);
      var defaultCounty ='臺北市';
      renderLeftNodeList(defaultCounty);
   }
}

// 取得縣市名稱
function getCountyData(){
   var xhr = new XMLHttpRequest();
   var apiUrl = 'https://demeter.5fpro.com/tw/zipcode/cities.json';

   xhr.open('get',apiUrl);
   xhr.send();
   xhr.onload = function(){
       
      countyData = JSON.parse(xhr.responseText);       
      renderCountySelectItems();
   }
}

function renderCountySelectItems(){
   var array = countyData;   
    var sel = document.querySelector('.area');

    for (var i=0;i<array.length;i++) {
      let opt = document.createElement('option');
      opt.value = array[i].name;
      opt.text = array[i].name;
      opt.textContent = array[i].name;
      sel.appendChild(opt);
  } 
}

function renderLeftNodeList(defaultCounty){
   var array = mapData.features;
   console.log(mapData);
    var str= "";

   for(var i =0;i<array.length;i++){

      if(array[i].properties.county===defaultCounty){
         str+='<li>'+array[i].properties.name+ '</li>' +array[i].properties.mask_child ;
      }      
   }
  console.log(str);
   document.querySelector('.list').innerHTML = str;
}

document.querySelector('.area').addEventListener('change',function(e){
   console.log(e.target.value);
   renderLeftNodeList(e.target.value);
});
 