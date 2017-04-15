/***************************
This is JavaScript (JS), the programming language that powers the web (and this is a comment, which you can delete).

To use this file, link it to your markup by placing a <script> in the <body> of your HTML file:

  <body>
    <script src="script.js"></script>

replacing "script.js" with the name of this JS file.

Learn more about JavaScript at

https://developer.mozilla.org/en-US/Learn/JavaScript
***************************/

var CommandBase = 'http://140.113.89.153:8001/';
var map,Command = 'http://127.0.0.1/10';
var StepByStep = false;
var TriangleWitdth = 7;
var TriangHeight = 20,LabelHeight = -20;
var CircleWidth=18,CircleHeight=-32;
var lat = 24.789,lng = 120.996450;
var MarkPoints = [];
var DateString,AddressString;
var SearchBox;
var IconSelectBox;

function DisplayMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lat, lng:lng},
    zoom: 18
  });
  /* var marker = new google.maps.Marker({
          position: {lat: lat, lng:lng},
          map: map,
          title: 'Hello World!'
        });*/

  //MarkPoints.push(marker);
  //MarkPoints.push(1);
  document.getElementById('debug').innerHTML = MarkPoints.length;
}
function Marker(){

  //MarkPoints[0].setMap(null);
  //MarkPoints.pop();
  var PolygonPath = 'M 0,0 L '+TriangleWitdth.toString()+",-"+TriangHeight.toString()+" L -"+TriangleWitdth.toString()+",-"+TriangHeight.toString()+" z";
  //document.getElementById('debug').innerHTML = PolygonPath;
  var MyMark_Tiangle = {
    path:  PolygonPath,
    fillColor: '#FF0000',
    fillOpacity: 1,
    scale: 1,
    //strokeColor: 'gold',
    //strokeWidth = 0,
    labelOrigin : new google.maps.Point(0, LabelHeight),
    strokeWeight:0
  };
  var CircleRadiusString = (CircleWidth*0.675).toString();
  var CircleHeightString = CircleHeight.toString();
  var CircleWidthString = CircleWidth.toString();
  var CircleTopString = (CircleWidth+CircleHeight).toString();

  var CircleOrigin = '0,'+CircleHeightString;
  var CircleRightDown = CircleRadiusString+","+CircleHeight;
  var CircleRightUp = CircleRadiusString+","+CircleTopString;
  var CircleLeftUp = '-'+CircleRadiusString+","+CircleTopString;
  var CircleLeftDown = '-'+CircleRadiusString+","+CircleHeight;
  

  var CirclePath = 'M '+CircleOrigin+' C '+CircleRightDown+' '+CircleRightUp+' 0,'+CircleTopString+' C '+CircleLeftUp+' '+CircleLeftDown+' '+CircleOrigin+' z';

  var MyMark_Circle = {
    path : CirclePath,
    fillColor: '#FF0000',
    fillOpacity: 1,
    scale: 1,
    //strokeColor: 'gold',
    strokeWeight:0
  };

  var marker_Poly = new google.maps.Marker({
    position: {lat: lat, lng:lng},
    map: map,
    title: 'Hello World!',
    icon:MyMark_Tiangle
    //label:'KKK'


  });

  var marker_Circle = new google.maps.Marker({
    icon:MyMark_Circle,
    position: {lat: lat, lng:lng},
    map: map,
    title: 'Hello World!'
    //label:'KKK'
  });

  /*var marker = new google.maps.Marker({
          position: {lat: lat, lng:lng},
          map: map,
          title: 'Hello World!',
          label:'KKK'


        });*/
  //MapPolygon.setMap(map);
  //marker.setMap(map);
  var InfoBox = document.createElement('div');
  var InfoImg = document.createElement('img');
  var InfoText = document.createElement('div');
  InfoImg.setAttribute('src',IconSelectBox.getSelectedFilePath());
  InfoImg.setAttribute('class','InfoImgClass');
  
  InfoText.setAttribute('class','InfoTextClass');
  InfoText.innerHTML = 'Name : ' + IconSelectBox.getIconName() + '<br>' + AddressString;
  
  InfoBox.appendChild(InfoImg);
  InfoBox.appendChild(InfoText);
  
  var infowindow = new google.maps.InfoWindow({
    content:InfoBox
  });

  marker_Poly.setMap(null);
  marker_Circle.setMap(null);
  MarkPoints.push(marker_Poly);
  MarkPoints.push(marker_Circle);
  marker_Circle.addListener('click',function(){
    infowindow.open(map, marker_Circle);
  });

}


function ChangePoint(){

  //lat = lat + 0.1;
  //lng += 1;
  //map.setCenter(new google.maps.LatLng(lat, lng));
  //map.setZoom(10);
  Marker();
}
//setInterval(ChangePoint,1000);



var counter = 0,terminal,StepByStepCounter = 0,StepByStep_ID;

function Init(){
  SearchBox = new SearchIconClass("SearchIcon");
  SearchBox.InsertOption('Nearest 10','10',0,0);
  SearchBox.InsertOption('Nearest 20','20',0,0);
  SearchBox.InsertOption('Nearest 30','30',0,0);
  SearchBox.InsertOption('Nearest 50','50',0,0);
  SearchBox.InsertOption('Others','0',0,1);
  SearchBox.InsertOption('Normal','Normal',1,0);
  SearchBox.InsertOption('StepByStep','StepByStep',1,0);
  
  IconSelectBox = new IconSelect('IconSelect');
  
  var icons = [];
  icons.push({'iconFilePath':'https://s26.postimg.org/mm8bonc21/Icon_Select_Back_Ground.png', 'iconValue':'1','IconText':'MacAddress : 101a18000034,101a18000035<br>Name : Lucky','Name':'LUCKY','MacAddress':"(MAC_Address='101a18000034' OR MAC_Address='101a18000035')"});
  icons.push({'iconFilePath':'https://s26.postimg.org/5y76ball1/image.png', 'iconValue':'2','IconText':'MacAddress : 101a18000036<br>Name : Cuby','Name':'Cuby','MacAddress':"(MAC_Address='101a18000036' OR MAC_Address='101a1800003A')"});
  icons.push({'iconFilePath':'https://s26.postimg.org/npispr0zp/image.png', 'iconValue':'3','IconText':'MacAddress : 101a18000035<br>2017.1.25. 8:53:40','Name':'OKKY','MacAddress':"MAC_Address='101a18000034'"});


  IconSelectBox.refresh(icons);
}


function SendToBackEnd(){
  //document.getElementById('debug').innerHTML = '222';
  var CommandToSend;
  //document.getElementById('debug').innerHTML = SearchBox.GetValue(0);
  if(SearchBox.GetValue(0) == "0"){
    var KeyboardInput = SearchBox.GetKeyboardValue();
    CommandToSend = CommandBase + KeyboardInput;
  }
  else if(SearchBox.GetValue(0) == "-1"){
    //document.getElementById('debug').innerHTML = '222';
    CommandToSend = CommandBase + '10';
  }
  else{
    CommandToSend = CommandBase + SearchBox.GetValue(0);
  }
  if(SearchBox.GetValue(1) == "StepByStep"){
    StepByStep = true;
  }
  else StepByStep = false;
  //document.getElementById('State').innerHTML = StepByStep;
  CommandToSend = CommandToSend + '/' + IconSelectBox.getMacAddress() + '/' + SearchBox.GetFromDate() + '/' + SearchBox.GetToDate() + '/';
  Restart(CommandToSend);
  //document.getElementById("debug").innerHTML = CommandToSend;
}


function Restart(command){
  Command = command;
  StopReceive();
  StartReceive();
}

function DisplayStepByStep(){
  var Devide;
  if(MarkPoints.length == 2){
    Devide = 0;
  }
  else Devide = Math.floor(255/(MarkPoints.length-1));

  var Index =  (MarkPoints.length- 1 - StepByStepCounter);
  var ColorFill;

  if(MarkPoints.length == 2){
    ColorFill = '#FF0000';
  }
  else ColorFill = '#FF'+(255-StepByStepCounter*Devide).toString(16)+'00';

  MarkPoints[Index].icon.fillColor = ColorFill;

  MarkPoints[Index].setLabel((StepByStepCounter/2).toString());
  MarkPoints[Index].icon.labelOrigin = new google.maps.Point(0, LabelHeight);
  MarkPoints[Index-1].icon.fillColor = ColorFill;
  document.getElementById("debug").innerHTML=ColorFill;
  MarkPoints[Index].setMap(map);
  MarkPoints[Index-1].setMap(map);
  //MarkPoints[StepByStepCounter].setMap(map);
  //MarkPoints[StepByStepCounter+1].setMap(map);
  StepByStepCounter += 2;
  if(StepByStepCounter >= MarkPoints.length){
    clearInterval(StepByStep_ID);
    StepByStepCounter = 0;
  }
}
function StartReceive(){
  ReceiveLocation();
  terminal = setInterval(ReceiveLocation,60000); 
  //ReceiveLocation();

}
function StopReceive(){
  clearInterval(terminal);
}
function DeleteMarker(){
  //++counter;
  //clearInterval(terminal);
  //document.getElementById('debug').innerHTML=counter;
  for(var i=0;i<MarkPoints.length;++i){
    MarkPoints[i].setMap(null);
  }
  MarkPoints = [];
}
function FindInfo(item){
  var MacAddress = item.slice(item.search("MAC_Address")+14,item.search("Year")-3);
  var Year = item.slice(item.search("Year")+6,item.search("Month")-2);
  var Month = item.slice(item.search("Month")+7,item.search("Day")-2);
  var Day = item.slice(item.search("Day")+5,item.search("Hours")-2);
  var Hours = item.slice(item.search("Hours")+7,item.search("Minute")-2);
  var Minute = item.slice(item.search("Minute")+8,item.search("Second")-2);
  var Second = item.slice(item.search("Second")+8,item.search("GPS_N")-2);

  DateString = Year + '.' + Month + '.' + Day + '. ' + Hours + ':' + Minute + ':' + Second;
  AddressString = DateString;

  document.getElementById("debug").innerHTML=AddressString;
}
function ReceiveLocation()
{
  document.getElementById("text").innerHTML="HIHI";
  if(StepByStep){
    clearInterval(terminal);  
    //document.getElementById('debug').innerHTML =counter;
  }//document.getElementById('debug').innerHTML=id;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET",Command, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange=function(){
    //document.getElementById('debug').innerHTML=xmlhttp.status;
    DeleteMarker();
    if (xmlhttp.readyState==4 && xmlhttp.status==200){
      var StringArray = [];
      //var counter = 0;

      string=xmlhttp.responseText;
      while(string.length != 0){
        StringArray.push(string.slice(0,string.indexOf("}")+1));
        string = string.slice(string.indexOf("}")+1);
      }

      //StringArray.shift();

      //document.getElementById("debug").innerHTML=StringArray[1];

      //document.getElementById("text").innerHTML=item;

      for(var i=0;i<StringArray.length;++i){
        var item = StringArray[i];
        document.getElementById("debug").innerHTML=item;

        FindInfo(item);


        var GPS_N_String = item.slice(item.search("GPS_N")+8,item.search("GPS_E")-3);
        var GPS_E_String = item.slice(item.search("GPS_E")+8,item.search("}")-1);
        document.getElementById("text").innerHTML="GPS_N : "+GPS_N_String+" GPS_E : "+GPS_E_String;
        lat = parseFloat(GPS_N_String);
        lng = parseFloat(GPS_E_String);
        ChangePoint();
        //document.getElementById('debug').innerHTML=2;

      }
      if(StepByStep){
        StepByStep_ID = setInterval(DisplayStepByStep,500);
        //var WaitTime = ((MarkPoints.length)/2)*500 + 1000;
        //setTimeout(StartReceive,WaitTime);
        StepByStep = false;
      }
      else {
        for(var i=0;i<MarkPoints.length;++i){
          MarkPoints[i].setMap(map);
        }
      }
      //document.getElementById("debug").innerHTML=MarkPoints.length;




      //clearInterval(terminal);
    }
    else{
      
    }
  }

}





Init();
SendToBackEnd();


document.getElementById("text").innerHTML="Start";
//server();
