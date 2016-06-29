/**
 * DragonArena
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 * This code may only be used under the MIT style license.
 *
 * MIT license: https://opensource.org/licenses/mit-license.php
 *
 * Module name: Debug
 * Description: A set of useful function directly exposed in the global scope
 *              and ready to be used in a development mode only
*/
(function(global) {
  /**
   * Log a debug message prefixed by a reference time in UTC format
   *
   * @param  {String} message   The message to be logged into the console
   */
  function _log(message) {
    message = message || '';

    var now = new Date();
    var time = [now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
                ].join('-');

    time += ' ' + [
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    ].join(':');

    console.info('[' + time + ']', message);
  }

  window.$log = _log;
})(typeof window === 'undefined' ? global : window);
