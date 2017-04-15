function DropDown(ElementID,InitialText){
  var SelectBox;
  var SelectArrow;
  var SelectText;
  var OptionBox,SelectMenuInput;
  var OptionElementText;
  var OptionElementTwo;
  var SelectedValue = '-1';
  function init(){
    CreateUI();
    SelectBox.onclick = function(){
      DisplayBox();
    }
    SelectBox.addEventListener('click', function($event){
      $event.stopPropagation();             
    });
    SelectMenuInput.addEventListener('click', function($event){
      $event.stopPropagation();             
    });
    /*window.addEventListener('click',function(){
      DisplayBox(false);
    });*/
    DisplayBox(false);
  }
  function DisplayBox(DisplayFlag){
    if(DisplayFlag == null){
      OptionBox.style.display = (OptionBox.style.display == "none")? "block" : "none";
    }
    else if(DisplayFlag == false){
      OptionBox.style.display = "none";
    }
  }
  this.Disappear = function(){
    DisplayBox(false);
  };
  function CreateUI(){
    SelectBox = document.createElement('div');
    SelectBox.setAttribute('class','SelectBoxClass');
    SelectText = document.createElement('div');
    SelectText.setAttribute('class','SelectTextClass');
    SelectText.innerHTML = InitialText;
    
    SelectArrow = document.createElement('img');
    SelectArrow.setAttribute('class','SelectArrowClass');
    SelectArrow.setAttribute('src','https://s26.postimg.org/yocfqwj49/Select_Arrow.png');
    SelectMenuInput = document.createElement('input');
    SelectMenuInput.setAttribute('class','InputClass');
    SelectMenuInput.setAttribute('type','text');
    SelectMenuInput.size = "4";
    SelectMenuInput.style.zIndex = '-1';
    
    
    OptionBox = document.createElement('div');
    OptionBox.setAttribute('class','OptionBoxClass');
    

    SelectBox.appendChild(SelectText);
    SelectBox.appendChild(SelectArrow);
    SelectBox.appendChild(SelectMenuInput);
    document.getElementById(ElementID).appendChild(SelectBox);
    document.getElementById(ElementID).appendChild(OptionBox);
  }
  this.insert = function(text,value,DisplayInput){
    var OptionElement;
    OptionElement = document.createElement('div');
    OptionElement.setAttribute('class','OptionElementClass');
    OptionElement.setAttribute('data-value',value);
    OptionElement.innerHTML = text;
    
    OptionElement.onclick = function(){
      if(DisplayInput == 1){
        SelectText.innerHTML = '';
        SelectMenuInput.style.zIndex = '10';
      }
      else{
        SelectText.innerHTML = this.innerHTML;
        SelectMenuInput.style.zIndex = '-1';
      }
      SelectedValue = this.getAttribute('data-value');
      DisplayBox(false);
    }
    OptionElement.addEventListener('click', function($event){
      $event.stopPropagation();             
    });
    OptionBox.appendChild(OptionElement);
  };
  this.GetSelectValue = function(){
    //document.getElementById('debug').innerHTML = '333';
    document.getElementById('State').innerHTML = SelectedValue;
    return SelectedValue;
  };
  this.GetKeyboardValue = function(){
    return SelectMenuInput.value;
  };
  
  init();
}