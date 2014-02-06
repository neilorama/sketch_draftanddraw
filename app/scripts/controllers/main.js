'use strict';

var app = angular.module('sketchDraftanddrawApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })
  .directive('resize', function ($window){
    return function(scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function(){
            return { 'h' :w.height(), 'w': w.width() };
        };
        scope.$watch(scope.getWindowDimensions, function( newValue, oldValue ){
            scope.windowHeight = newValue.h;
            scope.windowWidth  = newValue.w;

            scope.style = function(){
                return {
                    'height': newValue.h,
                    'width' : newValue.w
                };
            };
        }, true);

        w.bind('resize', function() {
            scope.$apply();
        })
    }

  });
