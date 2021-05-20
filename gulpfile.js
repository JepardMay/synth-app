const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

gulp.task('html', function () {
  return gulp.src(['source/html/*.html']).pipe(gulp.dest('build'));
});

gulp.task('css', function () {
  return gulp
    .src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(
      sass({
        outputStyle: 'compact'
      }).on('error', sass.logError)
    )
    .pipe(postcss([autoprefixer({ browsers: ['last 2 version'] })]))
    .pipe(
      cleanCSS(
        {
          level: 2
        },
        (details) => {
          console.log(`${details.name}: ${details.stats.originalSize}`);
          console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }
      )
    )
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('js', function () {
  return gulp
    .src(['source/js/main.js'])
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('build/js'));
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/html/**/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css', 'refresh'));
  gulp.watch('source/js/**/*.js', gulp.series('js', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('copy', function () {
  return gulp
    .src(['source/fonts/**/*.{woff,woff2}', 'source/favicon/*.ico'], {
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('build', gulp.series('clean', 'copy', 'html', 'css', 'js'));

gulp.task('start', gulp.series('build', 'server'));
