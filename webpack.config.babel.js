import webpack from 'webpack'
import path from 'path'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
// import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import CircularDependencyPlugin from 'circular-dependency-plugin'

const config = {
   watch: true,
   mode: 'development',
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
      libraryTarget: 'umd'
   },
   resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
         react: path.resolve('./node_modules/react')
      }
   },
   plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), new ProgressBarPlugin()],
   optimization: {
      // splitChunks: {
      //    chunks: 'all',
      //    minSize: 0,
      //    automaticNameDelimiter: '-'
      // },
      // occurrenceOrder: true
      // minimizer: [
      //   new UglifyJsPlugin({
      //     parallel: true,
      //     cache: true,
      //     extractComments: false,
      //     uglifyOptions: {
      //       compress: true,
      //       ecma: 6,
      //       mangle: {
      //         keep_fnames: false
      //       },
      //       safari10: true,
      //       ie8: false,
      //       warnings: false
      //     },
      //     sourceMap: false,
      //   }),
      //   new OptimizeCSSAssetsPlugin({})
      // ]
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/i,
            exclude: /(node_modules|bower_components)/,
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
