"use strict";

const gulp     = require('gulp');
const mocha    = require('gulp-mocha');
const eslint   = require('gulp-eslint');
const del      = require('del');
const sequence = require('run-sequence');

const srcDir = './src/';
const srcGlob = srcDir + '*.js';

const distDir = './dist/';
const distGlob = distDir + '*.js';

const testDir = './test/';
const testGlob = testDir + '*.spec.js';

gulp.task('lint', function() {
  return gulp.src(srcGlob)
    .pipe(eslint()) // config in .eslintrc
    .pipe(eslint.format())
});

gulp.task('test', ['lint'], function() {
  return gulp.src(testGlob)
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('clean', function() {
  return del(distDir);
});

gulp.task('build', ['lint'], function() {
  return gulp.src(srcGlob)
    .pipe(gulp.dest(distDir))
});

gulp.task('watch', ['build'], function() {
  gulp.watch(srcGlob, ['build']);
  gulp.watch(testGlob, ['test']);
});

gulp.task('default', (done) => {
  sequence(
    'test',
    'clean',
    'lint',
    'build',
    'watch',
    done
  );
});
