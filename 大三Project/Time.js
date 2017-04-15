function SearchTime(ElementID){
  var Container;
  var FromBox,ToBox,TimeTextBox;
  var YearBox,MonthBox,DayBox,HourBox,MinuteBox,SecondBox;
  var YearFrom,YearTo;
  var YearWidth = 65;
  var SlashOne,SlashTwo;
  var ColonOne,ColonTwo;
  var SlashOneFrom,SlashOneTo,SlashTwoFrom,SlashTwoTo;
  var ColonOneFrom,ColonOneTo,ColonTwoFrom,ColonTwoTo;
  var MonthFrom,MonthTo;
  var DayFrom,DayTo;
  var HourFrom,HourTo,MinuteFrom,MinuteTo,SecondFrom,SecondTo;
  var FromText,ToText,TextBox;
  function init(){
    CreateUI();
  }
  function CreateUI(){
    Container = document.createElement('div');
    Container.setAttribute('class','ContainerClass');
    
    TimeTextBox = document.createElement('div');
    
    TextBox = document.createElement('div');
    TextBox.setAttribute('class','TextBoxClass');
    
    YearBox = document.createElement('div');
    YearBox.setAttribute('class','TimeBoxClass');
    YearBox.style.width = YearWidth.toString() + 'px';
    //YearBox.style.left = '10px';
    MonthBox = document.createElement('div');
    MonthBox.setAttribute('class','TimeBoxClass');
    MonthBox.style.width = (YearWidth/2).toString() + 'px';
    DayBox = document.createElement('div');
    DayBox.setAttribute('class','TimeBoxClass');
    DayBox.style.width = (YearWidth/2).toString() + 'px';
    HourBox = document.createElement('div');
    HourBox.setAttribute('class','TimeBoxClass');
    HourBox.style.width = (YearWidth/2).toString() + 'px';
    MinuteBox = document.createElement('div');
    MinuteBox.setAttribute('class','TimeBoxClass');
    MinuteBox.style.width = (YearWidth/2).toString() + 'px';
    SecondBox = document.createElement('div');
    SecondBox.setAttribute('class','TimeBoxClass');
    SecondBox.style.width = (YearWidth/2).toString() + 'px';
    
    FromText = document.createElement('div');
    FromText.setAttribute('class','FromTextClass');
    FromText.innerHTML = 'From';
    
    ToText = document.createElement('div');
    ToText.setAttribute('class','ToTextClass');
    ToText.innerHTML = 'To';
    
    TextBox.appendChild(FromText);
    TextBox.appendChild(ToText);
    
    SlashOne = document.createElement('div');
    SlashOne.setAttribute('class','MarkClass');
    SlashOneFrom = document.createElement('div');
    SlashOneFrom.setAttribute('class','SlashOneFromClass');
    SlashOneFrom.innerHTML = '/';
    SlashOneTo = document.createElement('div');
    SlashOneTo.setAttribute('class','SlashOneToClass');
    SlashOneTo.innerHTML = '/';
    //SlashOne.style.left = '10px';
    SlashOne.appendChild(SlashOneFrom);
    SlashOne.appendChild(SlashOneTo);
    
    SlashTwo = document.createElement('div');
    SlashTwo.setAttribute('class','MarkClass');
    SlashTwoFrom = document.createElement('div');
    SlashTwoFrom.setAttribute('class','SlashTwoFromClass');
    SlashTwoFrom.innerHTML = '/';
    SlashTwoTo = document.createElement('div');
    SlashTwoTo.setAttribute('class','SlashTwoToClass');
    SlashTwoTo.innerHTML = '/';
    SlashTwo.appendChild(SlashTwoFrom);
    SlashTwo.appendChild(SlashTwoTo);
    
    ColonOne = document.createElement('div');
    ColonOne.setAttribute('class','MarkClass');
    ColonOneFrom = document.createElement('div');
    ColonOneFrom.setAttribute('class','ColonOneFromClass');
    ColonOneFrom.innerHTML = ':';
    ColonOneTo = document.createElement('div');
    ColonOneTo.setAttribute('class','ColonOneToClass');
    ColonOneTo.innerHTML = ':';
    ColonOne.appendChild(ColonOneFrom);
    ColonOne.appendChild(ColonOneTo);
    
    ColonTwo = document.createElement('div');
    ColonTwo.setAttribute('class','MarkClass');
    ColonTwoFrom = document.createElement('div');
    ColonTwoFrom.setAttribute('class','ColonTwoFromClass');
    ColonTwoFrom.innerHTML = ':';
    ColonTwoTo = document.createElement('div');
    ColonTwoTo.setAttribute('class','ColonTwoToClass');
    ColonTwoTo.innerHTML = ':';
    ColonTwo.appendChild(ColonTwoFrom);
    ColonTwo.appendChild(ColonTwoTo);
    
    YearBox.innerHTML = 'Year';
    MonthBox.innerHTML = 'Mon';
    DayBox.innerHTML = 'Day';
    HourBox.innerHTML = 'Hr';
    MinuteBox.innerHTML = 'Min';
    SecondBox.innerHTML = 'Sec';
    
    YearFrom = document.createElement('input');
    YearTo = document.createElement('input');
    YearFrom.setAttribute('class','YearInputClass');
    YearTo.setAttribute('class','YearInputClass');
    /*YearFrom.style.width = YearWidth;
    YearTo.style.width = YearWidth;*/
    YearFrom.defaultValue = '2017';
    YearTo.defaultValue = '2050';
    YearBox.appendChild(YearFrom);
    YearBox.appendChild(YearTo);
    
    MonthFrom = document.createElement('input');
    MonthTo = document.createElement('input');
    MonthFrom.setAttribute('class','MonthInputClass');
    MonthTo.setAttribute('class','MonthInputClass');
    /*YearFrom.style.width = YearWidth;
    YearTo.style.width = YearWidth;*/
    MonthFrom.defaultValue = '1';
    MonthTo.defaultValue = '12';
    MonthBox.appendChild(MonthFrom);
    MonthBox.appendChild(MonthTo);
    
    DayFrom = document.createElement('input');
    DayTo = document.createElement('input');
    DayFrom.setAttribute('class','DayInputClass');
    DayTo.setAttribute('class','DayInputClass');
    /*YearFrom.style.width = YearWidth;
    YearTo.style.width = YearWidth;*/
    DayFrom.defaultValue = '1';
    DayTo.defaultValue = '31';
    DayBox.appendChild(DayFrom);
    DayBox.appendChild(DayTo);
    
    HourFrom = document.createElement('input');
    HourTo = document.createElement('input');
    HourFrom.setAttribute('class','HourInputClass');
    HourTo.setAttribute('class','HourInputClass');
    /*YearFrom.style.width = YearWidth;
    YearTo.style.width = YearWidth;*/
    HourBox.style.marginLeft = '20px';
    HourFrom.defaultValue = '0';
    HourTo.defaultValue = '23';
    HourBox.appendChild(HourFrom);
    HourBox.appendChild(HourTo);
    
    MinuteFrom = document.createElement('input');
    MinuteTo = document.createElement('input');
    MinuteFrom.setAttribute('class','MinuteInputClass');
    MinuteTo.setAttribute('class','MinuteInputClass');
    /*YearFrom.style.width = YearWidth;
    YearTo.style.width = YearWidth;*/
    MinuteFrom.defaultValue = '0';
    MinuteTo.defaultValue = '59';
    MinuteBox.appendChild(MinuteFrom);
    MinuteBox.appendChild(MinuteTo);
    
    SecondFrom = document.createElement('input');
    SecondTo = document.createElement('input');
    SecondFrom.setAttribute('class','SecondInputClass');
    SecondTo.setAttribute('class','SecondInputClass');
    /*YearFrom.style.width = YearWidth;
    YearTo.style.width = YearWidth;*/
    SecondFrom.defaultValue = '0';
    SecondTo.defaultValue = '59';
    SecondBox.appendChild(SecondFrom);
    SecondBox.appendChild(SecondTo);
    
    TimeTextBox.appendChild(TextBox);
    TimeTextBox.appendChild(YearBox);
    TimeTextBox.appendChild(SlashOne);
    TimeTextBox.appendChild(MonthBox);
    TimeTextBox.appendChild(SlashTwo);
    TimeTextBox.appendChild(DayBox);
    TimeTextBox.appendChild(HourBox);
    TimeTextBox.appendChild(ColonOne);
    TimeTextBox.appendChild(MinuteBox);
    TimeTextBox.appendChild(ColonTwo);
    TimeTextBox.appendChild(SecondBox);
    
    FromBox = document.createElement('div');
    
    ToBox = document.createElement('div');
    
    Container.appendChild(TimeTextBox);
    //Container.appendChild(FromBox);
    //Container.appendChild(ToBox);
    
    document.getElementById(ElementID).appendChild(Container);
  }
  this.GetYearFrom = function(){
    return YearFrom.value;
  }
  this.GetYearTo = function(){
    return YearTo.value;
  }
  this.GetMonthFrom = function(){
    return MonthFrom.value;
  }
  this.GetMonthTo = function(){
    return MonthTo.value;
  }
  this.GetDayFrom = function(){
    return DayFrom.value;
  }
  this.GetDayTo = function(){
    return DayTo.value;
  }
  this.GetHourFrom = function(){
    return HourFrom.value;
  }
  this.GetHourTo = function(){
    return HourTo.value;
  }
  this.GetMinuteFrom = function(){
    return MinuteFrom.value;
  }
  this.GetMinuteTo = function(){
    return MinuteTo.value;
  }
  this.GetSecondFrom = function(){
    return SecondFrom.value;
  }
  this.GetSecondTo = function(){
    return SecondTo.value;
  }
  this.GetFromDate = function(){
    return YearFrom.value + '/' + MonthFrom.value + '/' + DayFrom.value + '/' + HourFrom.value + '/' +MinuteFrom.value + '/' + SecondFrom.value; 
  }
  this.GetToDate = function(){
    return YearTo.value + '/' + MonthTo.value + '/' + DayTo.value + '/' + HourTo.value + '/' + MinuteTo.value + '/' + SecondTo.value; 
  }
  init();

}
