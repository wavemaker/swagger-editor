'use strict';

/*******************************************************************************
* This is a configuration file for Swagger-Editor which overrides - '/config/defaults.json'.
* Instead of XHR request to '/config/defaults.json' to get it's settings,
* bootstrap will check for window.$$embeddedDefaults property for the settings
*******************************************************************************/

function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

var $queryParams = getJsonFromUrl(),
    $apiId = $queryParams['apiId'],
    $id = $queryParams['id'];


window.$$embeddedDefaults = {
  analytics: {
    google: {
      id: 'UA-51231036-1'
    }
  },
  appPage: 'index.html',
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
    get: '../../api-creator/rest/documents/',
    post: '../../api-creator/rest/documents/publish?apiName=',
    deleteApi: '../../api-creator/rest/apiInfo/',
    apiId: $apiId,
    id: $id
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
