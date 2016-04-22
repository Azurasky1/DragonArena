const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

function clean() {
  del([
    './.tmp',
    './dist'
  ]).then(function(paths) {
  	console.log('Deleted files and folders:\n', paths.join('\n'));
  });
}

function _browserSync() {
  browserSync.init({
    server: {
      baseDir: "./.tmp"
    }
  });
}

function copyFiles() {
  gulp.src([
    './app/*.html',
    './app/scripts/**/*.js',
    './app/images/**/*'
  ], {base: './app'})
  .pipe(gulp.dest('.tmp'));
}

function sassDev() {
  return gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./.tmp/styles'));
}

function watchFiles() {
  gulp.watch(['./app/*.html'], ['copy:files', browserSync.reload]);
  gulp.watch(['./app/sass/*.scss'], ['sass:dev', browserSync.reload]);
  gulp.watch(['./app/scripts/**/*.js'], ['copy:files', browserSync.reload]);
}

gulp.task('clean', clean);
gulp.task('browser-sync', _browserSync);
gulp.task('sass:dev', sassDev);
gulp.task('copy:files', copyFiles);
gulp.task('watch:files', watchFiles);
gulp.task('watch', ['default', 'watch:files']);

gulp.task('default', function(callback) {
  runSequence(
    'clean',
    ['copy:files', 'sass:dev'],
    'browser-sync',
    callback
  );
});
