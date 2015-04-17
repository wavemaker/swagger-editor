'use strict';

SwaggerEditor.controller('EditorCtrl', function EditorCtrl($scope, $rootScope,
  Editor, Builder, Storage, ASTManager) {
  var debouncedOnAceChange = _.debounce(onAceChange, 200);

  $scope.aceLoaded = Editor.aceLoaded;

  $scope.aceChanged = function () {
    Storage.save('progress', 0);
    debouncedOnAceChange();
  };

  Editor.ready(function () {
    Storage.load('yaml').then(function (yaml) {
      Editor.setReadOnly($rootScope.isReadOnlyMode);
      $rootScope.editorValue = yaml;
      onAceChange(true);
    });
  });

  function onAceChange(isLoaded) {
    var value = $rootScope.editorValue;

    Storage.save('yaml', value);
    ASTManager.refresh($rootScope.editorValue);
    if (!isLoaded) {
      $rootScope.isEditorValueDirty = !angular.isUndefined($rootScope.isEditorValueDirty);
    }
  }
});
