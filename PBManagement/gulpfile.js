var gulp = require('gulp'),
    watch = require('gulp-watch');

//复制配置文件
gulp.task('copy:conf', function(){
  return gulp.src('src/conf/*.*')
    .pipe(gulp.dest('dist/conf'));
});

//监听
gulp.task('watch', function(){
  gulp.watch('src/conf/*.*', ['copy:conf']);
});

//本地启动
gulp.task('build', function() {
  return gulp.src('src/conf/*.*')
    .pipe(gulp.dest('dist/conf'));
});