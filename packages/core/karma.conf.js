// Karma configuration
// Generated on Mon Oct 24 2022 07:43:14 GMT+0800 (Taipei Standard Time)

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      'src/**/*.ts'
    ],
    exclude: [],
    preprocessors: {
      '**/*.ts': 'karma-typescript'
    },
    reporters: ['progress', 'karma-typescript'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.spec.json'
    }
  })
}
