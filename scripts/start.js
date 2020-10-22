const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const createConfig = require('../config/webpack.config')

const config = createConfig('development')
const compiler = webpack(config, null)
const server = new WebpackDevServer(compiler, config.devServer)

server.listen(3000, '0.0.0.0')
