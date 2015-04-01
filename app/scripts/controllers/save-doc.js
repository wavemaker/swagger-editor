'use strict';

SwaggerEditor.controller('SaveDocCtrl', function SaveDocCtrl($scope, $rootScope,
  $modalInstance, $timeout, Storage, ASTManager, defaults) {

  var apiId = defaults.backendEndpoints.apiId;

  $scope.saveMsg = 'Save in progress&hellip;';

  function saveDoc() {
    var value = $rootScope.editorValue,
        location = window.top.location,
        json,
        title;

    if (angular.isString(value)) {
      json = jsyaml.load(value);
    } else {
      json = value;
    }

    if (json && json.info) {
      title = json.info.title;
    }

    Storage.save('yaml', value, true);
    ASTManager.refresh($rootScope.editorValue);
    $timeout(function () {
      $scope.saveMsg = 'Save successful';
      $modalInstance.close();
      if (apiId !== title) {
        location.href = location.href.substr(0,location.href.lastIndexOf("/") + 1) + title;
      }
    }, 2000);
  }

  saveDoc();

  $scope.close = $modalInstance.close;
});
