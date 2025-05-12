/** @format */

const { defineConfig } = require('cypress');

module.exports = defineConfig({
	screenshotOnRunFailure: false,
	video: false,
	reporter: 'cypress-multi-reporters',
	reporterOptions: {
		configFile: 'reporter-config.json',
	},
	e2e: {
		specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
		baseUrl: 'http://localhost:4173',
	},
});
