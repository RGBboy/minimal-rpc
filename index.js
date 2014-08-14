'use strict';
/*!
 * Minimal RPC
 */

/**
 * Module Dependencies
 */

var MinimalRPC;

/**
 * MinimalRPC
 *
 * @return {Stream}
 * @api public
 */
MinimalRPC = function () {

  var self = {};

  /**
   * .registerRPC
   *
   * registers an RPC to be called from the other end
   *
   * @param {Buffer} id
   * @param {Function} fn
   * @returns {undefined}
   * @api public
   */
  self.registerRPC = function (id, fn) {
  };

  /**
   * .callRPC
   *
   * @param {Buffer} id
   * @param {Buffer} data
   * @return {undefined}
   * @api public
   */
  self.callRPC = function (id, data) {
  };

  return self;

};

/**
 * Module Exports
 */
exports = module.exports = MinimalRPC;