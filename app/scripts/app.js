'use strict';

/**
 * @ngdoc overview
 * @name educaccionApp
 * @description
 * # educaccionApp
 *
 * Main module of the application.
 */
angular
  .module('educaccionApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
