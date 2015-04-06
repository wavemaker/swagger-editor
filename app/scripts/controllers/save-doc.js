'use strict';

SwaggerEditor.controller('SaveDocCtrl', function SaveDocCtrl($scope, $rootScope,
  $modalInstance, $timeout, Storage, ASTManager, defaults) {

  $scope.saveMsg = 'Save in progress&hellip;';

  function saveDoc() {
    var value = $rootScope.editorValue;

    Storage.save('yaml', value, true);
    ASTManager.refresh($rootScope.editorValue);
    $timeout(function () {
      $scope.saveMsg = 'Save successful';
      $modalInstance.close();
    }, 2000);
  }

  saveDoc();

  $scope.close = $modalInstance.close;
});
