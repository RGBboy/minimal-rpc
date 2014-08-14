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