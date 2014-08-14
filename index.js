'use strict';
/*!
 * Minimal RPC
 */

/**
 * Module Dependencies
 */

var MinimalRPC,
    Through2 = require('through2'),
    multibuffer = require('multibuffer');

/**
 * MinimalRPC
 *
 * @return {Stream}
 * @api public
 */
MinimalRPC = function () {

  var self,
      rpcs = {},
      decode,
      chunks;

  decode = function (chunk, encoding, next) {
    var partialId,
        partialData,
        fn;
    // decode and direct chunk
    if (chunks) {
      chunk = Buffer.concat([chunks, chunk]);
    };

    partialId = multibuffer.readPartial(chunk);

    if (partialId && partialId[0] && partialId[1]) {
      fn = rpcs[partialId[0].toString('base64')];
      if (!fn) {
         // error!!!
         next(new Error('Requested RPC not found.'));
         return;
      };
      partialData = multibuffer.readPartial(partialId[1]);
    };

    if (partialData && partialData[0]) {
      fn(partialData[0]);
      chunks = null;
      if (partialData[1]) {
        decode(partialData[1], encoding, next);
        return;
      } else {
        next();
        return;
      };
    };

    chunks = chunk;
    next();

  };

  self = Through2(decode);

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
    var base64Id = id.toString('base64');
    rpcs[base64Id] = fn;
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
    self.push(multibuffer.pack([id, data]))
  };

  return self;

};

/**
 * Module Exports
 */
exports = module.exports = MinimalRPC;