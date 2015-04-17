'use strict';

SwaggerEditor.controller('SaveDocCtrl', function SaveDocCtrl($scope, $rootScope,
  $modalInstance, $timeout, Storage, ASTManager, defaults) {

  $scope.saveMsg = 'Save in progress&hellip;';

  //saveDoc
  (function() {
    var value = $rootScope.editorValue;

    Storage.save('yaml', value, function (isSuccess, response) {
      if (isSuccess) {
        $scope.saveMsg = 'Save successful';
        $rootScope.isEditorValueDirty = false;
        $modalInstance.close();
      } else {
        $scope.saveMsg = 'Save Failed. ' + response.error[0].message;
      }
    }, true);
    ASTManager.refresh($rootScope.editorValue);
  }());

  $scope.close = $modalInstance.close;

  setTimeout(function () {
    $(document).click();
  }, 0);

});
