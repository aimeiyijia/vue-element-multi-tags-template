module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: 'entry',
        corejs: { version: '3.25.1', proposals: true }
      }
    ]
  ],
  'env': {
    'development': {
      'plugins': ['dynamic-import-node']
    }
  }
}
