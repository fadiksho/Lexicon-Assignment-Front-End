"use strict";

var gulp = require("gulp"),
  uglify = require("gulp-uglify"),
  sass = require("gulp-sass");

gulp.task('sass', function () {
  return gulp.src(['./src/scss/*.scss', './src/scss/*/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});
gulp.task('sass:prod', function () {
  return gulp.src(['./src/scss/*.scss', './src/scss/*/*.scss'])
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});
gulp.task("js:prod", () => {
  return gulp.src(['./src/js/index.js'])
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"));
});
gulp.task("prod", gulp.series(["sass:prod", "js:prod"]));

gulp.task('sass:watch', function () {
  gulp.watch(['./src/scss/*.scss', './src/scss/*/*.scss'], gulp.series(["sass"]));
});
// A 'default' task is required by Gulp v4
gulp.task("default", gulp.series(["sass"]));