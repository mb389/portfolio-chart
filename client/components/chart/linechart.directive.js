(function() {
  angular
    .module('PortfolioChart')
    .directive('linechart', linechart);

    function linechart() {
      var directive = {
        templateUrl: '<div id="chart"></div>',
        conroller: controller,
        controllerAs: 'vm',
        bindToController: true
        }
      return directive;

        function controller() {
        }
    }
})();
