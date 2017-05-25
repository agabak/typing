var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('less/clean-blog.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src('client/app/css/style.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('client/app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js-functions', function() {
    return gulp.src('client/app/js/functions.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('client/app/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('minify-js-common', function() {
    return gulp.src('app/common/*.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/common'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('minify-js-home', function() {
    return gulp.src('app/home/*.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/home'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('minify-js-app', function() {
    return gulp.src('app/*.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('minify-js', ['minify-js-functions', 'minify-js-common', 'minify-js-home', 'minify-js-app']);

// Copy vendor libraries from /node_modules into /app/public
gulp.task('copy', function() {
    gulp.src(['public/lib/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('client/public/bootstrap'))

    gulp.src(['public/lib/jquery/dist/jquery.js', 'public/lib/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('client/public/jquery'))

    gulp.src(['public/lib/angular/angular.js','public/lib/angular/angular.min.js'])
         .pipe(gulp.dest('client/public/angular'))

     gulp.src(['public/lib/angular-ui-router/release/angular-ui-router.js;','public/lib/angular-ui-router/release/angular-ui-router.min.js'])
         .pipe(gulp.dest('client/public/angular-ui-router'))

    gulp.src([
            'public/lib/font-awesome/**',
            '!public/lib/font-awesome/**/*.map',
            '!public/lib/font-awesome/.npmignore',
            '!public/lib/font-awesome/*.txt',
            '!public/lib/font-awesome/*.md',
            '!public/lib/font-awesome/*.json'
        ])
        .pipe(gulp.dest('client/public/font-awesome'))
})

// Run everything
gulp.task('default', ['less', 'minify-css', 'minify-js-functions', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js-functions'], function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});