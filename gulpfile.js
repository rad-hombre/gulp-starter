
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload; 

// Where are files live 
const src = {
    scss: 'app/scss/*.scss',
    js:   'app/js/*.js',
    html: 'dist/*.html'
};

// Tasks in array executed sequentially as in array. 
gulp.task('default', ['scripts', 'sass', 'sass:watch']);

// Converts ES6->ES5 then concatenates files. 
gulp.task('scripts', () => {
    return gulp.src('./app/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', () => {
      return gulp.src('./app/scss/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./dist'));
});
 
gulp.task('sass:watch', () => {
      gulp.watch('./app/scss/*.scss', ['sass']);
});

gulp.task('lint', () => {
    return gulp.src(['./app/js/*.js','!node_modules/**']) 
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], function () {
    // This will only run if the lint task is successful... 
    console.log("success baybay");
});

// Serves up app on localhost; browser auto-refreshes after file changes.         
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
    });

    // Watch directories, and on change reload. 
    gulp.watch(src.html).on("change", reload);
    gulp.watch(src.scss, ['sass', reload]);
    gulp.watch(src.js, ['scripts', reload]);

});

