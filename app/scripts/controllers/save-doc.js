'use strict';

SwaggerEditor.controller('SaveDocCtrl', function SaveDocCtrl($scope, $rootScope,
  $modalInstance, $timeout, Storage, ASTManager, defaults) {

  $scope.saveMsg = 'Save in progress&hellip;';

  //saveDoc
  (function() {
    var value = $rootScope.editorValue;

    Storage.save('yaml', value, function () {
      $scope.saveMsg = 'Save successful';
      $modalInstance.close();
    }, true);
    ASTManager.refresh($rootScope.editorValue);
  }());

  $scope.close = $modalInstance.close;
});
