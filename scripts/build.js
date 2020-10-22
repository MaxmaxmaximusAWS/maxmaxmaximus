const webpack = require('webpack')
const createConfig = require('../config/webpack.config')

const config = createConfig('production')

webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    // console.log(stats.toJson())
  }
})
