/**
 * DragonArena
 *
 * @license
 * Copyright (c) 2016 by Bill B. and andreasonny83. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at
 * https://raw.githubusercontent.com/Azurasky1/DragonArena/develop/LICENSE
 */
const gulp = require('gulp');
const del = require('del');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

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
  browserSync.init(null, {
    proxy: 'http://localhost:8009',
    port: 5001
  });
}

function copyFiles() {
  gulp.src([
    './src/client/*.html',
    './src/client/scripts/**/*.js',
    './src/client/images/**/*'
  ], {base: './src/client'})
  .pipe(gulp.dest('.tmp'));
}

function styles() {
  return gulp.src('./src/client/styles/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .on('error', console.log)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./.tmp/styles'))
    .pipe(browserSync.stream({match: '**/*.css'}));
}

function watchFiles() {
  console.log('watching');
  gulp.watch(['./src/client/*.html'], ['copy:files', browserSync.reload]);
  gulp.watch('./src/client/styles/**/*.css', ['styles']);
  gulp.watch(['./src/client/scripts/**/*.js'], ['copy:files', browserSync.reload]);
}

gulp.task('nodemon', function() {
  nodemon({
    script: 'src/server/app.js',
    ext: 'js html css',
    ignore: ['src/client/**/*.*'],
    env: {NODE_ENV: 'development'}
  });
});

gulp.task('clean', clean);
gulp.task('browser-sync', ['nodemon'], _browserSync);
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
