// Gulp
var gulp = require('gulp');

// Plugins
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var cache = require('gulp-cache');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var htmlv = require('gulp-html-validator');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-minify-css');
var notify = require('gulp-notify'); // requires Growl on Windows
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-ruby-sass'); // Requires ruby
var uglify = require('gulp-uglify');
var cp = require('child_process');

// Define our paths
var paths = {
	scripts: 'js/**/*.js',
	styles: 'sass/**/*.scss',
	fonts: 'sass/fonts/*',
	images: 'img/**/*.{png,jpg,jpeg,gif}',
	html: ['index.html', '*.md', '_includes/*.html', '_layouts/*.html', '_posts/*']
};

var destPaths = {
	scripts: 'build/js',
	styles: 'build/css',
	fonts: 'build/fonts',
	images: 'build/img/',
	html: 'build/validated'
};

// Error Handling
// Send error to notification center with gulp-notify
var handleErrors = function() {
	notify.onError({
		title: "Compile Error",
		message: "<%= error.message %>"
	}).apply(this, arguments);
	this.emit('end');
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
	browserSync.notify('<span style="color: grey">Running:</span> $ jekyll build');
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
		.pipe(sass({sourcemap: true, sourcemapPath: paths.styles}))
		.pipe(autoprefixer())
		.pipe(gulp.dest('_site/'+destPaths.styles)) // Used for Jekyll
		.pipe(browserSync.reload({stream:true}))
		.pipe(gulp.dest(destPaths.styles))
		.pipe(notify('Styles task complete!'));
});

// Compile our Sass
gulp.task('build-styles', function() {
	return gulp.src(paths.styles)
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(minifyCSS())
		.pipe(rename('main.css'))
		.pipe(gulp.dest(destPaths.styles))
		.pipe(notify('Build styles task complete!'));
});

// Lint, minify, and concat our JS
gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest('_site/'+destPaths.scripts)) // Used for Jekyll
		.pipe(browserSync.reload({stream:true}))
		.pipe(gulp.dest(destPaths.scripts))
		.pipe(notify('Script tasks complete!'));
});

// Clean Iimages Folder
gulp.task('clean-images', function() {
	return gulp.src(destPaths.images+'/**/*')
		.pipe(clean())
		.pipe(gulp.dest('_site/'+destPaths.images)) // Used for Jekyll
		.pipe(clean());
});

// Compress Images
gulp.task('images', ['clean-images'], function() {
	return gulp.src(paths.images)
		.pipe(plumber())
		.pipe(gulp.dest('_site/'+destPaths.images)) // Used for Jekyll
		.pipe(browserSync.reload({stream:true}))
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
	gulp.watch(paths.html, ['jekyll-rebuild']);
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
		port: 5555,
		open: false
	});
});

gulp.task('clean', function() {
	return gulp.src('build').pipe(clean());
});

// Clear the cache for everything
gulp.task('clear-cache', function() {
  cache.clearAll();
});

// Move Fonts to Build Folder
gulp.task('move-fonts', function() {
	gulp.src(paths.fonts)
	.pipe(gulp.dest(destPaths.fonts));
});

// Default Task
gulp.task('default', function(cb) {
	runSequence('clean', 'clear-cache', 'images', 'scripts', 'styles', 'move-fonts', 'jekyll-build', 'browser-sync', 'watch', cb);
});

// Build Task
gulp.task('build', function(cb) {
	runSequence('clean', 'clear-cache', 'build-images', 'build-styles', 'scripts', 'move-fonts', 'jekyll-build', cb);
});
