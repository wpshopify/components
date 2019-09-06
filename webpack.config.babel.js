import webpack from 'webpack'
import path from 'path'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

const config = {
   mode: 'production',
   cache: false,
   externals: ['@wpshopify/api', 'lodash', 'react', 'react-dom'],
   // IMPORTANT: This entry will override an entry set within webpack stream
   entry: {
      index: './index'
   },
   output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[name].min.js',
      jsonpFunction: 'wpshopify',
      library: 'wpshopify',
      libraryTarget: 'commonjs2'
   },
   resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
         react: path.resolve('./node_modules/react'),
         'lodash-es': 'lodash'
      }
   },
   plugins: [new webpack.optimize.ModuleConcatenationPlugin(), new ProgressBarPlugin()],
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
