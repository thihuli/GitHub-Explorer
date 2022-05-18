const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production', //informa qual é o modo de rodar o projeto
  devtool: isDevelopment ? 'eval-source-map' : 'source-map', //utilizando para deixar o código legivel no devtools para debugar
  entry: path.resolve(__dirname, 'src', 'index.tsx'), //caminho da arquivo que seré transformado em bundle
  output: {
    path: path.resolve(__dirname, 'dist'), // pasta que sera colocado o bundle
    filename: 'bundle.js' // nome do arquivo que sera o bundle
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'] // regra para resolver as importações dentro do arquivo
  },
  devServer: {
    static: path.resolve(__dirname, 'public'), // serve o arquivo estatico de forma automatica sem precisar ficar rodando o webpack
    hot: true,
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin, //plugin utilizado para manter o estado da aplicação e não resetar tudo para 0 quando houver o recarregamento da página
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html') // plugin utilizando para o inserir o arquivo bundle.js dentro do HTML
    })
  ].filter(Boolean), // hackzinho que remove qualquer valor falso, vazio, falsy de dentro do array
  module: {
    // configurar os arquivos que seram lidos pelo babel loader, css-loader, style-loader, em exclude não se ler
    rules: [
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  }
}