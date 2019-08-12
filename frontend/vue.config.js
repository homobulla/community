module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/community/" : "./",
    assetsDir: "static",
    productionSourceMap: false,
    // removeAttributeQuotes: false,
    css: {
        loaderOptions: {
            css: {
                // 这里的选项会传递给 css-loader
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
            },
            sass: {
                // @/ 是 src/ 的别名
                data: `@import "~@/assets/css/variables.sass";`
            }
        }
    }
};
