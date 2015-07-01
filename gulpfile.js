var gulp  = require('gulp'), 
    watch = require("gulp-watch"),
    shell = require('gulp-shell'),
    copy = require('gulp-copy');


var gulpHelpers = require('gulp-helpers');
var taskMaker = gulpHelpers.taskMaker(gulp);
var situation = gulpHelpers.situation();
var _ = gulpHelpers.framework('_');
var runSequence = require('run-sequence').use(gulp);

var paths = {
  tagsrc: 'src/components/**/*.js',
  tagdst: 'dist/components/',
  utilsrc: 'src/utils/**/*.js',
  utildst: 'dist/utils',
  dist: 'dist/', 
  watch: 'src/**',
  distw: 'dist/**'
}

var babelCompilerOptions = {
  modules: 'system'
};


taskMaker.defineTask('riot', {taskName: 'riot', src: [paths.tagsrc], dest: paths.tagdst, ngAnnotate: false, compilerOptions: babelCompilerOptions, riotOptions: {type: 'es6'}});
taskMaker.defineTask('babel', {taskName: 'utils', src: [paths.utilsrc], dest: paths.utildst, ngAnnotate: true, compilerOptions: babelCompilerOptions}); 
//taskMaker.defineTask('minify', {taskName: 'minify', src: path.minify, dest: path.output});
taskMaker.defineTask('jshint', {taskName: 'lint', src: paths.tagsrc});

gulp.task('jspm-link', shell.task([
  'cd ./dist && jspm link jspm:osiloke/riot-schema@dev -y'
]))

gulp.task('recompile', function(callback){
  runSequence('riot', 'utils', callback);
})
//the watch task
gulp.task('compile', function(callback) { 
  runSequence('recompile', callback);
})

gulp.task('watch', function(){
  gulp.watch(paths.watch, ['riot', 'utils'])
})

gulp.task('watch_dist', function(){
  gulp.watch(paths.distw, ['jspm-link'])
})

gulp.task('default', ['watch']);