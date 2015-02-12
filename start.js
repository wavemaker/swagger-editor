'use strict';

var bower = require('bower');
var grunt = require('grunt');
var task = process.argv[2];

bower.commands
  .install()
  .on('error', function (error) {
    console.error(error)
  })
  .on('end', function () {
    grunt.tasks(task);
  });
