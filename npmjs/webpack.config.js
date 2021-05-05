const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const outputPath = path.resolve(__dirname, '../wwwroot');

module.exports = {
    mode: 'development',
    entry: {
        'assets/plugins/global/plugins.bundle': ['./src/plugins/plugins.js', './src/plugins/plugins.scss'],
        'assets/css/style.bundle': ['./src/sass/style.scss', './src/sass/plugins.scss'],
        'assets/js/scripts.bundle': './src/scripts.js',
        'assets/js/custom/widgets': './src/js/custom/widgets.js'
    },
    output: {
        // main output path
        path: outputPath,
        // output path based on the entries' filename
        filename: '[name].js',
    },
    plugins: [
        // create css file
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
    resolve: {
        alias: {
            '@': [path.join(__dirname, './')],
        },
        extensions: ['.js', '.scss'],
        fallback: {
            util: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                ],
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // prevent name become hash
                            name: '[name].[ext]',
                            // move files
                            outputPath: 'plugins/global/fonts',
                            // rewrite path in css
                            publicPath: 'fonts',
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            emitFile: false,
                            name: '[path][name].[ext]',
                            publicPath: (url, resourcePath, context) => {
                                return '../';
                            },
                        },
                    },
                ],
            },
        ],
    },
};