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
  .controller('MainCtrl', function($scope, $firebaseArray, $http, $mdDialog) {
    $scope.loading = true;
    $scope.fields = [
      {field: 'email', name: 'Email'},
      {field: 'direccion', name: 'Dirección'},
      {field: 'representativeNames', name: 'Nombre de quien propone el proyecto'},
      {field: 'phone', name: 'Teléfono'},
      {field: 'associationNames', name: 'Nombre de los integrantes de Asociación de Padres de Familia o Consejo de Participación Social (o de ambos)'},
      {field: 'schoolFeatures', name: 'Características de la escuela'},
      {field: 'studentsNumber', name: 'Número de alumnos'},
      {field: 'environmentDescription', name: 'Descripción del entorno familiar y social de la población beneficiada'},
      {field: 'schoolProblems', name: 'Principales problemas en el entorno de la escuela'},
      {field: 'problematic', name: 'Problemática'},
      {field: 'justification', name: 'Justificación'},
      {field: 'activityDescription', name: 'Descripción de las actividades que se planean realizar'},
      {field: 'namesList', name: 'Lista de quiénes estarían involucrados'},
      {field: 'date', name: 'Fecha estimada'},
      {field: 'decisionDescription', name: 'Breve descripción de cómo se tomarán las decisiones'},
      {field: 'evaluation', name: 'Evaluación de avance'},
      {field: 'interaction', name: '¿Cómo interactuarán con los maestros y directivos de la escuela?'},
      {field: 'signatures', name: 'Firmas'},
    ];

    $scope.showSignature = function(base64) {
      $mdDialog.show(
        $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Firmas')
        .content('<img src="'+ base64 +'">')
        .ok('Ok')
      );
    };

    var firebaseEntries = new Firebase('https://caminoalexito.firebaseio.com/').child('entries');
    $scope.stories = $firebaseArray(firebaseEntries);

    $scope.stories.$loaded(function() {
      $scope.loading = false;
    });

  });
