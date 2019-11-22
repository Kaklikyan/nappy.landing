const gulp = require('gulp'); 
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const imageMin = require('gulp-imagemin');
const { watch, series } = require('gulp');


gulp.task('style', function(done) {
  gulp.src('./scss/styles.scss')
            .pipe(sass())
            .pipe(gulp.dest('./css'))
            .pipe(browserSync.stream())
            done()
});

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


const watchFiles = () => {
  watch(['./scss/*.scss', './*.html'], series(['style', 'imgMinify']))
}

gulp.task('default', series(['style', 'imgMinify', 'server', watchFiles]))
