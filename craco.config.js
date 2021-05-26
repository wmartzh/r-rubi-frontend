const CracoAlias = require('craco-alias');
module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'options',
        baseUrl: './',
        aliases: {
          '@': './src',
          '@api': './src/api',
          '@components': './src/components',
          '@layouts': './src/layouts',
          '@pages': './src/pages',
          '@hooks': './src/hooks',
        },
      },
    },
  ],
};
