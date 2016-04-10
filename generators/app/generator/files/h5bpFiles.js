/**
 * Generate files specific to h5bp files
 */

'use strict';
var mkdirp = require('mkdirp'),
    fs = require('fs');


var h5bpFiles = function h5bpFiles() {
  var destRoot = this.destinationRoot(),
      sourceRoot = this.sourceRoot();
  if(this.environmentOption === 'static') {

    this.fs.copyTpl(sourceRoot + '/website/browserconfig.xml', destRoot + '/' + this.mainDir + '/browserconfig.xml', this.templateContext);
    this.fs.copy(sourceRoot + '/website/htaccess.txt', destRoot + '/' + this.mainDir + '/.htaccess');

    this.fs.copy(sourceRoot + '/website/crossdomain.xml', destRoot + '/' + this.mainDir + '/crossdomain.xml');
    this.fs.copy(sourceRoot + '/website/robots.txt', destRoot + '/' + this.mainDir + '/robots.txt');

  }
};

module.exports = h5bpFiles;