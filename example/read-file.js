'use strict';

var fs = require('fs');
var path = require('path');

var filename = path.resolve(__dirname, '../package.json');
var jsonString = fs.readFileSync(filename, 'utf8');

module.exports = JSON.parse(jsonString);
