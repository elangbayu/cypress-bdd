const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
  beforeRunHandler,
  afterRunHandler,
  beforeSpecHandler,
  afterSpecHandler,
  afterScreenshotHandler,
} = require("@badeball/cypress-cucumber-preprocessor");
const {createEsbuildPlugin} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    async setupNodeEvents(on, config) {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config, {
        omitBeforeRunHandler: true,
        omitAfterRunHandler: true,
        omitBeforeSpecHandler: true,
        omitAfterSpecHandler: true,
        omitAfterScreenshotHandler: true,
      });

      on("before:run", async (details) => {
        await beforeRunHandler(config);

        // Your own `before:run` code goes here.
      });

      on("after:run", async (results) => {
        await afterRunHandler(config);

        // Your own `after:run` code goes here.
      });

      on("before:spec", async (spec) => {
        await beforeSpecHandler(config);

        // Your own `before:spec` code goes here.
      });

      on("after:spec", async (spec, results) => {
        await afterSpecHandler(config, spec, results);

        // Your own `after:spec` code goes here.
      });

      on("after:screenshot", async (details) => {
        await afterScreenshotHandler(config, details);

        // Your own `after:screenshot` code goes here.
      });

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});