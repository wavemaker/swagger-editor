'use strict';

SwaggerEditor.service('Backend', function Backend($http, $q, defaults,
  Builder) {
  var changeListeners =  {};
  var buffer = {};
  var commit = _.throttle(commitNow, 200, {leading: false, trailing: true});

  function commitNow(data) {
    var result = Builder.buildDocs(data, { resolve: true });
    if (!result.error) {
      $http.post(defaults.backendEndpoints.post, [JSON.parse(data)]);
    }
  }

  this.save = function (key, value) {

    // Save values in a buffer
    buffer[key] = value;

    if (Array.isArray(changeListeners[key])) {
      changeListeners[key].forEach(function (fn) {
        fn(value);
      });
    }

    if (defaults.useYamlBackend && (key === 'yaml' && value)) {
      commit(value);
    } else if (key === 'specs' && value) {
      commit(buffer[key]);
    }

  };

  this.reset = noop;

  this.load = function (key) {
    if (key !== 'yaml') {
      var deferred = $q.defer();
      if (!key) {
        deferred.reject();
      } else {
        deferred.resolve(buffer[key]);
      }
      return deferred.promise;
    }

    return $http.get(defaults.backendEndpoints.get)
      .then(function (res) {
        if (defaults.useYamlBackend) {
          buffer.yaml = res && res.data && JSON.stringify(res.data[0], null, 2);
          return buffer.yaml;
        }
        return res.data;
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
