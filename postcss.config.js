var autoprefixer = require('autoprefixer');
var px2rem = require('postcss-px2rem');

module.exports = {
  plugins: [
    autoprefixer({
      browsers: ['last 2 Chrome versions', 'Android 2.3']
    }),
    px2rem({remUnit: 100})
  ]
}