(function() {
  angular
    .module('PortfolioChart')
    .config(chartState)

  chartState.$inject = ['$stateProvider'];
  function chartState($stateProvider) {
    $stateProvider.state('chart', {
      url: '/',
      templateUrl: '/components/chart/chart.html',
      controller: 'ChartCtrl',
      controllerAs: 'vm',
      resolve: {
        chartData
      }
    })

    chartState.$inject = ['ChartFactory'];
    function chartData(ChartFactory) {
      return ChartFactory.getAll()
    }
  }

})();
