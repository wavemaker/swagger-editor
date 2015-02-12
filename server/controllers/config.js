var fs = require('fs');

exports.show = function (req, res, next) {
  fs.readFile('app/config/defaults.json', function (err, stream) {

    if (err) {
      return res.status(500).send(err);
    }

    var defaults = stream.toString();

    try {
      defaults = JSON.parse(defaults);
    } catch (e) {
      return res.status(500).send(e);
    }

    defaults.useBackendForStorage = true;
    defaults.backendEndpoint = 'specs';
    defaults.useYamlBackend = true;

    res.status(200).send(defaults);
  });
};
