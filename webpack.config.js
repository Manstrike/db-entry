var path = require('path');
var webpack = require('webpack');

module.exports =  {
     mode: 'development',
     target: 'node',
     entry: {
        main: './src/modules/main/main.module.js',
        createPerson: './src/modules/create-person.module.js',
        createSchool: './src/modules/create-school.module.js'
    },
     output: {
         path: path.resolve(__dirname, 'public/js'),
         filename: '[name].bundle.js'
     },
     module: {
         rules: [
             {
                 test: /\.js$/,
                 exclude: /(node_modules)/,
                 loader: 'babel-loader',
                 query: {
                     presets: [
                         '@babel/preset-env',
                        ]
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'inline-source-map'
 };
 