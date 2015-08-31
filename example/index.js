'use strict';

var DebugModule = require('../');

var debugModule = DebugModule._load('./in-context', module);
console.log(debugModule);
