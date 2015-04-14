'use strict';

SwaggerEditor.service('Backend', function Backend($http, $q, defaults,
  Builder) {
  var changeListeners =  {};
  var buffer = {};
  var commit = _.throttle(commitNow, 200, {leading: false, trailing: true});

  function commitNow(data, callback, saveInBackend) {
    var result = Builder.buildDocs(data, { resolve: true }),
        json;
    if (!result.error && saveInBackend) {
      if (angular.isString(data)) {
        json = [jsyaml.load(data)];
      } else {
        json = [json];
      }
      $http.post(defaults.backendEndpoints.post + defaults.backendEndpoints.projectId, json, {
          'headers': {
            'Content-Type':'text/plain'
          }
      }).then(function (response) {
        if (angular.isFunction(callback)) {
          callback(response);
        }
      });
    }
  }

  this.save = function (key, value, callback, saveInBackend) {

    // Save values in a buffer
    buffer[key] = value;

    if (Array.isArray(changeListeners[key])) {
      changeListeners[key].forEach(function (fn) {
        fn(value);
      });
    }

    if (defaults.useYamlBackend && (key === 'yaml' && value)) {
      commit(value, callback, saveInBackend);
    } else if (key === 'specs' && value) {
      commit(buffer[key]);
    }

  };

  this.deleteDoc = function () {
    return $http.delete(defaults.backendEndpoints.deleteApi + defaults.backendEndpoints.projectId);
  };

  this.reset = noop;

  this.load = function (key) {
    if (key !== 'yaml' || !defaults.backendEndpoints.projectId) {
      var deferred = $q.defer();
      if (!key) {
        deferred.reject();
      } else {
        deferred.resolve(buffer[key]);
      }
      return deferred.promise;
    }

    return $http.get(defaults.backendEndpoints.get + defaults.backendEndpoints.projectId)
      .then(function (res) {
        var yaml;
        if (angular.isObject(res) && res.data[0]) {
          yaml = jsyaml.dump(res.data[0])
        } else {
          yaml = res;
        }
        if (defaults.useYamlBackend) {
          buffer.yaml = yaml;
          return buffer.yaml;
        }
        return yaml;
      });
  };

  this.addChangeListener = function (key, fn) {
    if (angular.isFunction(fn)) {
      if (!changeListeners[key]) {
        changeListeners[key] = [];
      }
      changeListeners[key].push(fn);
    }
  };

  function noop() {}
});
