/**
 * DragonArena
 *
 * @license
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://raw.githubusercontent.com/Azurasky1/DragonArena/develop/LICENSE
 *
 * Module name: Debug
 * Description: A set of useful function directly exposed in the global scope
 *              and ready to be used in a development mode only
 */
(function(global) {
  'use strict';

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

    console.info('[' + time + ']', String(message));
  }

  window._log = _log;
})(typeof window === 'undefined' ? global : window);
