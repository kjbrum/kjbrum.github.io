// Gulp
var gulp = require('gulp');

// Plugins
var browserSync = require('browser-sync');
var cache = require('gulp-cache');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var htmlv = require('gulp-html-validator');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-minify-css');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cp = require('child_process');

var jekyllMessages = {
		jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Define our paths
var paths = {
	scripts: 'js/**/*.js',
	styles: 'scss/**/*.scss',
	images: 'img/**/*.{png,jpg,jpeg,gif}'
};

var destPaths = {
	scripts: 'build/js',
	styles: 'build/css',
	images: 'build/img/',
	html: 'build/validated'
};

// Error Handling
var handleErrors = function() {
	// Send error to notification center with gulp-notify
	notify.onError({
		title: "Compile Error",
		message: "<%= error.message %>"
	}).apply(this, arguments);
	// Keep gulp from hanging on this task
	this.emit('end');
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
	browserSync.notify(jekyllMessages.jekyllBuild);
	return cp.spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
		browserSync.reload();
});

// Compile our Sass
gulp.task('styles', function() {
	return gulp.src(paths.styles)
		.pipe(plumber())
		// .pipe(sass({sourceComments: 'map', sourceMap: 'sass'}))
		.pipe(sass())
		.on('error', handleErrors)
		.pipe(rename('main.css'))
		.pipe(gulp.dest(destPaths.styles))
		.pipe(minifyCSS())
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest(destPaths.styles))
		.pipe(notify('Styles tasks complete!'));
});

// Lint, minify, and concat our JS
gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest(destPaths.scripts))
		.pipe(notify('Scripts tasks complete!'));
});

// Compress Images
gulp.task('images', function() {
	return gulp.src(paths.images)
		.pipe(plumber())
		.pipe(cache(imagemin({
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest(destPaths.images))
		.pipe(notify('Image optimized!'));
});

// Compress Images for Build
gulp.task('build-images', function() {
	return gulp.src(paths.images)
		.pipe(plumber())
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(destPaths.images))
		.pipe(notify('Image optimized!'));
});

// Watch for changes made to files
gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.styles, ['styles']);
	gulp.watch(paths.images, ['images']);
	gulp.watch(['index.html', '*.md', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

// Browser Sync - autoreload the browser
// Additional Settings: http://www.browsersync.io/docs/options/
gulp.task('browser-sync', function () {
	var files = [
		'**/*.html',
		'**/*.php',
		'build/css/main.min.css',
		'build/js/main.min.js',
		'build/img/**/*.{png,jpg,jpeg,gif}'
	];
	browserSync.init(files, {
		server: {
			baseDir: '_site'
		},
		port: 5555
	});
});

gulp.task('clean', function() {
	return gulp.src('build').pipe(clean());
});

// Default Task
gulp.task('default', function(cb) {
	runSequence('clean', 'images', 'scripts', 'styles', 'jekyll-build', 'browser-sync', 'watch', cb);
});

// Build Task
gulp.task('build', function(cb) {
	runSequence('clean', 'build-images', 'scripts', 'styles', 'jekyll-build', cb);
});
