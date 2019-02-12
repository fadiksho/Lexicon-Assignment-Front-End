"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  sass = require("gulp-sass");

// Development! Covert style sass to css
gulp.task('sass', function () {
  return gulp.src(['./src/scss/*.scss', './src/scss/*/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});
// Production! Covert style sass to css
gulp.task('sass:prod', function () {
  return gulp.src(['./src/scss/*.scss', './src/scss/*/*.scss'])
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch(['./src/scss/*.scss', './src/scss/*/*.scss'], gulp.series(["sass"]));
});
// A 'default' task is required by Gulp v4
gulp.task("default", gulp.series(["sass"]));