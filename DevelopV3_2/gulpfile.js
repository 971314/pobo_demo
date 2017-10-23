var gulp = require('gulp'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    cssmin = require('gulp-minify-css'),
    sequence = require('gulp-run-sequence'),
    autoprefixer = require('gulp-autoprefixer');


// 清空
gulp.task('clean', function(){
    return gulp.src('dist',  {read: false})
    .pipe(clean({force: true}));
});

//复制图片
gulp.task('copy:image', function(){
    return gulp.src('src/assets/images/*.*')
    // .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest('dist/images'));
});

//复制图片
gulp.task('copy:moduleImage', function(){
  return gulp.src('src/module/*/images/*.*')
  // .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest('dist'));
});

//组件样式
gulp.task('commonCss', function(){
    return gulp.src('src/assets/style/index.css')
    .pipe(rename('common.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'));
});

//监听
gulp.task('watch', function(){
    gulp.watch('src/styles/**/*.css', ['commonCss']);
});


//本地启动
gulp.task('build', function(cb) {
    sequence(['copy:image','copy:moduleImage'], ['commonCss'], cb);
});
