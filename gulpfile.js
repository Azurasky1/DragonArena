/**
 * DragonArena
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 * This code may only be used under the MIT style license.
 *
 * MIT license: https://opensource.org/licenses/mit-license.php
*/
const gulp = require('gulp');
const del = require('del');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

/**
 * autoprefixer settings
 *
 * @type {Array}
 */
const autoprefixer = [
  'last 2 versions',
  'safari >= 7',
  'ie >= 9',
  'ff >= 30',
  'ios 6',
  'android 4'
];

/**
 * PostCSS processors
 *
 * @type {Array}
 */
const processors = [
  require('autoprefixer'),
  require('autoprefixer')({browsers: autoprefixer}),
  require('postcss-import')
];

function clean() {
  return del([
    './.tmp',
    './dist'
  ]).then(function(paths) {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
}

function _browserSync() {
  browserSync.init({
    server: {
      baseDir: './.tmp'
    },
    port: 5001
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

function styles() {
  return gulp.src('./app/styles/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .on('error', console.log)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./.tmp/styles'))
    .pipe(browserSync.stream({match: '**/*.css'}));
}

function watchFiles() {
  console.log('watching');
  gulp.watch(['./app/*.html'], ['copy:files', browserSync.reload]);
  gulp.watch('./app/styles/**/*.css', ['styles']);
  gulp.watch(['./app/scripts/**/*.js'], ['copy:files', browserSync.reload]);
}

gulp.task('clean', clean);
gulp.task('browser-sync', _browserSync);
gulp.task('styles', styles);
gulp.task('copy:files', copyFiles);
gulp.task('watch:files', watchFiles);

gulp.task('serve', function(cb) {
  runSequence(
    'default',
    'browser-sync',
    'watch:files',
    cb
  );
});

gulp.task('default', function(cb) {
  runSequence(
    'clean',
    'copy:files',
    'styles',
    cb
  );
});
