'use strict';

SwaggerEditor.controller('SaveDocCtrl', function SaveDocCtrl($scope,
  $modalInstance) {

  $scope.cancel = function () {
    $modalInstance.close();
  };
});
