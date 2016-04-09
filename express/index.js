'use strict';

var yeoman        = require('yeoman-generator'),
    yosay         = require('yosay'),
    fs            = require('fs'),
    chalk         = require('chalk'),
    mkdirp        = require('mkdirp'),
    printTitle    = require('../app/helpers/printTitle'),
    createConfig  = require('../app/helpers/createConfig');

module.exports = yeoman.Base.extend({

  initializing: function() {

  },

  prompting: function(){
    this.log(printTitle('Configuring Express'));

    var done = this.async(),
        self = this;

    this.prompt([{
      name: 'mainDir',
      message: 'Where to place the Express app?',
      default: 'app'
    }], function (answers) {
      this.mainDir = answers.mainDir;

      done();
    }.bind(this));
  },

  configuring: function () {
    var done = this.async(),
        self = this,
        fileName = '.yo-rc.json',
        fileLocation = this.destinationRoot()+ '/' + fileName;

    createConfig(fileName, fileLocation, self.mainDir, 'express');

    done();
  },

  writing: function(){
    this.log(printTitle('Installing Express'));

    var destRoot = this.mainDir,
        sourceRoot = this.sourceRoot();

    this.fs.copy(sourceRoot+ '/bin', destRoot + '/bin');
    this.fs.copy(sourceRoot+ '/routes', destRoot + '/routes');
    this.fs.copy(sourceRoot+ '/views', destRoot + '/views');
    this.fs.copy(sourceRoot+ '/app.js', destRoot + '/app.js');
    this.fs.copy(sourceRoot+ '/package.json', destRoot + '/package.json');
  },

  install: function(){
    var npmdir = process.cwd() + '/' + this.mainDir;
    process.chdir(npmdir);
    this.npmInstall();
  }



});
