const {basename, extname} = require('path');
const {context, js} = require("./assets.config.js");
 
module.exports = {
    mode: "development",   // 开发模式
    context: context,
    entry: () => {
        let modules = {};
        js.map(entry => modules[basename(entry, extname(entry))] = entry);
        return modules;
    },
    output: {
        path: __dirname + "/dist/js",
        filename: "[name].js",
        publicPath: "/",
        library: "YuuLog",
        libraryTarget: "umd"
    },
    devtool: "inline-source-map",
    
    module: {
        rules: [{
            test: /\.(ts|tsx|js|jsx)$/,
            loader: 'awesome-typescript-loader',
            options: {
                useCache: true,
                forceIsolatedModules: true,
                reportFiles: [
                    "src/**/*.{ts,tsx,js,jsx}"
                ]
            }
        }]
    },

    plugins: [],

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    }
}