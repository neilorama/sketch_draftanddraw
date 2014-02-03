'use strict';

angular.module('sketchDraftanddrawApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'sketch'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
