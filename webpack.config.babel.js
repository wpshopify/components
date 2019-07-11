import webpack from 'webpack'
import path from 'path'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
// import MiniCssExtractPlugin from 'mini-css-extract-plugin'
// import CircularDependencyPlugin from 'circular-dependency-plugin'
import TerserPlugin from 'terser-webpack-plugin'

const config = {
   watch: true,
   mode: 'development',
   cache: true,
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
         react: path.resolve('./node_modules/react'),
         'lodash-es': 'lodash'
      }
   },
   plugins: [new webpack.optimize.ModuleConcatenationPlugin(), new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), new ProgressBarPlugin()],
   // optimization: {
   //    nodeEnv: 'development',
   //    minimize: true
   //    // minimizer: [
   //    //    new TerserPlugin({
   //    //       terserOptions: {
   //    //          ecma: undefined,
   //    //          warnings: false,
   //    //          parse: {},
   //    //          compress: {},
   //    //          mangle: true, // Note `mangle.properties` is `false` by default.
   //    //          module: false,
   //    //          output: null,
   //    //          toplevel: false,
   //    //          nameCache: null,
   //    //          ie8: false,
   //    //          keep_classnames: undefined,
   //    //          keep_fnames: false,
   //    //          safari10: false
   //    //       }
   //    //    })
   //    // ]
   //    // splitChunks: {
   //    //    chunks: 'all',
   //    //    minSize: 0,
   //    //    automaticNameDelimiter: '-'
   //    // },
   //    // occurrenceOrder: true
   //    // minimizer: [
   //    //   new UglifyJsPlugin({
   //    //     parallel: true,
   //    //     cache: true,
   //    //     extractComments: false,
   //    //     uglifyOptions: {
   //    //       compress: true,
   //    //       ecma: 6,
   //    //       mangle: {
   //    //         keep_fnames: false
   //    //       },
   //    //       safari10: true,
   //    //       ie8: false,
   //    //       warnings: false
   //    //     },
   //    //     sourceMap: false,
   //    //   }),
   //    //   new OptimizeCSSAssetsPlugin({})
   //    // ]
   // },
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
