import webpack from 'webpack'
import path from 'path'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

const config = {
   mode: 'development',
   externals: ['/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api', 'lodash', 'react', 'react-dom'],
   entry: {
      index: './index'
   },
   output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      // chunkFilename: '[name].js',
      jsonpFunction: 'wpshopifyComponents',
      library: 'wpshopifyComponents',
      libraryTarget: 'umd'
   },
   resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
         react: path.resolve('./node_modules/react'),
         'lodash-es': 'lodash'
      }
   },
   plugins: [new ProgressBarPlugin()],
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/i,
            exclude: /(node_modules)/,
            enforce: 'pre',
            use: [
               {
                  loader: 'babel-loader',
                  options: {
                     babelrcRoots: ['.'],
                     presets: ['@babel/preset-env', '@babel/preset-react']
                  }
               }
            ]
         }
      ]
   }
}

export default config
