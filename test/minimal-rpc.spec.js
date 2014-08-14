'use strict';
/*!
 * Minimal RPC unit tests
 */

/**
 * Module Dependencies
 */

var test = require('tape'),
    RPC = require('../index'),
    rpc;

/**
 * Setup
 */

var setup = function (t) {
  rpc = RPC();
};

/**
 * Teardown
 */

var teardown = function (t) {

};

/**
 * MinimalRPC Class
 */

test('MinimalRPC', function (t) {
  t.plan(1);
  t.equal(typeof RPC, 'function');
});

/**
 * minimalRPC instance
 */

/**
 * minimalRPC.registerRPC
 */

test('minimalRPC.registerRPC should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof rpc.registerRPC, 'function');
  teardown(t);
});

/**
 * minimalRPC.callRPC
 */

test('minimalRPC.callRPC should be a function', function (t) {
  setup(t);
  t.plan(1);
  t.equal(typeof rpc.callRPC, 'function');
  teardown(t);
});

test('minimalRPC.callRPC should call the registered function on the other side', function (t) {
  var stream1 = RPC(),
      stream2 = RPC(),
      data1 = 'ping',
      data2 = 'pong';

  t.plan(2);

  stream1.pipe(stream2).pipe(stream1);

  stream1.registerRPC(new Buffer('0'), function (data) {
    t.equal(data.toString('utf-8'), data2); // pong
  });

  stream2.registerRPC(new Buffer('1'), function (data) {
    t.equal(data.toString('utf-8'), data1); // ping
    stream2.callRPC(new Buffer('0'), new Buffer(data2));
  });

  stream1.callRPC(new Buffer('1'), new Buffer(data1));
});

test('multiple minimalRPC.callRPC should call the registered function on the other side the same number of times', function (t) {
  var stream1 = RPC(),
      stream2 = RPC(),
      data1 = 'abc',
      fn = function (data) {
        t.equal(data.toString('utf-8'), data1);
      };

  t.plan(3);

  stream1.pipe(stream2);

  stream2.registerRPC(new Buffer('0'), fn);

  stream1.callRPC(new Buffer('0'), new Buffer(data1));
  process.nextTick(function () {
    stream1.callRPC(new Buffer('0'), new Buffer(data1));
    process.nextTick(function () {
      stream1.callRPC(new Buffer('0'), new Buffer(data1));
    });
  });
  
});

test('minimalRPC.callRPC should trigger an error on the otherside if a function is not registered', function (t) {
  var stream1 = RPC(),
      stream2 = RPC(),
      data1 = 'ping',
      data2 = 'pong';

  t.plan(1);

  stream1.pipe(stream2);

  stream2.on('error', function (err) {
    t.ok(err instanceof Error, 'error is an instance of Error');
  });

  stream1.callRPC(new Buffer('1'), new Buffer(data1));
});