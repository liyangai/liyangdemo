(function(angular) {
  'use strict';
  //左侧正在热映 即将上映 top 模块
  var module = angular.module(
    'moviecat.movie_list', [
      'ngRoute',
      'moviecat.services.http'
    ]);
  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/:category/:page', {
      //匹配的例子如  /in_theaters/1
      templateUrl: 'movie_list/view.html',
      controller: 'MovieListController'
    });
  }]);

  module.controller('MovieListController', [
    '$scope',
    '$route',
    '$routeParams',
    'HttpService',
    'AppConfig',
    function($scope, $route, $routeParams, HttpService, AppConfig) {
      //根据路由中的page 得到
      var count = AppConfig.pageSize; // 每一页的条数
      var page = parseInt($routeParams.page); // 当前第几页
      var start = (page - 1) * count; // 当前页从哪开始
      $scope.loading = true;
      $scope.subjects = [];
      $scope.title = 'Loading...';
      $scope.message = '';
      $scope.totalCount = 0;
      $scope.totalPages = 0;
      $scope.currentPage = page;
      HttpService.jsonp(
        AppConfig.listApiAddress + $routeParams.category,
        { start: start, count: count, q: $routeParams.q },
        function(data) {
          $scope.title = data.title;
          $scope.subjects = data.subjects;
          $scope.totalCount = data.total;
          $scope.totalPages = Math.ceil($scope.totalCount / count);
          $scope.loading = false;
          $scope.$apply();
        });
      $scope.go = function(page) {
        if (page >= 1 && page <= $scope.totalPages)
          $route.updateParams({ page: page });
      };
    }
  ]);
})(angular);


