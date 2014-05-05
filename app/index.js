'use strict';

/**
 * https://github.com/yeoman/yeoman/wiki/Generators
 */

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

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
      this.directory('../../node_modules/javascript-sdk-boilerplate/example', 'example');
    }

    this.directory('../../node_modules/javascript-sdk-boilerplate/src', 'src');

    this.copy('../../node_modules/javascript-sdk-boilerplate/.npmignore', '.gitignore');

    if(this.withGulp) {
      this.copy('../../node_modules/javascript-sdk-boilerplate/gulpfile.js', 'gulpfile.js');
    }

    this.copy('../../node_modules/javascript-sdk-boilerplate/LICENSE', 'LICENSE');
    this.copy('../../node_modules/javascript-sdk-boilerplate/package.json', 'package.json');
    this.copy('../../node_modules/javascript-sdk-boilerplate/README.md', 'README.md');

    if(this.withTests) {
      this.directory('../../node_modules/javascript-sdk-boilerplate/test', 'test');
      this.copy('../../node_modules/javascript-sdk-boilerplate/.travis.yml', '.travis.yml');
    }
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = JavascriptSdkBoilerplateGenerator;
