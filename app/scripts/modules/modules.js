/**
 * DragonArena
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 * This code may only be used under the MIT style license.
 *
 * MIT license: https://opensource.org/licenses/mit-license.php
 *
 * Module name: modules
 * Description: Registers the available modules and expose them to the global
 *              scope in order to be used from the application
*/
(function(global) {
  'use strict';
  var modules = global.$modules || {};

  modules.Overlays.init();
})(typeof window === 'undefined' ? global : window);
