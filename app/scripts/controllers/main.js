/* globals Firebase */
'use strict';

/**
 * @ngdoc function
 * @name educaccionApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the educaccionApp
 */
angular.module('educaccionApp')
  .controller('MainCtrl', function($scope, $firebaseArray, $http) {
    var firebaseEntries = new Firebase('https://caminoalexito.firebaseio.com/').child('entries'); //
    $scope.stories = $firebaseArray(firebaseEntries);

    $scope.stories.$loaded(function() {
      var ccts = [];
      $scope.stories.forEach(function(story) {
        ccts.push(story.cct);
      });
      var data = {
        ccts: ccts.join(','),
        pagination : ccts.length,
        limit: 1000
      };
      $http.post('http://mte.spaceshiplabs.com/api/escuelas',data).then(function(res){
        var schoolInfo = res.data;
        console.log(schoolInfo);
      });
    });

  });
