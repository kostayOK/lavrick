const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let conf = {

    entry: './src/index.js', // точка входа в преложение
    output: { // как и куда мы будем выгружать файлы
        path: path.resolve(__dirname, './dist'),

        filename: 'main.js',
        // относительная ссылка на данный файл который будет подстовлятся из браузера
        publicPath: 'dist/'
    },
    devServer: {
        overlay: true
    },

    module: {
        // описание правил с каким расширением что мы делаем
        // по умолчанию нормально работает с js и json
        rules: [
            {   // скармливаю эти файлы
                test: /\.js$/,
                loader: 'babel-loader',
                // выдергивать из node_modules
                //exclude: './node_modules/'
            },
            {
                test: /\.css$/,
                // use: [
                //     'style-loader',
                //     'css-loader'
                // ]
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    // devtool: 'eval-sourcemap'
    // https://www.npmjs.com/package/extract-text-webpack-plugin
    plugins: [
        new ExtractTextPlugin("styles.css"),
    ]
};

module.exports = (env, options) => {
    let production = options.mode === 'production';

    // conf.devtool = production ? 'source-map' : 'eval-sourcemap';
    conf.devtool = production ? false : 'eval-sourcemap';
    return conf;
};


