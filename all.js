// hositing
// 全域變數 _ 底線

init();

var _countyData = [];
var _mapData= [];

function init(){ 
   getCountyData();
   getMapData();
   renderDay();  
}

function renderDay(){
  
   let dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   let current_datetime = new Date();
   let currentDay = current_datetime.getDay();
   let dayName = dayArray[currentDay]; 
   document.querySelector('.jsDate').textContent = dayName;
   
   let currentDate = current_datetime.getFullYear()+"/"+(current_datetime.getMonth()+1)+"/"+current_datetime.getDate();
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
   let xhr = new XMLHttpRequest();
   let apiUrl = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR0oowBRjj1goAMqtnugBiXMTMY8OCl14TGmgt3YDJi9w5BXs4VsfZQ9mDI';

   xhr.open('get',apiUrl);
   xhr.send();
   xhr.onload = function(){
      //  console.log(xhr.responseText);
      _mapData = JSON.parse(xhr.responseText);
      var defaultCounty ='臺北市';
      renderLeftNodeList(defaultCounty);
   }
}

// 取得縣市名稱
function getCountyData(){
   let xhr = new XMLHttpRequest();
   let apiUrl = 'https://demeter.5fpro.com/tw/zipcode/cities.json';

   xhr.open('get',apiUrl);
   xhr.send();
   xhr.onload = function(){
       
      _countyData = JSON.parse(xhr.responseText);       
      renderCountySelectItems();
   }
}

function renderCountySelectItems(){
   let array = _countyData;   
   let sel = document.querySelector('.area');

    for (let i=0;i<array.length;i++) {
      let opt = document.createElement('option');
      opt.value = array[i].name;
      opt.text = array[i].name;
      opt.textContent = array[i].name;
      sel.appendChild(opt);
  } 
}

function renderLeftNodeList(defaultCounty){
   let array = _mapData.features;
   console.log(_mapData);
   let str= "";

   for(let i =0;i<array.length;i++){

      if(array[i].properties.county===defaultCounty){
         str+='<li>'+array[i].properties.name+ '</li>' +array[i].properties.mask_child ;
      }      
   }
   document.querySelector('.list').innerHTML = str;
}

document.querySelector('.area').addEventListener('change',function(e){   
   renderLeftNodeList(e.target.value);
});
