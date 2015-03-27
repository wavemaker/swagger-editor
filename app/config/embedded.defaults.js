'use strict';

/*******************************************************************************
* This is a configuration file for Swagger-Editor which overrides - '/config/defaults.json'.
* Instead of XHR request to '/config/defaults.json' to get it's settings,
* bootstrap will check for window.$$embeddedDefaults property for the settings
*******************************************************************************/


window.$$embeddedDefaults = {
  analytics: {
    google: {
      id: 'UA-51231036-1'
    }
  },
  disableCodeGen: true,
  examplesFolder: 'tp/swagger-editor/app/spec-files/',
  exampleFiles: [
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
  useBackendForStorage: false,
  backendEndpoint: '/editor/spec',
  backendHealthCheckTimeout: 5000,
  useYamlBackend: false,
  disableFileMenu: false,
  headerBranding: true,
  enableTryIt: true,
  brandingCssClass: '',
  schemaUrl: 'tp/swagger-editor/app/schema/swagger.json',
  importProxyUrl: 'https://cors-it.herokuapp.com/?url=',
  aceBuildsBasePath: 'tp/ace-builds/src-noconflict'
};
