'use strict';

/*******************************************************************************
* This is a configuration file for Swagger-Editor which overrides - '/config/defaults.json'.
* Instead of XHR request to '/config/defaults.json' to get it's settings,
* bootstrap will check for window.$$embeddedDefaults property for the settings
*******************************************************************************/

var $apiId = location.search.split('apiId=')[1];

window.$$embeddedDefaults = {
  analytics: {
    google: {
      id: 'UA-51231036-1'
    }
  },
  disableCodeGen: true,
  examplesFolder: 'tp/swagger-editor/app/spec-files/',
  exampleFiles: [
    'guide.yaml',
    'default.yaml',
    'heroku-pets.yaml',
    'minimal.yaml',
    'echo.yaml',
    'petstore_simple.yaml',
    'petstore_full.yaml',
    'basic-auth.yaml',
    'security.yaml'
  ],
  autocompleteExtension: {},
  useBackendForStorage: true,
  backendEndpoints: {
    get: '../../edn-services/rest/documents/project/' + ($apiId ? decodeURIComponent($apiId) : ''),
    post: '../../edn-services/rest/documents/publish?isApiFirst=true'
  },
  backendHealthCheckTimeout: 5000,
  useYamlBackend: true,
  disableFileMenu: false,
  headerBranding: true,
  disableNewUserIntro: true,
  enableTryIt: true,
  brandingCssClass: '',
  schemaUrl: 'tp/swagger-editor/app/schema/swagger.json',
  importProxyUrl: 'https://cors-it.herokuapp.com/?url=',
  aceBuildsBasePath: 'tp/ace-builds/src-noconflict',
  headerOptions: {
    fileMenu: {
      blankProject: false,
      importURL: false
    }
  }
};
