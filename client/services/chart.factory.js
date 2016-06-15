(function() {
  angular
    .module('PortfolioChart')
    .factory('ChartFactory', ChartFactory)

    ChartFactory.$inject = ['$http'];
    function ChartFactory($http) {

    var chartFactory = {
      getAll,
    }
    return chartFactory;

  ////////////////

    function getAll() {
      var promise = new Promise(function(resolve,reject) {
        d3.json('../../assets/codingexerciseJSON.json',function(err,json) {
          if (err) reject(err)
          resolve(json)
        })
      })
      return promise.then(res => res)
    }

}
})();
