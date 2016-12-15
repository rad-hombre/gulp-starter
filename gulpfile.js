
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload; 
const exec = require('child_process').exec;  
const browserify = require('browserify');
const fs = require('fs');
const babelify = require('babelify');
const del = require('del');  
//const watchify = require('watchify');


// Where our files live 
const src = {
    scss: './src/scss/*.scss',
    js:   './src/js/*.js',
    html: './build/*.html'
};

// Tasks in array executed sequentially as in array. 
gulp.task('default', ['scripts', 'browserify', 'lint', 'lint:watch', 'sass', 'sass:watch']);

// Converts ES6->ES5, THEN concatenates files into one js file. 
gulp.task('scripts', () => {
    return gulp.src( src.js )
        //.pipe(babel())  
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('sass', () => {
      return gulp.src( src.scss )
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./build'));
});
 
gulp.task('sass:watch', () => {
      gulp.watch('./src/scss/*.scss', ['sass']);
});

// Watches source JS for changes; linter alerts if bad change
gulp.task('lint', () => {
    return gulp.src([ src.js,'!node_modules/**']) 
        .pipe(eslint())
        .pipe(eslint.format())
        //.pipe(eslint.failAfterError());
});

gulp.task('lint:watch', ['lint'], () => { 
    gulp.watch([ src.js ], ['lint']); 
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
gulp.task('tests:watch', ['tests'], () => { 
    gulp.watch(['build/*.js', 'test/*.js'], ['tests']); 
});


// [ ------------------------------------------ ] 
//gulp.task('bb', ['lint', 'tests'], () => { 
gulp.task('browserify', () => { 
    //gulp.watch(['build/*.js', 'test/*.js'], ['tests']); 
    //return 
        browserify('./build/main.js')
        .transform('babelify', {presets: ["es2015"]}) 
        .bundle()
        .pipe(fs.createWriteStream("./build/bundle.js"));

});


//const wb = watchify(browserify());
//wb.transform(babelify.configure({
    //experimental: true, 
//}); 


gulp.task('clean', () => {
    return del(['build/*.js', 'build/*.css', '!build/index.html'])
            .then(paths => {
                console.log('Deleted files and folders:\n', paths.join('\n'));
            });
});

