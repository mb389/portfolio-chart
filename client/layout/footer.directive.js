(function() {
  angular
    .module('PortfolioChart')
    .directive('footer', footer);

    function footer() {
      return {
        templateUrl: 'layout/footer.html'
        }
    }
})();
