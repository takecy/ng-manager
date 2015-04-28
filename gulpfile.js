var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var annotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var cssmin = require('gulp-cssmin');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var deploy = require('gulp-gh-pages');

// Concatnate 3rd party modules with duo
gulp.task('components', ['components-js','components-css']);

gulp.task('components-js', function() {
  return gulp
  .src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-material/angular-material.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-aria/angular-aria.js',
    'bower_components/angular-translate/angular-translate.js',
    'bower_components/hammerjs/hammer.js',
    'bower_components/lodash/dist/lodash.compat.js',
    'bower_components/tv4/tv4.js',
    'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
    'bower_components/angular-strap/dist/angular-strap.js',
    'bower_components/angular-strap/dist/angular-strap.tpl.js',
    'bower_components/material-date-picker/build/datepicker.js',
    'bower_components/angular-ui-utils/ui-utils.js',
    'bower_components/angular-cookies/angular-cookies.min.js',
    'bower_components/ng-tags-input/ng-tags-input.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('components.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write('maps/'))
  .pipe(gulp.dest('app/js/'))
  ;
});

gulp.task('components-css', function() {

  return gulp
  .src([
    'bower_components/angular-material/angular-material.css'
    ,'bower_components/angular-material/themes/blue-theme.css'
    ,'bower_components/angular-material/themes/blue-grey-theme.css'
    ,'bower_components/angular-material/themes/brown-theme.css'
    ,'bower_components/angular-material/themes/cyan-theme.css'
    ,'bower_components/angular-material/themes/deep-purple-theme.css'
    ,'bower_components/angular-material/themes/deep-orange-theme.css'
    ,'bower_components/angular-material/themes/indigo-theme.css'
    ,'bower_components/angular-material/themes/green-theme.css'
    ,'bower_components/angular-material/themes/grey-theme.css'
    ,'bower_components/angular-material/themes/teal-theme.css'
    ,'bower_components/angular-material/themes/orange-theme.css'
    ,'bower_components/angular-material/themes/red-theme.css'
    ,'bower_components/material-date-picker/build/styles/main.css'
    ,'bower_components/angular-motion/dist/angular-motion.css'
    ,'bower_components/bootstrap/dist/css/bootstrap.css'
    ,'bower_components/ng-tags-input/ng-tags-input.min.css'
  ,
  ])
  .pipe(concat('components.css'))
  .pipe(cssmin())
  .pipe(gulp.dest('./app/css'))
  ;

});

// Convert jade adn stylus files
gulp.task('stylus', function() {

  return gulp
  .src([
    './templates/stylus/main.styl'
  ])
  .pipe(plumber())
  .pipe(stylus({
    compress: true
  }))
  .pipe(gulp.dest('app/css'))
  ;

});

gulp.task('jade', function() {

  gulp
  .src('./templates/jade/index.jade')
  .pipe(plumber())
  .pipe(jade())
  .pipe(gulp.dest('app/'))
  ;

  return gulp
  .src('./templates/jade/template/**/*.jade')
  .pipe(plumber())
  .pipe(jade())
  .pipe(templateCache({
    module: 'ngManager'
  }))
  .pipe(gulp.dest('app/js/'))
  ;

});

// Concat and compress main scripts
gulp.task('scripts', function() {

  return gulp
  .src([
    './src/main.js',
    './src/**/*.js'
  ])
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(concat('main.js'))
  .pipe(annotate())
  .pipe(uglify())
  .pipe(sourcemaps.write('maps/'))
  .pipe(gulp.dest('app/js/'))
  ;

});

gulp.task('fonts', function() {

  return gulp
  .src([
    './fonts/**/*'
  ])
  .pipe(gulp.dest('app/fonts/'))
  ;

});

gulp.task('nwk', function() {

  return gulp
  .src([
    './nwk/**/*'
  ])
  .pipe(gulp.dest('app'))
  ;
});

gulp.task('gh-pages', ['build'], function() {
  return gulp
  .src('./app/**/*')
  .pipe(deploy());
});

// Launch the server
gulp.task('server', ['components','stylus','jade','fonts','scripts','nwk'], function() {

  gulp.watch('templates/stylus/**/*', ['stylus']);
  gulp.watch('templates/jade/**/*', ['jade']);
  gulp.watch('components.*', ['components']);
  gulp.watch('src/**/*', ['scripts']);
  require('./server/admin.js').listen(4000, function() {
    console.log("Server listening port on 4000");
  });

});

gulp.task('default', ['server']);
gulp.task('build', ['components','stylus','jade','fonts','scripts']);
