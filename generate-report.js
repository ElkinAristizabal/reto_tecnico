const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report-visual.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    "Plataforma": "Windows 10",
    "Proyecto": "Reto Tecnico SURA",
    "Ambiente": process.env.NODE_ENV || 'qa'
  }
};

reporter.generate(options);