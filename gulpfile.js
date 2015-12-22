var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

gulp.task('default', function() {
  return gulp.src('src/app/js/*.js')
      .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
      .pipe(uglify())    //压缩
      .pipe(gulp.dest('minified/js'));  //输出
});