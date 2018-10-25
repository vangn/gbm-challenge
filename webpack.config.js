const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'dist';

const nodeModulesDir = `${__dirname}/node_modules`;

const vendors = {
    react: `${nodeModulesDir}/react/dist/react.min.js`,
    'react-dom': `${nodeModulesDir}/react-dom/dist/react-dom.min.js`,
    'react-redux': `${nodeModulesDir}/react-redux/dist/react-redux.min.js`,
};

module.exports = {
    entry: {
        vendor: [
            'react-redux',
            'react',
            'react-dom',
        ],
        index: './src/client/index.jsx',
    },
    output: {
        path: path.join(__dirname, outputDirectory),
        publicPath: '/dist/',
        filename: '[name].entry.js',
        chunkFilename: '[id].[name].js',
    },
    module: {
        noParse: [
            new RegExp('^react$'),
            new RegExp('^react-dom$'),
            new RegExp('^react-redux$'),
        ],
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|gif|jpg|svg)$/,
                use: 'file-loader?limit=65000&mimetype=application/octet-stream&name=img/[name].[ext]',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: vendors,
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    plugins: [
        new CleanWebpackPlugin([outputDirectory]),
    ],
    externals: {
        request: 'request',
        window: 'window',
    },
};
