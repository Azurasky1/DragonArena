var router = require('express').Router();
var four0four = require('./utils/404')();
var pkginfo = require('pkginfo')(module);

var appName = module.exports.name;
var appVersion = module.exports.version;

router.get('/', home);
router.get('/status', status);

router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

function status(req, res) {
  const data = {
    app: appName,
    version: appVersion,
    status: 200,
    message: 'OK - ' + Math.random().toString(36).substr(3, 8)
  };

  res.status(200).send(data);
}

function home(req, res) {
  res.status(200).send('Hello there!<br>I\'m your API');
}
