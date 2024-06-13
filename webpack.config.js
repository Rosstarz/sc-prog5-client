import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'
// import dotenv from 'dotenv'
import path from 'path'

// this will update the process.env with environment variables in .env file
// dotenv.config();

const config = {
    devtool: 'source-map',
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('src/html/index.html'),
        }),
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        })
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
    // devServer: {
    //     static: { directory: path.resolve('dist') },
    //     hot: false, // optional, but don't enable hot _and_ liveReload together
    //     liveReload: true,
    //     open: true,
    //     watchFiles: ['src/**/*'],
    //     // compress: true,
    //     port: 9000,
    //     headers: {
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //         "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    //     },
    //     proxy: [
    //         {
    //             context: ['/api'],
    //             target: process.env.PROG5_BACKEND_URL,
    //             secure: true,
    //             changeOrigin: true,
    //             // pathRewrite: { '^/api': '' },
    //         },
    //     ],
    //     // proxy: [
    //     //     {
    //     //         context: ['/api'],
    //     //         target: 'http://prog5:8080',
    //     //         secure: false,
    //     //         changeOrigin: false,
    //     //         // pathRewrite: { '^/api': '' },
    //     //     },
    //     // ],
    // },
    output: {
        // Clean 'dist' folder before generating new files
        clean: true,
    },
    experiments: {
        topLevelAwait: true
    }
}

export default config
