/**
 * DragonArena
 *
 * @license
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://raw.githubusercontent.com/Azurasky1/DragonArena/develop/LICENSE
 */
module.exports = function() {
  var service = {
    notFoundMiddleware: notFoundMiddleware,
    send404: send404
  };

  return service;

  function notFoundMiddleware(req, res, next) {
    send404(req, res, 'API endpoint not found');
  }

  function send404(req, res, description) {
    var data = {
      status: 404,
      message: 'Not Found',
      description: description,
      url: req.url
    };

    res.status(404)
       .send(data)
       .end();
  }
};
