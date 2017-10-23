var gulp = require("gulp");

var express = require("express");
var proxyMiddleware = require('http-proxy-middleware')

var clean = require("gulp-clean");
var webpack = require("webpack");

var sftp = require('gulp-sftp');

var config = require("./config/config");
var configPrivate = require("./config/configPrivate");

/**
 * dev-server
 */
gulp.task("dev", function() {
    var app = express();
    process.env.NODE_ENV = "dev";

    var compiler = webpack(require("./webpack.config"));

    //使用webpack-dev-middleware
    var devMiddleware = require("webpack-dev-middleware")(compiler, {
        publicPath: "/",
        stats: {
            colors: true,
            chunks: false
        }
    });
    app.use(devMiddleware);

    // 开发环境配置代理
    var proxyTable = {};
    for (var project of config.projectConfig) {
        proxyTable["/" + project.projectName] = {
            target: project.proxyServer,
            changeOrigin: true,
            pathRewrite: {}
        }
    };
    Object.keys(proxyTable).forEach(function(context) {
        var options = proxyTable[context]
        if (typeof options === 'string') {
            options = { target: options }
        }
        app.use(proxyMiddleware(context, options))
    })

    //使用webpack-hot-middleware热加载
    var hotMiddleware = require("webpack-hot-middleware")(compiler);
    app.use(hotMiddleware);

    // //创建虚拟目录static放static目录下的静态资源
    app.use("/static", express.static("./static"));

    // 启动expres服务
    app.listen(config.devPort, function(error) {
        if (error) {
            console.log(error);
            return;
        }
        console.log('Listening at http://localhost:' + config.devPort + '\n');
    });
});



/**
 * gulp+webpack Build
 */
//删除dist
gulp.task("clean", function() {
    return gulp.src("./dist", {
        read: false
    }).pipe(clean());
});

//复制static目录
gulp.task("cp", ["clean"], function() {
    gulp.src("./static/**")
        .pipe(gulp.dest("./dist/static"));
});

//webpack打包
gulp.task("build", ["cp"], function(cb) {
    process.env.NODE_ENV = "pro";
    webpack(require("./webpack.config"), function(err, stats) {
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n');
        cb(err);
    });
});

/**
 * Build+部署
 */
// sftp上传开发环境
gulp.task("sftp-dev", function() {
    return gulp.src('./dist/**')
        .pipe(sftp(configPrivate.devPublish));
});

// sftp上传生产环境
gulp.task("sftp-pro", function() {
    return gulp.src('./dist/**')
        .pipe(sftp(configPrivate.proPublish));
});

// 开发环境发布
gulp.task("publish-dev", ["build"], function() {
    return gulp.src('./dist/**')
        .pipe(sftp(configPrivate.devPublish));
});

// 生产环境发布
gulp.task("publish-pro", ["build"], function() {
    return gulp.src('./dist/**')
        .pipe(sftp(configPrivate.proPublish));
});
