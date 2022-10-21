module.exports = {
  presets: [
    '@babel/present-env',
    ['@babel/present-react', {
      runtime: 'automatic'
    }]
  ],
  targets: {
    node: 'current'
  }
};
