var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    del = require('del');

gulp.task('styles', function(){
    return gulp.src('./styles/main.scss') 
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('public/css'))
        .pipe(notify({ message: 'Styles task complete'}))
});

gulp.task('scripts', function(){
    return gulp.src('./js/**/*.js')
               .pipe(concat('main.js'))
               .pipe(gulp.dest('public/js'))
               .pipe(rename({suffix: '.min'}))
               .pipe(uglify())
               .pipe(gulp.dest('public/js'))
               .pipe(notify({ message: 'Scripts task complete' }))
});

gulp.task('images', function(){
   gulp.src('src/images/**/*')
       .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true}))
       .pipe(gulp.dest('dist/assets/img'))
       .pipe(notify({ message: 'Images task complete' }))
});

gulp.task('nodemon', function(){
    nodemon({
        script: 'index.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' }
    })    
});

gulp.task('clean', function(){
    return del(['dist/assets/css','dist/assets/js','dist/assests/img']);
});

gulp.task('default', function(){
    gulp.start('styles','scripts','images','nodemon', 'watch');
});


gulp.task('watch',function(){

    // setup livereload
    livereload.listen();

    // watch sass files
    gulp.watch('./styles/**/*.scss', ['styles']);
    
    // watch JS files
    gulp.watch('./js/**/*.js', ['scripts']);
    
    // watch images files
    gulp.watch('./img/**/*', ['images']);

    
})
