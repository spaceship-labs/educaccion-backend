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
    'ngTouch',
    'firebase',
    'ngMaterial'
  ])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

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
