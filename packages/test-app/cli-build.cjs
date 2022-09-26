const loadConfigFile = require('rollup/loadConfigFile');
const { rollup, watch } = require('rollup');
const path = require('path');

loadConfigFile(path.resolve(__dirname, '.config/rollup.config.js'), { format: 'es' }).then(
  async ({ options, warnings }) => {
    console.log(`We currently have ${warnings.count} warnings`);

    // This prints all deferred warnings
    warnings.flush();

    for (const optionsObj of options) {
      const bundle = await rollup(optionsObj);
      await Promise.all(optionsObj.output.map(bundle.write));
    }

    // You can also pass this directly to "rollup.watch"
    // watch(options);
  }
);
