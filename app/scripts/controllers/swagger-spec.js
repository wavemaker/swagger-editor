'use strict';

/*
 * Swagger Spec modal controller
*/
SwaggerEditor.controller('SwaggerSpecModalCtrl', function SwaggerSpecModalCtrl($scope,
  $modalInstance, swaggerSpecPath) {
  $scope.cancel = $modalInstance.close;
  $scope.close = $modalInstance.close;
  $scope.swaggerSpecPath = swaggerSpecPath;
});
