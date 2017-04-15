window.onload = function (){
  $(".canvas-container").hide();
  $(".select-container").hide();
  
  var isHidden = 1;

  $("#ChartIcon").click(function() {
    if (isHidden) {
      isHidden = 0;
      $(".canvas-container").show(1000);
      $(".select-container").show(1000);
      
    } else {
      isHidden = 1;
      $(".canvas-container").hide(1000);
      $(".select-container").hide(1000);
    }
  });

  var canvas = document.getElementById("myChart");
  var select = document.getElementById("mySelect");
  var object_prototype = {
      label: "101a18000034",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 10,
      showLine: true,
      data: []
  };

  var object_green = object_prototype;

  var object_yellow = Object.assign({}, object_prototype);
  object_yellow.label = "101a18000035";
  object_yellow.backgroundColor = "rgba(255, 215, 0, 0.4)";
  object_yellow.borderColor = "rgba(255, 215, 0, 1)";
  object_yellow.pointBorderColor = "rgba(255, 215, 0, 1)";
  object_yellow.pointHoverBackgroundColor = "rgba(255, 215, 0, 1)";
  object_yellow.data = [];

  var object_red = Object.assign({}, object_prototype);
  object_red.label = "101a18000036";
  object_red.backgroundColor = "rgba(255, 36, 0, 0.4)";
  object_red.borderColor = "rgba(255, 36, 0, 1)";
  object_red.pointBorderColor = "rgba(255, 36, 0, 1)";
  object_red.pointHoverBackgroundColor = "rgba(255, 36, 0, 1)";
  object_red.data = [];

  var data = {
    labels : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [object_green, object_yellow, object_red]
  };

  var option = {
    showLines: true
  };
  var myLineChart = Chart.Line(canvas, {
    data: data,
    options: option
  });

  select.onchange = function() {
    var labelDay = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
    "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
    var optionValue = this.options[this.selectedIndex].value;
    var xhr = new XMLHttpRequest();
    xhr.open("GET","//140.113.89.153:8888/" + optionValue, true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(optionValue == "Day") {
            var jsonText = xhr.responseText;
            var precisionsSet = JSON.parse(jsonText);
			console.log(precisionsSet);
            data.labels = labelDay;
            data.datasets[0].data = precisionsSet.green;
            data.datasets[1].data = precisionsSet.yellow;
            data.datasets[2].data = precisionsSet.red;
            var LineChart = Chart.Line(canvas, {
              data: data,
              options: option
            });
        }
        else if(optionValue == "Week"){
          var jsonText = xhr.responseText;
          data.labels = labelWeek;
          data.datasets[0].data = JSON.parse(jsonText);
          var LineChart = Chart.Line(canvas, {
            data: data,
            options: option
          });
        }
      }
    };
  }

  $(function() {
    $("select").selectBoxIt({
      showEffect: "fadeIn",
      showEffectSpeed: 400,
      hideEffect: "fadeOut",
      hideEffectSpeed: 400
    });
  });
}
