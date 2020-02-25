const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const rigger = require('gulp-rigger');
const cleanCss = require('gulp-clean-css');
const del = require('del');
const concat = require('gulp-concat')
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');


gulp.task('cleanDev', async function () {
    del.sync('./dist')
});

gulp.task('html', function () {
    return gulp.src('./src/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream())
});

gulp.task('scss', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(cleanCss({level: 2}))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename(function (path) {
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});


gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(terser({
            toplevel: true
        }))
        .pipe(concat('all.js'))
        .pipe(rename(function (path) {
            path.extname = ".min.js";
        }))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('img', function () {
    return gulp.src('src/img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('sync', function () {
    browserSync.init({
        server: {
            baseDir: './dist',
            index: 'index.html'
        }
    });
    gulp.watch('./src/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('./src/templates', gulp.series('html'));
    gulp.watch('./src/js', gulp.series('scripts'))
});

gulp.task('build', gulp.series('cleanDev', 'html', 'scss', 'img', 'scripts'));
gulp.task('dev', gulp.series('build', 'sync'));