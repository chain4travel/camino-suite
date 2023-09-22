import { defineConfig } from 'cypress'
import cypressGrepPlugin from '@cypress/grep/src/plugin'
import parseEnvPlugin from './cypress/plugins'

export default defineConfig({
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            on('before:browser:launch', (browser, launchOptions) => {
                if (browser.name === 'chrome' && browser.isHeadless) {
                    const headlessIndex = launchOptions.args.indexOf('--headless')
                    if (headlessIndex > -1) {
                        launchOptions.args[headlessIndex] = '--headless=new'
                    }
                }
                return launchOptions
            })

            return cypressGrepPlugin(parseEnvPlugin(on, config)) as Cypress.PluginConfigOptions
        },
        baseUrl: 'http://localhost:5001/',
        requestTimeout: 15000,
    },
    env: {
        grepFilterSpecs: true,
    },
})
