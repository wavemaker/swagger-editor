'use strict';

/*
 * Swagger Spec modal controller
*/
SwaggerEditor.controller('AboutCommentsModalCtrl', function AboutCommentsModalCtrl($scope,
  $modalInstance, aboutCommentsPath) {
  $scope.cancel = $modalInstance.close;
  $scope.close = $modalInstance.close;
  $scope.aboutCommentsPath = aboutCommentsPath;
});
