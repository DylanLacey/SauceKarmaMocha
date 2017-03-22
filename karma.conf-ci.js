var fs = require('fs');

module.exports = function(config) {

  // Use ENV vars on Travis and sauce.json locally to get credentials
  if (!process.env.SAUCE_USERNAME) {
    if (!fs.existsSync('sauce.json')) {
      console.log('Create a sauce.json with your credentials based on the sauce-sample.json file.');
      process.exit(1);
    } else {
      process.env.SAUCE_USERNAME = require('./sauce').username;
      process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
    }
  }

  // Browsers to run on Sauce Labs
  var customLaunchers = {
    sl_chrome_latest_osx11: {
      base: 'SauceLabs',
      platform: 'OS X 10.11',
      browserName: 'chrome',
      version: 'latest'
    },
    // 'SL_InternetExplorer': {
    //   base: 'SauceLabs',
    //   browserName: 'internet explorer',
    //   version: '10'
    // },
    // 'SL_FireFox': {
    //   base: 'SauceLabs',
    //   browserName: 'firefox',
    // }
  };

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
      'src/*.js',
      'test/*.js'
    ],

    preprocessors: {
      'test/**/*.js': [ 'browserify' ]
    },

    browserify: {
      debug: true,
     // transform: [ 'brfs' ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'saucelabs', 'mocha'],


    // web server port
    port: 9001,

    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    sauceLabs: {
      testName: 'Karma and Sauce Labs demo',
      recordVideo: true,
      recordScreenshots: true,
      startConnect: true
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    browserNoActivityTimeout: 20000,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: Object.keys(customLaunchers),
    singleRun: true
  });
};
