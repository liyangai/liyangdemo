
angular.module('moviecat', [
    'ngRoute',
    'moviecat.movie_detail',
    'moviecat.movie_list',
  ])
  // 常量的定义
  .constant('AppConfig', {
    pageSize: 10,
    listApiAddress: 'http://api.douban.com/v2/movie/',
    detailApiAddress: 'http://api.douban.com/v2/movie/subject/'
  })
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/in_theaters/1' });
  }])
  .controller('SearchController', [
    '$scope',
    '$route',
    'AppConfig',
    function($scope, $route, AppConfig) {
      $scope.input = ''; // 文本框中的值
      $scope.search = function() {
        $route.updateParams({category: 'search', q: $scope.input });//添加q
      };
    }
  ]).controller('NavController', [
  '$scope',
  '$location',
  function($scope, $location) {
    $scope.$location = $location;
    $scope.$watch('$location.path()', function(now) {
      if (now.startsWith('/in_theaters')) {
        $scope.type = 'in_theaters';
      } else if (now.startsWith('/coming_soon')) {
        $scope.type = 'coming_soon';
      } else if (now.startsWith('/top250')) {
        $scope.type = 'top250';
      }
    });
  }
])
