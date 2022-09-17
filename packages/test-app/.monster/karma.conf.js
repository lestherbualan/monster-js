const webpackConfigCaller = require('./webpack.config');

let webpackEnvironment = {
  environment: null
};

// Karma configuration
// Generated on Tue Aug 16 2022 23:52:11 GMT+0800 (Philippine Standard Time)

module.exports = function(config) {

  const webpack = webpackConfigCaller({ environment: webpackEnvironment.environment }, {});
  console.log(webpackEnvironment.environment);

  delete webpack.entry;
  delete webpack.output;

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine', 'webpack', 'iframes'],


    plugins: [
      require.resolve('karma-jasmine'),
      require.resolve('karma-webpack'),
      require.resolve('karma-iframes'),
      require.resolve('karma-chrome-launcher'),
      require.resolve('karma-coverage'),
    ],


    // list of files / patterns to load in the browser
    files: [
      'src/**/*.ts',
      'src/**/*.tsx'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      'src/**/*.ts': ['webpack', 'coverage', 'iframes'],
      'src/**/*.tsx': ['webpack', 'coverage', 'iframes']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress','coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity,


    webpack,

  });
}


module.exports.webpackEnvironmentSetter = (environment) => {
  webpackEnvironment.environment = environment;
};
