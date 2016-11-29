
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload; 
const exec = require('child_process').exec;  


// Where our files live 
const src = {
    scss: 'src/scss/*.scss',
    js:   'src/js/*.js',
    html: 'build/*.html'
};

// Tasks in array executed sequentially as in array. 
gulp.task('default', ['scripts', 'sass', 'sass:watch']);

// Converts ES6->ES5 then concatenates files. 
gulp.task('scripts', () => {
    return gulp.src('./src/js/*.js')
        .pipe(babel())
        //.pipe(concat('main.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('sass', () => {
      return gulp.src('./src/scss/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./build'));
});
 
gulp.task('sass:watch', () => {
      gulp.watch('./src/scss/*.scss', ['sass']);
});

gulp.task('lint', () => {
    return gulp.src(['./src/js/*.js','!node_modules/**']) 
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], function () {
    // This will only run if the lint task is successful... 
    console.log("success baybay");
});

// Serves up src on localhost; browser auto-refreshes after file changes.         
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./build/"
        },
    });

    // Watch directories, and on change reload. 
    gulp.watch(src.html).on("change", reload);
    gulp.watch(src.scss, ['sass', reload]);
    gulp.watch(src.js, ['scripts', reload]);

});

// Automate unit testing on JavaScript with Tape. 
gulp.task('tests', () => {
    return exec('tape test/* | ./node_modules/.bin/faucet', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

// can have it run the linter, babel, test, then browserify ? 

gulp.task('autotest', ['tests'], () => { 
    gulp.watch(['build/*.js', 'test/*.js'], ['tests']); 
});


