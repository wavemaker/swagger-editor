'use strict';

SwaggerEditor.controller('HeaderCtrl', function HeaderCtrl($scope, $modal,
  $stateParams, $state, $rootScope, Storage, Builder, FileLoader, ASTManager,
  Editor, Codegen, Preferences, defaults, strings) {

  $scope.headerOptions = defaults.headerOptions;

  if ($stateParams.path) {
    $scope.breadcrumbs  = [{ active: true, name: $stateParams.path }];
  } else {
    $scope.breadcrumbs  = [];
  }

  // var statusTimeout;
  Storage.addChangeListener('progress', function (progressStatus) {
    $scope.status = strings.stausMessages[progressStatus];
    $scope.statusClass = null;

    if (progressStatus > 0) {
      $scope.statusClass = 'success';
    }

    if (progressStatus < 0) {
      $scope.statusClass = 'error';
    }
  });

  // Show the intro if it's first time visit
  Storage.load('intro').then(function (intro) {
    if (!intro && !defaults.disableNewUserIntro) {
      $scope.showAbout = true;
      Storage.save('intro', true);
    }
  });

  // -- Client and Server menus
  $scope.disableCodeGen = defaults.disableCodeGen;

  if (!defaults.disableCodeGen) {
    Codegen.getServers().then(function (servers) {
      $scope.servers = servers;
    });

    Codegen.getClients().then(function (clients) {
      $scope.clients = clients;
    });
  }

  $scope.getSDK = function (type, language) {
    Codegen.getSDK(type, language).then(noop, showCodegenError);
  };

  function showCodegenError(resp) {
    $modal.open({
      templateUrl: 'templates/code-gen-error-modal.html',
      controller: 'GeneralModal',
      size: 'large',
      resolve: {
        data:  function () { return resp.data; }
      }
    });
  }

  $scope.showFileMenu = function () {
    return !defaults.disableFileMenu;
  };

  $scope.showHeaderBranding = function () {
    return defaults.headerBranding;
  };

  $scope.newProject = function (fresh) {
    FileLoader.loadFromUrl(defaults.examplesFolder + 'guide.yaml').then(function (value) {
      value = fresh ? '' : value;
      $rootScope.editorValue = value;
      ASTManager.refresh($rootScope.editorValue);
      Storage.save('yaml', value);
    });
  };

  $scope.assignDownloadHrefs = function () {
    assignDownloadHrefs($scope, Storage);
  };

  $scope.openImportFile = function () {
    $modal.open({
      templateUrl: 'templates/file-import.html',
      controller: 'FileImportCtrl',
      size: 'large'
    });
  };

  $scope.openImportUrl = function () {
    $modal.open({
      templateUrl: 'templates/url-import.html',
      controller: 'UrlImportCtrl',
      size: 'large'
    });
  };

  $scope.openPasteJSON = function () {
    $modal.open({
      templateUrl: 'templates/paste-json.html',
      controller: 'PasteJSONCtrl',
      size: 'large'
    });
  };

  $scope.openAbout = function () {
    $modal.open({
      templateUrl: 'templates/about.html',
      size: 'large',
      controller: 'ModalCtrl'
    });
  };

  $scope.saveDoc = function () {
    $modal.open({
      templateUrl: 'templates/save-doc.html',
      controller: 'SaveDocCtrl',
      size: 'large'
    });
  };

  $scope.deleteDoc = function () {
    $modal.open({
      templateUrl: 'templates/delete-doc.html',
      controller: 'DeleteDocCtrl',
      size: 'large'
    });
  };

  $scope.closeEditor = function () {
    window.top.location.href = defaults.appPage;
  }

  $scope.toggleAboutEditor = function (value) {
    $scope.showAbout = value;
  };

  $scope.openEditorPreferences = Editor.showSettings;
  $scope.resetSettings = Editor.resetSettings;
  $scope.adjustFontSize = Editor.adjustFontSize;

  $scope.openExamples = function () {
    $modal.open({
      templateUrl: 'templates/open-examples.html',
      controller: 'OpenExamplesCtrl',
      size: 'large'
    });
  };

  $scope.toggleLiveRender = function () {
    Preferences.set('liveRender', !Preferences.get('liveRender'));
  };

  $scope.isLiveRenderEnabled = function () {
    return !!Preferences.get('liveRender');
  };

  /*
   * Should show editor related menu options?
  */
  $scope.showEditorMenuOptions = function () {
    return $rootScope.mode === 'edit';
  };

  function assignDownloadHrefs() {
    var MIME_TYPE = 'text/plain';

    Storage.load('yaml').then(function (yaml) {

      // JSON
      var json = jsyaml.load(yaml);

      // swagger and version should be a string to comfort with the schema
      if (json.info.version) {
        json.info.version = String(json.info.version);
      }
      if (json.swagger) {
        if (json.swagger === 2) {
          json.swagger = '2.0';
        } else {
          json.swagger = String(json.swagger);
        }
      }

      json = JSON.stringify(json, null, 4);
      var jsonBlob = new Blob([json], {type: MIME_TYPE});
      $scope.jsonDownloadHref = window.URL.createObjectURL(jsonBlob);
      $scope.jsonDownloadUrl = [
        MIME_TYPE,
        'swagger.json',
        $scope.jsonDownloadHref
      ].join(':');

      // YAML
      var yamlBlob = new Blob([yaml], {type: MIME_TYPE});
      $scope.yamlDownloadHref = window.URL.createObjectURL(yamlBlob);
      $scope.yamlDownloadUrl = [
        MIME_TYPE,
        'swagger.yaml',
        $scope.yamlDownloadHref
      ].join(':');
    });
  }

  function noop() {

  }
});
