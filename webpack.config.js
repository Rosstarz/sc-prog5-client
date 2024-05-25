import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'

const config = {
    devtool: 'source-map',
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('src/html/index.html'),
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                type: 'asset'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset'
            },
        ]
    },
    devServer: {
        static: { directory: path.resolve('dist') },
        hot: false, // optional, but don't enable hot _and_ liveReload together
        liveReload: true,
        open: true,
        watchFiles: ['src/**/*'],
        // compress: true,
        port: 9000,
        proxy: [
            {
                context: ['/api'],
                target: 'http://prog5:8080',
                secure: false,
                changeOrigin: false,
                // pathRewrite: { '^/api': '' },
            },
        ],
    },
    output: {
        // Clean 'dist' folder before generating new files
        clean: true,
    },
    experiments: {
        topLevelAwait: true
    }
}

export default config
