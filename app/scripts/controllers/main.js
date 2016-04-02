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
    $scope.filesOnly = true;
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

    $scope.showFiles = function(files) {
      if (!files) {
        return;
      }

      files = files.forEach ? files : Object.keys(files).map(function(k){ return files[k];});
      var imgs = '<div layout="row">', urls = '<div layout="column">';
      files.forEach(function (file) {
        if (file.type && file.type.indexOf('image') === 0) {
          imgs += '<img ng-src="'+ file.raw +'">';
        }else {
          urls += '<a target="_blank" href="'+file.raw+'">'+file.name+'</a> <br/>';
        }
      });
      imgs += '</div>';
      urls += '</div>';
        //.content('<img src="'+ base64 +'">')
      var show =  $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Archivos')
        .content('<div layout="column">'+imgs+urls+'</div>')
        .ok('Ok');
      $mdDialog.show(show);

    };

    var firebaseEntries = new Firebase('https://caminoalexito.firebaseio.com/').child('entries');
    $scope.stories = $firebaseArray(firebaseEntries);

    $scope.stories.$loaded(function() {
      $scope.loading = false;
    });

    $scope.downloadAll = function(files) {
      files.forEach(function(file){
        var blob = dataURLToBlob(file.raw);
        saveAs(blob, file.name);
      });
    };

    $scope.filterFiles = function(story) {
      if ($scope.filesOnly) {
        return story.files && story.files.length;
      }
      return true;
    };

    function dataURLToBlob(dataURL) {
      //src "https://github.com/ebidel/filer.js/blob/master/src/filer.js#L137";
      var BASE64_MARKER = ';base64,';
      if (dataURL.indexOf(BASE64_MARKER) === -1) {
        var parts = dataURL.split(','),
          contentTypeData = parts[0].split(':')[1],
          rawData = decodeURIComponent(parts[1]);

        return new Blob([rawData], {type: contentTypeData});
      }

      var data = dataURL.split(BASE64_MARKER),
        contentType = data[0].split(':')[1],
        raw = window.atob(data[1]),
        rawLength = raw.length,
        uInt8Array = new Uint8Array(rawLength);

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], {type: contentType});
    }

  });
