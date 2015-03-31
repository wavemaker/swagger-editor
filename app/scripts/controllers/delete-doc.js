'use strict';

SwaggerEditor.controller('DeleteDocCtrl', function DeleteDocCtrl($scope,
  $modalInstance) {

  $scope.deleteDoc = function () {
    $modalInstance.close();
  };

  $scope.cancel = $modalInstance.close;
});
