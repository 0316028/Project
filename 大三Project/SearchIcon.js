function SearchIconClass(ElementID){

  var SearchBox;
  var SearchIcon;
  var SearchIconComponent;
  var SelectMenuBox;
  var SelectMenuOne,SelectMenuTwo;
  var PaddingWidth = 15;
  var InputLeft = 30;
  var PaddingTop = 120;
  var SelectWidth = 200;
  var MenuBoxHeight = 200;
  var MenuDivOne,MenuDivTwo;
  var SelectMenuArray = [];
  var TimeDiv,TimeList;
  function init(){
    CreateUI();
    SearchBox.onclick = function(){
      DisplayBox();
    }
    
    SearchBox.addEventListener('click', function($event){
      $event.stopPropagation();             
    });
    SelectMenuBox.addEventListener('click', function($event){
      DisappearSelectMenu();
      $event.stopPropagation();             
    });
    window.addEventListener('click',function(){
      DisplayBox(false);
    });
    DisplayBox(false);
  }
  function DisappearSelectMenu(){
    for(var i = 0;i<SelectMenuArray.length;++i){
      SelectMenuArray[i].Disappear();
    }
  }
  function DisplayBox(DisplayFlag){
    if(DisplayFlag == null){
      SelectMenuBox.style.display = (SelectMenuBox.style.display == "none")? "block" : "none";
    }
    else if(DisplayFlag == false){
      SelectMenuBox.style.display = "none";
    }
  }
  function CreateUI(){
    
    SearchBox = document.createElement('div');
    SearchBox.setAttribute('class','SearchBoxClass');
    
    SearchIcon = document.createElement('img');
    SearchIcon.setAttribute('src','https://s26.postimg.org/ttiqsmksp/Find.png');
    SearchIcon.setAttribute('class','SearchIconClass');
    
    SearchIconComponent = document.createElement('img');
    SearchIconComponent.setAttribute('src','https://s26.postimg.org/yf57q4amh/arrow.png');
    SearchIconComponent.setAttribute('class','SearchIconComponentClass');
    
    SearchBox.appendChild(SearchIcon);
    SearchBox.appendChild(SearchIconComponent);
    
    SelectMenuBox = document.createElement('div');
    SelectMenuBox.setAttribute('class','SelectMenuBoxClass');
    SelectMenuBox.style.width = (PaddingWidth*3 + SelectWidth*2).toString() + "px";
    
    MenuDivOne = document.createElement('div');
    MenuDivOne.setAttribute('id','MenuDivOne');
    MenuDivOne.setAttribute('class','MenuDivOneClass');
    MenuDivOne.style.left = PaddingWidth.toString() + "px";
    
    MenuDivTwo = document.createElement('div');
    MenuDivTwo.setAttribute('id','MenuDivTwo');
    MenuDivTwo.setAttribute('class','MenuDivTwoClass');
    MenuDivTwo.style.left = (PaddingWidth*2).toString() + 'px';
    
    TimeDiv = document.createElement('div');
    TimeDiv.setAttribute('id','TimeDiv');
    TimeDiv.setAttribute('class','TimeDivClass');
    //TimeDiv.style.left = (PaddingWidth*2).toString() + 'px';
    
    
    //SelectMenuTwoInput.style.left = InputLeft.toString()+"px";
    //SelectMenuInput.style.top = PaddingTop.toString() + "px";
   
    SelectMenuBox.appendChild(MenuDivOne);
    SelectMenuBox.appendChild(MenuDivTwo);
    SelectMenuBox.appendChild(TimeDiv);
    
    
   
    
    SelectMenuBox.style.height = (MenuBoxHeight).toString() + "px";
    
    document.getElementById(ElementID).appendChild(SearchBox);
    document.getElementById(ElementID).appendChild(SelectMenuBox);
    
    SelectMenuOne = new DropDown('MenuDivOne','--NUMBER--');
    SelectMenuTwo = new DropDown('MenuDivTwo','--MODE--');
    TimeList = new SearchTime('TimeDiv');
    
    SelectMenuArray.push(SelectMenuOne);
    SelectMenuArray.push(SelectMenuTwo);
  }
  this.InsertOption = function(text,value,Index,DisplayInput){
    
    SelectMenuArray[Index].insert(text,value,DisplayInput);
  };
  this.GetValue = function(Index){
    return SelectMenuArray[Index].GetSelectValue();
  };
  this.GetKeyboardValue = function(){
    return SelectMenuOne.GetKeyboardValue();
  };
  this.GetFromDate = function(){
    return  TimeList.GetFromDate();
  }
  this.GetToDate = function(){
    return  TimeList.GetToDate();
  }
  
  init();
}




