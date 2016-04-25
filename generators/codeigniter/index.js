'use strict';

var yeoman          = require('yeoman-generator'),
    yosay           = require('yosay'),
    fs              = require('fs'),
    path            = require('path'),
    util            = require('util'),
    chalk           = require('chalk'),
    rimraf          = require('rimraf'),
    exec            = require('child_process').exec,
    semver          = require('semver'),
    mkdirp          = require('mkdirp'),
    generatorName   = path.basename(__dirname);

var greeting        = require('../app/helpers/greeting'),
    walk            = require('../app/helpers/walk'),
    printTitle      = require('../app/helpers/printTitle'),
    hasFeature      = require('../app/helpers/hasFeature'),
    createJson      = require('../app/helpers/createJson');

var init            = require('../app/config/init'),
    setConfigVars   = require('../app/config/setConfigVars'),
    setConfigFiles  = require('../app/config/setConfigFiles'),
    copyFiles       = require('../app/config/copyFiles'),
    installDep      = require('../app/config/installDep');

var structureExists = require('../app/prompts/structureExists'),
    isFramework     = require('../app/prompts/isFramework'),
    isStatic        = require('../app/prompts/isStatic');


module.exports = yeoman.generators.Base.extend({

  initializing: function(){
    var done = this.async(),
        self = this;
    init(this, function(){
      greeting(self);
    });
    done();
  },

  prompting: {
    existingEnvironment: function(){
      this.cfg.environmentOption ='codeigniter';
      if(this.calledFrom === 'app' || !this.calledFrom){
        var done = this.async(),
            self = this,
            destRoot = this.destinationRoot(),
            frameworks = ['wordpress', 'codeigniter', 'drupal', 'express', 'laravel'];

        isFramework(frameworks, destRoot, this.calledFrom, this, function(environmentOption){
          self.cfg.environmentOption = environmentOption;
        });
      }
    },

    gulp: function(){
      if (this.exit) return;
      if(!this.cfg.gulpDirOption) {
        var done = this.async(),
            self = this;

        console.log(printTitle('Gulp'));

        this.prompt([{
          type: 'confirm',
          name: 'gulpDirOption',
          message: 'Place Gulp files in a subfolder?',
          default: function(answers) {
            if(self.cfg.gulpDirOption) {
              return self.cfg.gulpDirOption
            } else {
              return true
            }
          }
        }
        // , {
        //   type: 'confirm',
        //   name: 'gulpCmdOption',
        //   message: 'Run gulp command after install?',
        //   default: function(answers) {
        //     if(self.cfg.gulpCmdOption) {
        //       return self.cfg.gulpCmdOption
        //     } else {
        //       return false
        //     }
        //   }
        // }
      ], function (answers) {
          if(!this.cfg.gulpDirOption){
            this.cfg.gulpDirOption = answers.gulpDirOption;
            this.cfg.gulpCmdOption = answers.gulpCmdOption;
          }

          done();
        }.bind(this));
      }
    },

    codeigniter: function(){
      if (this.exit) return;

      var done = this.async(),
          self = this;

      var codeigniter2 = '2.2.6',
          codeigniter3 = '3.0.6';

      this.prompt([{
        type: 'list',
        name: 'codeigniterVersion',
        message: 'Which version of CodeIgniter do you want?',
        choices: [codeigniter2, codeigniter3, 'Specify a version'],
        default: codeigniter3
      }, {
        when: function(answers){
          return answers.codeigniterVersion === 'Specify a version'
        },
        name: 'codeigniterVersion',
        message: 'Specify a Codigniter version (0.0.0)',
        default: '0.0.0'
      }, {
        name: 'mainDir',
        message: 'Where to place CodeIgniter?',
        default: function(answers) {
          if(self.cfg.mainDir) {
            return self.cfg.mainDir
          } else {
            return 'website'
          }
        }
      }, ], function (answers) {
        this.cfg.environmentOption = 'codeigniter';
        this.cfg.mainDir = answers.mainDir;
        this.cfg.codeigniterVersion = answers.codeigniterVersion;

        done();
      }.bind(this));
    },

    static: function(){
      this.composeWith('robonkey:static',{
        options: {
          calledFrom: generatorName,
          cfg: this.cfg
        }
      });
    },
  },


  configuring: function () {
    if (this.exit) return;

    this.gulpDirOption = this.cfg.gulpDirOption;
    this.gulpCmdOption = this.cfg.gulpCmdOption;
    this.environmentOption = this.cfg.environmentOption;
    this.mainDir = this.cfg.mainDir;
    this.codeigniterVersion = this.cfg.codeigniterVersion;


    var done = this.async();
    this.config.set(this.cfg);

    done();
  },

  writing: {
    downloading: function() {
      if (this.exit) return;
      var done = this.async(),
          self = this;

      var downloadCodeIgniter = function () {
        self.extract('https://github.com/bcit-ci/CodeIgniter/archive/' + self.codeigniterVersion + '.tar.gz', './', function(){
          fs.rename('Codeigniter-' + self.codeigniterVersion, self.mainDir);
          done();
        });
      }

      console.log(printTitle('Installing CodeIgniter'));

      console.log('Downloading CodeIgniter version ' + this.codeigniterVersion);

      try {
        fs.accessSync(self.mainDir, fs.F_OK);
        console.log('Folder ' + self.mainDir + ' exists');
        rimraf(self.mainDir, function(){
          self.extract('https://github.com/bcit-ci/CodeIgniter/archive/' + self.cfg.codeigniterVersion + '.tar.gz', './', function(){
            fs.rename('Codeigniter-' + self.cfg.codeigniterVersion, self.cfg.mainDir);
            done();
          });
        });
      } catch (e) {
        console.log('Folder ' + self.mainDir + ' doesn\'t exist');
        self.extract('https://github.com/bcit-ci/CodeIgniter/archive/' + self.cfg.codeigniterVersion + '.tar.gz', './', function(){
          fs.rename('Codeigniter-' + self.cfg.codeigniterVersion, self.cfg.mainDir);
          done();
        });
      }
    }
  },

  install: function(){
    var done = this.async();
    installDep(this, function(){});
    done();
  }

});
