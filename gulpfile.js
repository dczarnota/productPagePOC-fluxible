"use strict"
 var gulp = require('gulp');
 var uglify = require('gulp-uglify');

var source = require('vinyl-source-stream');
var browserify = require('browserify');
 var watchify = require('watchify');
 var reactify = require('reactify');
 var buffer = require('vinyl-buffer');
// // var streamify = require('gulp-streamify');
// // var gulpUtil= require('gulp-util');
// // var jshint = require('gulp-jshint');
// var gulp_browserify = require('gulp-browserify');
/*_________  ____  __  __   / /_____ ______/ /_______
 / ___/ __ \/ __ \/ / / /  / __/ __ `/ ___/ //_/ ___/
/ /__/ /_/ / /_/ / /_/ /  / /_/ /_/ (__  ) ,< (__  ) 
\___/\____/ .___/\__, /   \__/\__,_/____/_/|_/____/  
    /_/    /____/                               
*/
// gulp.task('COPY_CSS', function() {
// 	gulpUtil.log('Gulp copying css');
//   // copy any html files in source/ to public/
//   gulp.src('./resources/css/*.css').pipe(gulp.dest('./public/css'));
//   gulp.src('./bower_components/pure/base-min.css').pipe(gulp.dest('./public/css'));
//   gulp.src('./bower_components/pure/grids-min.css').pipe(gulp.dest('./public/css'));
//   gulp.src('./bower_components/pure/grids-responsive-min.css').pipe(gulp.dest('./public/css'));
//   gulp.src('./bower_components/font-awesome/css/font-awesome.min.css').pipe(gulp.dest('./public/css'));
// });

// gulp.task('COPY_JS', function() {
//   // copy any html files in source/ to public/
//   gulp.src('./bower_components/jquery/dist/jquery.min.js').pipe(gulp.dest('./public/js'));
//   gulp.src('./bower_components/react/JSXTransformer.js').pipe(gulp.dest('./public/js'));
//   gulp.src('./bower_components/react/react.min.js').pipe(gulp.dest('./public/js'));
// });

// gulp.task('COPY_FONTS', function() {
//   // copy any html files in source/ to public/
//   gulp.src('./bower_components/font-awesome/fonts/*').pipe(gulp.dest('./public/fonts'));
//   gulp.src('./resources/BebasNeue-webfont.woff').pipe(gulp.dest('./public/fonts'));
//   gulp.src('./resources/BEBAS.TTF').pipe(gulp.dest('./public/fonts'));
//   gulp.src('./resources/floodstd.ttf').pipe(gulp.dest('./public/fonts'));
//   gulp.src('./resources/floodstd.woff').pipe(gulp.dest('./public/fonts'));
// });

// gulp.task('COPY_HTML', function() {
//   // copy any html files in source/ to public/
//   gulp.src('./resources/browseMenu.html').pipe(gulp.dest('./public'));
// });

// gulp.task('COPY_IMAGES', function() {
//   // copy any html files in source/ to public/
//   gulp.src('./resources/hamburger.png').pipe(gulp.dest('./public/css'));
// });


// gulp.task('jshint', function() {
//   return gulp.src('./*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('jshint-stylish'));
// });

// gulp.task('watch', function() {
//   gulp.watch('./*.js', ['jshint']);
//   gulpUtil.log('Gulp watching for changes......');


// 	// var watcher = watchify(browserify({
// 	// 	entries: ['./resources/js/app.js'],
// 	// 	transform: [reactify],
// 	// 	debug: true,
// 	// 	cache: {},

// 	// 	packageCache: {},
// 	// 	fullPaths: true
// 	// }));
// 	// return watcher.on('update', function() {
// 	// 		watcher.bundle()
// 	// 			.pipe(source('app_build.js'))
// 	// 			.pipe(gulp.dest('./public/js'))
// 	// 		console.log('Updated');
// 	// 	})
// 	// 	.bundle()
// 	// 	.pipe(source('app_build.js'))
// 	// 	.pipe(gulp.dest('./public/js'));
// 	});
 
gulp.task('scripts', function () {

    gulp.src(['./client.js'])
        .pipe(browserify({
            transform: [ 'reactify' ]
        }))
        .pipe(gulp.dest('./public/js/bundle.js'));

});

gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./client.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle() // Create new bundle that uses the cache for high performance
         .pipe(source('bundle.js'))
         .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
         // .pipe(uglify()) 
    // This is where you add uglifying etc.
        .pipe(gulp.dest('./public/js'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    // Create the initial bundle when starting the task
    .pipe(source('bundle.js'))
    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
    // .pipe(uglify()) 
    .pipe(gulp.dest('./public/js'));
});



gulp.task('default',['COPY_CSS','COPY_JS','COPY_FONTS','COPY_HTML'],function(){
 return gulpUtil.log('Gulp started working');
});