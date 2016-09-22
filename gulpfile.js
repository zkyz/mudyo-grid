var gulp = require('gulp'),
sass = require('gulp-sass')
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
minifycss = require('gulp-clean-css'),
minifyhtml = require('gulp-minify-html'),
browserSync = require('browser-sync').create();

gulp.task('serve', function () {
    browserSync.init({
        server: 'src'
    });

    gulp.watch("src/**/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/**/*.js", ['js-watch']);
    gulp.watch('src/css/sass/**/*.scss', ['sass']);
});

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('js-watch', /*['js'],*/ function (done) {
    browserSync.reload();
    done();
});

gulp.task('sass', function () {
  return gulp.src('src/css/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});


//HTML 파일을 minify
gulp.task('minifyhtml', function () {
    return gulp.src('src/**/*.html') //src 폴더 아래의 모든 html 파일을
        .pipe(minifyhtml()) //minify 해서
        .pipe(gulp.dest('dist')) //dist 폴더에 저장
        .pipe(browserSync.reload({stream:true})); //browserSync 로 브라우저에 반영
    });

//자바스크립트 파일을 minify
gulp.task('uglify', function () {
    return gulp.src('src/**/*.js') //src 폴더 아래의 모든 js 파일을
        .pipe(concat('all.js')) //병합하고
        .pipe(uglify()) //minify 해서
        .pipe(gulp.dest('dist/js')) //dist 폴더에 저장
        .pipe(browserSync.reload({stream:true})); //browserSync 로 브라우저에 반영
    });

//CSS 파일을 minify
gulp.task('minifycss', function () {
    return gulp.src('src/**/*.css') //src 폴더 아래의 모든 css 파일을
        .pipe(concat('all.css')) //병합하고
        .pipe(minifycss()) //minify 해서
        .pipe(gulp.dest('dist/css')) //dist 폴더에 저장
        .pipe(browserSync.reload({stream:true})); //browserSync 로 브라우저에 반영
    });

//gulp를 실행하면 default 로 minifycss task를 실행
gulp.task('default', ['serve', 'sass']);