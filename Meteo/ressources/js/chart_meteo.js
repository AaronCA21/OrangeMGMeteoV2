<script src="js/Chart.js/Chart.js" charset="utf-8"></script>
$(document).ready(function(){

var config={
  type:'line',
  data: {
    //creation label axe //
    labels: ['2', '4', '6', '8', '12', '14', '16'],
    //dataset properties
    datasets:[{
      label:'Variation',
      fill:true,

      data:[
        10,20,10,10,20
      ]
    }/*donnee volohany*/]
  },//fin data
  options:{
    responsive: true,
    title: {
      display: true,
      text: 'Chart.js Line Chart'
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    }
  },//fin option
};
window.onload = function() {
  var ctx = document.getElementById('weather-chart').getContext('2d');
  window.myLine = new Chart(ctx, config);
};

})
