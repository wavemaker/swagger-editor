'use strict';

SwaggerEditor.controller('DeleteDocCtrl', function DeleteDocCtrl($scope,
  $http,
  $modalInstance,
  Storage,
  defaults) {

  $scope.deleteMsg = 'Are you sure you want to delete this document ?';

  $scope.deleteDoc = function () {
    $scope.deleteMsg = 'Deleting document&hellip;';
    Storage.deleteDoc().then(function () {
      $scope.deleteMsg = 'Delete successful';
      window.top.location.href = defaults.appPage;
      $modalInstance.close();
    }, function () {
      $scope.deleteMsg = 'Delete failed';
      $modalInstance.close();
    });

  };

  $scope.cancel = $modalInstance.close;
});
