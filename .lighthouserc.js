module.exports = {
  ci: {
    collect: {
      url: ['http://127.0.0.1:4173'],
      numberOfRuns: 1,
      startServerCommand: null,
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouse'
    }
  }
}
