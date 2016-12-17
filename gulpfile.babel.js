
'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import browserSync from 'browser-sync'; 
import exec from 'child_process'; 
import browserify from 'browserify';
import fs from 'fs';
import babelify from 'babelify';
import del from 'del';  
//const watchify = require('watchify');


const reload = browserSync.reload; 
const execute = exec.exec; 

// Where our files live 
const src = {
    scss: './src/scss/*.scss',
    js:   './src/js/*.js',
    html: './build/*.html'
};

// Tasks in array executed sequentially as in array. 
gulp.task('default', ['scripts', 'browserify', 'lint', 'lint:watch', 'sass', 'sass:watch']);

// Converts ES6->ES5, then throws transpiled js into temporary folder 
// waiting to be bundled by Browserify  
// TODO: Delete this. 
gulp.task('scripts', () => {
    return gulp.src( src.js )
        .pipe(babel())  
        .pipe(gulp.dest('./build/temp'));
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
// TODO: Would be better to find way of doing this using streams without 'execute'
// which feels like more of a hack. 
gulp.task('test', () => {
    return execute('babel-tape-runner ./test/*', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

// can have it run the linter, babel, test, then browserify ? 
gulp.task('test:watch', ['test'], () => { 
    gulp.watch(['src/*.js', 'test/*.js'], ['test']); 
});


// Uses browswerify to bundle up our ES5 code. 
gulp.task('build', () => { 
    //gulp.watch(['build/*.js', 'test/*.js'], ['tests']); 
    return browserify( './src/js/main.js' )
        .transform('babelify', {presets: ['es2015']}) 
        .bundle()
        .pipe(fs.createWriteStream('./build/bundle.js'));

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

