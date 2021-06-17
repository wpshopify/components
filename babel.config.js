module.exports = (api) => {
  api.cache(false);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: '3.0.0',
          targets: { node: 'current' },
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-transform-regenerator',
      '@babel/plugin-transform-runtime',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-json-strings',
      [
        '@babel/plugin-transform-react-jsx',
        {
          pragmaFrag: 'React.Fragment',
        },
      ],
      'transform-react-remove-prop-types',
      'lodash',
      [
        'transform-imports',
        {
          lodash: {
            transform: 'lodash/${member}',
            preventFullImport: true,
          },
        },
      ],
    ],
    env: {
      test: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
    },
  };
};
