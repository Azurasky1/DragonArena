const gulp = require('gulp');
var browserSync = require('browser-sync').create();

function _browserSync() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
}

function copyFiles() {
  gulp.src([
    './app/*.html',
    './app/scripts/**/*.js',
    './app/styles/*.css',
    './app/images/**/*'
  ], {base: './app'})
  .pipe(gulp.dest('dist'));
}

function watch() {
  gulp.watch(['./app/*.html'], browserSync.reload);
}

gulp.task('browser-sync', _browserSync);
gulp.task('copy:files', copyFiles);
gulp.task('default', ['copy:files', 'browser-sync'], watch);
