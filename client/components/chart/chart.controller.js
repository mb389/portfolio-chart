(function() {
  angular
    .module('PortfolioChart')
    .controller('ChartCtrl', ChartCtrl)

  ChartCtrl.$inject = ['ChartFactory','chartData'];
  function ChartCtrl(ChartFactory,chartData) {

    var vm = this;
    vm.chartData=chartData;

    var logretDailyVals = vm.chartData.timeseries.map(el => el.logret_daily)
    var logretBenchVals = vm.chartData.timeseries.map(el => el.logret_daily_benchmark)
    var logretDailyHisto = d3.layout.histogram().bins(30)(logretDailyVals);
    var logretBenchHisto = d3.layout.histogram().bins(30)(logretBenchVals);

    var buckets=[]
    var start=logretDailyHisto[0].x;
    var interval=logretDailyHisto[0].dx;

    var logretDaily = logretDailyHisto.map((el,idx) => {
      var label = (el.x*100).toFixed(1)+"%"
      buckets.push(label)
      return {
        "x": idx,
        "y": el.length,
        "label": buckets[idx]
      }
    })

  var logretBench = logretDaily.map((ret,idx) => {
    var count=0;
      logretBenchVals.forEach(el => {
        if (el < start+interval*idx && el > start+interval*(idx-1)) {
          count++;
        }
      })
      return {
        "x": idx,
        "y": count,
        "label": buckets[idx]
      }
    })

  vm.options2 = {
   chart: {
       type: 'multiBarChart',
       height: 500,
       margin : {
           top: 20,
           right: 20,
           bottom: 65,
           left: 45
       },
       color: ["#0277BD","#EF6C00"],
       reduceXTicks: false,
       staggerLabels: true,
       duration: 500,
       stacked: false,
       xAxis: {
           axisLabel: 'Daily Returns',
           axisLabelDistance: 12,
           tickFormat: function(d){
              return vm.data2[0].values[d].label;
           }
       },
       yAxis: {
           axisLabel: 'Frequency',
           axisLabelDistance: -20,
           showMaxMin: false,
           tickFormat: function(d){
               return d3.format(',.f')(d);
           }
       }
   }
  };

  vm.data2 = [{
    key: "Log. Port. Return",
    values: logretDaily
    },{
      key: "Log. Bench. Return",
      values: logretBench
  }]
  }
})();
