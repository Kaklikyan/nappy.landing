const gulp = require('gulp'); 
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const imageMin = require('gulp-imagemin');
const cssMinify = require('gulp-clean-css');
const rename = require('gulp-rename');

const style = () => {
  return gulp.src('./scss/styles.scss')
             .pipe(sass())
             .pipe(gulp.dest('./css'))
             .pipe(browserSync.stream())
}


const imgMinify = () => {
  gulp.src('images/*')
  .pipe(imageMin())
  .pipe(gulp.dest('img')) 
}

const cleanCss = () => {
  gulp.src('css/styles.css')
  .pipe(cssMinify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('css'))  
}

const watch = () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./scss/styles.scss', style);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('./css/styles.css', cleanCss);
  gulp.watch('./images/*', imgMinify);
}

exports.watch = watch;
