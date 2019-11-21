const gulp = require('gulp'); 
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const imageMin = require('gulp-imagemin');
const cssMinify = require('gulp-clean-css');
const rename = require('gulp-rename');
const { series } = require('gulp');


gulp.task('style', function(done) {
  gulp.src('./scss/styles.scss')
            .pipe(sass())
            .pipe(gulp.dest('./css'))
            .pipe(browserSync.stream())
            done()
});

gulp.task('cleanCss', function(done) {
  gulp.src('css/styles.css')
  .pipe(cssMinify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('css'))  
  done()
})

gulp.task('imgMinify', function(done) {
    gulp.src('images/*')
    .pipe(imageMin())
    .pipe(gulp.dest('img')) 
    done()
});

gulp.task('server', function(done) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  done()
})

gulp.task('default', series(['style', 'imgMinify', 'server']))
