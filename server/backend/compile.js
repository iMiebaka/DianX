const { compile } = require('nexe')

compile({
  input: './index.js',
  build: true, //required to use patches
  targets: 'linux-x64',
  patches: [
    async (compiler, next) => {
      await compiler.setFileContentsAsync(
        'lib/new-native-module.js',
        'module.exports = 42',
        
      )
      return next()
    }
  ]
}).then(() => {
  console.log('success')
})