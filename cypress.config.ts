import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'tuurfe',
  e2e: {
    baseUrl: "http://localhost:6006", 
    // setupNodeEvents(on, config) {
    // },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});