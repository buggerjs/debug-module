'use strict';

var test = require('tape');

var DebugModule = require('./');

test('DebugModules can access MakeMirror', function(t) {
  var functionName = DebugModule._load('./example/make-mirror', module);
  t.equal(functionName, 'f');
  t.end();
});

test('DebugModules can access node core modules', function(t) {
  var packageJson = DebugModule._load('./example/read-file', module);
  t.equal(packageJson.name, 'debug-module');
  t.end();
});

test('throws module not found errors', function(t) {
  var err;
  t.throws(function() {
    try {
      DebugModule._load('./example/not-a-valid-file', module);
    } catch(_err) {
      err = _err;
      throw _err;
    }
  });
  t.equal(err.code, 'MODULE_NOT_FOUND');
  t.end();
});
