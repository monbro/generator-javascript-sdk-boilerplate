'use strict';

/**
 * https://github.com/yeoman/yeoman/wiki/Generators
 */

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var sdkPath = '../../node_modules/javascript-sdk-boilerplate/';

var JavascriptSdkBoilerplateGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic JavascriptSdkBoilerplate generator.'));

    var prompts = [{
      type: 'confirm',
      name: 'withTests',
      message: 'Would you like to add basic tests?',
      default: true
    },
    {
      type: 'confirm',
      name: 'withGulp',
      message: 'Would you like to use gulp js?',
      default: true
    },
    {
      type: 'confirm',
      name: 'withExamples',
      message: 'Would you like to include the html examples?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.withTests = props.withTests;
      this.withExamples = props.withExamples;
      this.withGulp = props.withGulp;

      done();
    }.bind(this));
  },

  app: function () {
    if(this.withExamples) {
      this.directory(sdkPath+'example', 'example');
    }

    if(this.withGulp) {
      this.copy(sdkPath+'gulpfile.js', 'gulpfile.js');
    }

    if(this.withTests) {
      this.directory(sdkPath+'test', 'test');
      this.copy(sdkPath+'.travis.yml', '.travis.yml');
    }

    this.directory(sdkPath+'src', 'src');
    this.copy(sdkPath+'.npmignore', '.gitignore');
    this.copy(sdkPath+'LICENSE', 'LICENSE');
    this.copy(sdkPath+'package.json', 'package.json');
    this.copy(sdkPath+'README.md', 'README.md');
  },

  projectfiles: function () {
    this.copy('../../.editorconfig', '.editorconfig');
    this.copy('../../.jshintrc', '.jshintrc');
  }
});

module.exports = JavascriptSdkBoilerplateGenerator;
