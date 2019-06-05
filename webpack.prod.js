let { smart } = require('webpack-merge');
let base  =  require('./webpack.base.js')
let webpack = require('webpack')
let path = require('path')

module.exports = smart(base,{
    mode: 'production',
    plugins:[
        new webpack.DefinePlugin({
            DEV:'false'
        }),
/*         new webpack.optimize.UglifyJsPlugin({
            comments:false,
            compress: {
                warnings:false
            }
        }) */
    ]
})