// Copyright Joyent, Inc. and other Node contributors. All rights reserved.
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.
/* jshint node:true */
'use strict';

var vm = require('vm');
var Module = require('module');
var util = require('util');
var assert = require('assert');
var path = require('path');

var runInDebugContext = vm.runInDebugContext;

function DebugModule() {
  Module.apply(this, arguments);
}
util.inherits(DebugModule, Module);
module.exports = DebugModule;

DebugModule._cache = {};

DebugModule.prototype._compile = function(content, filename) {
  var self = this;

  function require(path) {
    return self.require(path);
  }

  function debugRequire(path) {
    return self.debugRequire(path);
  }
  require.debug = debugRequire;

  require.resolve = function(request) {
    return Module._resolveFilename(request, self);
  };

  Object.defineProperty(require, 'paths', { get: function() {
    throw new Error('require.paths is removed. Use ' +
                    'node_modules folders, or the NODE_PATH ' +
                    'environment variable instead.');
  }});

  require.main = process.mainModule;

  // Enable support to add extra extension types
  require.extensions = Module._extensions;

  require.cache = Module._cache;
  require.debugCache = DebugModule._cache;

  var dirname = path.dirname(filename);

  // create wrapper function
  var wrapper = Module.wrap(content);

  var compiledWrapper = runInDebugContext(wrapper, { filename: filename });
  var args = [self.exports, require, self, filename, dirname];
  return compiledWrapper.apply(self.exports, args);
};

DebugModule.prototype.debugRequire = function(path) {
  assert(path, 'missing path');
  assert(typeof path === 'string', 'path must be a string');
  return DebugModule._load(path, this);
};

DebugModule._load = function(request, parent) {
  var filename = Module._resolveFilename(request, parent);

  var cachedModule = DebugModule._cache[filename];
  if (cachedModule) {
    return cachedModule.exports;
  }

  var module = new DebugModule(filename, parent);

  DebugModule._cache[filename] = module;

  var hadException = true;

  try {
    module.load(filename);
    hadException = false;
  } finally {
    if (hadException) {
      delete DebugModule._cache[filename];
    }
  }

  return module.exports;
};
