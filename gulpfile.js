var gulp = require('gulp');
var watch = require('gulp-watch');

var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var nib = require('nib');

var browserify = require('browserify'); 
var watchify = require('watchify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var merge = require('utils-merge');

var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var http = require('http');
var st = require('st');
var livereload = require('gulp-livereload');
//var sourcemaps = require('gulp-sourcemaps');

/* nicer browserify errors */
var gutil = require('gulp-util');
var chalk = require('chalk');

function map_error(err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + './lib/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message))
  }

  this.end()
}

function bundle_js(bundler) {
  return bundler.bundle()
    .on('error', map_error)
    .pipe(source('code.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public/js'))
    .pipe(rename('code.min.js'))
      //.pipe(sourcemaps.init({ loadMaps: true }))
      // capture sourcemaps from transforms
    .pipe(uglify({                  // lo conprimer en feo e ilegible
      compress: {
        drop_console: true          // borra todos los console log
      }
    }))
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js'))
}

gulp.task('watchify', function () {
    var args = merge(watchify.args, { debug: true })
    var bundler = watchify(browserify('./lib/code.js', args)).transform(babelify, { /* opts */ })
    bundle_js(bundler)

    bundler.on('update', function () {
    bundle_js(bundler)
  })
});

// Without watchify
gulp.task('browserify', function () {
  console.log('Nuevo JS generado...'); 
    var bundler = browserify('./lib/code.js', { debug: true }).transform(babelify, {/* options */ })

    return bundle_js(bundler)
});

// Without sourcemaps
gulp.task('browserify-production', function () {
    var bundler = browserify('./lib/code.js').transform(babelify, {/* options */ })

  return bundler.bundle()
      .on('error', map_error)
      .pipe(source('code.js'))
      .pipe(buffer())
      .pipe(rename('code.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./public/js'))
});


gulp.task('jade', function(){
  console.log('Nuevo Html generado...'); 
  gulp.src('./lib/index.jade') //ruta del archivo de jade
  .pipe(plumber())
  .pipe(jade({
    compress: false
  }))
  .pipe(gulp.dest('')) //ruta del archivo donde se va a generar el html
  .pipe(livereload());
});

gulp.task('stylus', function(){
  console.log('Nuevo Css generado...'); 
  gulp.src('./lib/index.styl') //ruta del archivo de styl
  .pipe(plumber())
  .pipe(stylus({
    use: nib(),
    compress: false
  }))
  .pipe(gulp.dest('./public/css')) //ruta del archivo donde se va a generar el css
  .pipe(livereload());
});


gulp.task('watch', function () { //se encarga de ver cada uno de los plugins
   livereload.listen({basePath:''});
   gulp.watch('./lib/**/*.jade', ['jade']);
   gulp.watch('./lib/**/*.styl', ['stylus']);
});

gulp.task('server', function(done) {
  http.createServer(
    st({ path: __dirname+'', index: 'index.html', cache: false})
  ).listen(4000, done);
});

gulp.task('default', ['stylus','jade','watchify','browserify','browserify-production','watch','server']); //ejecuta y ve si se hacen modificaciones en los archivos jade,stylus,js

