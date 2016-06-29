/**
 * DragonArena
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 * This code may only be used under the MIT style license.
 *
 * MIT license: https://opensource.org/licenses/mit-license.php
 *
 * Module name: Overlays
 * Description: Overlays elements like the welcome screen and the store
 *              are served by this module
*/
var Overlays = (function(global, _log) {
//   function Module() {
//     $log('Overlays ready');
//   }
//
  function _init() {
    // new Module();
    _log('Overlays ready');
    return;
  };

  return {
    init: _init
  };
})(typeof window === 'undefined' ? global : window, $log);
