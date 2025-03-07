const path = require('path')
const { config } = require('process')

module.exports = {
    mode: 'development',
    entry: {
        index:'./src/index.js',
        auth: './src/auth.js',
        config: './src/config.js',
        songmanager: './src/songmanager.js',
        userprofile: './src/userprofile.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    watch: true
}