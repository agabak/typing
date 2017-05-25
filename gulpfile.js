var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var concat = require('gulp-concat');
var clean = require('gulp-rimraf');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

//Clean all the folders before bulid or dev
gulp.task('clean-build', [], function() {
  console.log("Clean all files in build folder");
  return gulp.src('build/*',{ read: false }).pipe(clean());
});

gulp.task('clean-app', [], function() {
  console.log("Clean one all files in build folder");
  return gulp.src('app/**/*.js',{ read: false }).pipe(clean());
});


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
    return gulp.src('css/clean-blog.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'))
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


//Vendor  files library to the build
gulp.task('minify-js-server',function(){
      gulp.src(['server.js','package.json','index.html'])
          .pipe(gulp.dest('build'))
      gulp.src('api/controllers/*.js')
          .pipe(gulp.dest('build/api/controllers'))
      gulp.src('api/routers/*.js')
          .pipe(gulp.dest('build/api/routers')) 
     gulp.src('client/public/bootstrap/js/*.min.js')
          .pipe(gulp.dest('build/client/public/bootstrap/js'))
     gulp.src(['client/app/js/*.min.js','client/app/js/jquery.js'])
          .pipe(gulp.dest('client/app/js'))  
     gulp.src('client/public/angular/*.min.js')
          .pipe(gulp.dest('build/client/public/angular')) 
     gulp.src('client/public/angular/*.min.js')
          .pipe(gulp.dest('build/client/public/angular')) 
     gulp.src('client/public/angular-ui-router/*.min.js')
        .pipe(gulp.dest('build/client/public/angular-ui-router'))
     gulp.src('client/app/css/*.min.css')
        .pipe(gulp.dest('build/client/app/css'))
     gulp.src('client/app/js/*.min.js')
        .pipe(gulp.dest('build/client/app/js'))
     gulp.src('client/app/img/**')
        .pipe(gulp.dest('build/client/app/img'))
     gulp.src('client/app/fonts/**')
        .pipe(gulp.dest('build/client/app/fonts')) 
    gulp.src('client/app/css/style.css') 
        .pipe(gulp.dest('build/client/app/css'))
    gulp.src('app/home/*.html')
        .pipe(gulp.dest('build/app/home')) 
    gulp.src('app/common/*.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/common'))
    gulp.src('build/app/home/*.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/app/home'))

    gulp.src('app/*.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/app'))   
})


gulp.task('minify-js', ['minify-js-functions', 'minify-js-common', 'minify-js-home', 'minify-js-app','minify-js-server']);

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



gulp.task('prodBuild', ['clean'], function() {
  console.log("Concating and moving all the css files in styles folder");
  return gulp.src("client/app/css/*.min.css")
      .pipe(concat('main.min.css'))
      .pipe(gulp.dest('build/styles'));
});

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
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js'], function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});