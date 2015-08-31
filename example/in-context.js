'use strict';

var console = require('console');

var other = require.debug('./other-in-context');

exports.foo = 'bar';

function f() {}

exports.xyz = MakeMirror(f);
