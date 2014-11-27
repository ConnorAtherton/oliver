/*
 * Oliver
 *
 * Copyright 2014, Connor Atherton - http://connoratherton.com/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  http://github.com/ConnorAtherton/Oliver
 */

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser globals
    root.Oliver = factory();
  }
}(this, function factory(exports) {
  'use strict';

  var supportsNotifications = !!window.Notification && !!Notification.permission;

  var defaults = {
    title: "Notification",
    lang: "en-us",
    id: "browserNotification"
  };

  // Only available in moz, chrome and opera
  function Oliver(opts) {
    if (!(this instanceof Oliver))
      return new Oliver(opts);

    if (!supportsNotifications)
      return this.error('noSupport');

    this.opts = opts;
    mixin(this.opts, defaults, true);
  }

  Oliver.prototype.error = function(key) {
    var errors = {
      'noSupport': 'This browser doesn\'t support desktop notifications.',
      'noBody': 'A notification must have a body supplied.'
    };

    var msg = errors[key] || 'Oliver - Unknown error';
    console.log('Oliver -', msg);
  };

  Oliver.prototype.notify = function(opts) {
    mixin(this.opts, opts);

    if (!this.opts.body) return this.error('noBody');

    return this.askForPermission(function() {
      return new Notification(this.opts.title, this.opts);
    });
  };

  Oliver.prototype.askForPermission = function(cb) {
    var self = this;
    // already been granted permission
    if (Notification.permission === "granted") return cb.call(this);

    // if we have not already asked for permission
    // and been denied
    if (Notification.permission !== "denied") {
      return Notification.requestPermission(function(permission) {
        return permission === "granted" || permission === "default" ? cb.call(self) : false;
      });
    }
  };

  function mixin(target, source, skipIfPresent) {
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        if (target[prop] && skipIfPresent) continue;
        target[prop] = source[prop];
      }
    }

    return target;
  }

  return Oliver;
}));
