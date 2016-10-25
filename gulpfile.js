var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    path = require('path'),
    merge = require('merge-stream'),
    webserver = require('gulp-webserver'),
    minifyJs = require('gulp-minify'),
    imagemin = require('gulp-imagemin'),
    ngAnnotate = require('gulp-ng-annotate'),
    babel = require('gulp-babel'),
    minifyHTML = require('gulp-minify-html'),
    opn = require('opn'),
    postMortem = require('gulp-postmortem'),
    embedTemplates = require('gulp-angular-embed-templates'),
    embedTemplatesEs6 = require('gulp-angular-es6-embed-templates'),
    header = require('gulp-header'),
	fs = require('fs'),
    browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream');

var config = {
    frameworkName: 'acnf'
};

var jsPaths = ['./framework.module.js'];
var iteratePath = function (path, type, items) {
    for (var index in items) {
        var item = items[index];

        jsPaths.push('./'+ path + '/' + item + '/' + item + '.' + type + '.js');
    }
};

function getPaths () {
        var acnf = require('./acnf.json');

        if (acnf.controllers) {
            iteratePath('app', 'controller', acnf.controllers);
        }

        if (acnf.services) {
            jsPaths.push('./common/main.service.js');
            iteratePath('common', 'service', acnf.services);
        }

        if (acnf.components) {
            jsPaths.push('./components/acnf.component.js');
            iteratePath('components', 'component', acnf.components);
        }

        jsPaths.push('./framework.config.js');

        return paths;
    }

var paths = {
    less: ['./less/acnf.less'],
    libsJs: [
        'node_modules/angular/angular.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'node_modules/ngstorage/ngStorage.min.js',
        'node_modules/angular-translate/dist/angular-translate.min.js',
        'node_modules/angular-sanitize/angular-sanitize.min.js',
		'node_modules/angular-translate-loader-partial/angular-translate-loader-partial.min.js',
        'node_modules/angular-resource/angular-resource.min.js',
        'node_modules/angular-messages/angular-messages.min.js',
		'node_modules/angular-touch/angular-touch.min.js',
        'node_modules/snap.js/dist/snap.min.js',
        'node_modules/angular-snap/angular-snap.min.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
        'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
    ],
	dist: './dist'
};

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

var server = {
    host: 'localhost',
    port: '9000'
};

gulp.task('embedTemplates', function () {
    getPaths();

    return gulp.src(jsPaths)
        .pipe(embedTemplates({
            basePath: './'
        }))
        .pipe(embedTemplatesEs6({
            basePath: './'
        }))
        .pipe(concat('app.js'))
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-class-properties']
        }))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('tmp/embed/js'));
});

gulp.task('browserify', ['embedTemplates'], function() {
    return browserify('tmp/embed/js/app.js')
            .bundle()
            .pipe(source('app.bundle.js'))
            .pipe(gulp.dest('tmp/embed/js'));
});


var pkg = require('./package.json');
var banner = ['/**',
' * <%= pkg.name %> - <%= pkg.description %>',
' * @version v<%= pkg.version %>',
' * @author <%= pkg.author %>',
' */',
''].join('\n');

paths.libsJsBuild = paths.libsJs;
paths.libsJsBuild.push('./tmp/embed/js/app.js');
paths.libsJsBuild.push('./vendor/**/*.js');

gulp.task('libsAndTemplates', ['embedTemplates'], function () {
    gulp.src(paths.libsJsBuild)
        .pipe(concat(config.frameworkName + '.js'))
        .pipe(minifyJs({
            ext: '.min.js'
        }))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(rename({ extname: '.js' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('less', function () {
    var lessStream = gulp.src(paths.less)
        .pipe(concat('less-files.less'))
        .pipe(less());

    var mergedStream = merge(lessStream)
        .pipe(concat(config.frameworkName + '.css'))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest(paths.dist))
        .pipe(minifyCss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest(paths.dist));

    return mergedStream;
});

gulp.task('copyFonts', function () {
	gulp.src(['./assets/fonts/**/*'])
        .pipe(gulp.dest(paths.dist + '/fonts'));
});

gulp.task('copyPackage', function () {
	gulp.src('package.json')
        .pipe(rename({
            basename: 'package',
            extname: '.json'
          }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copyIndex', function () {
	gulp.src('index.js')
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copyLessUtil', function () {
	gulp.src(['less/mixins.less', 'less/variables.less'])
        .pipe(gulp.dest(paths.dist + '/less'));
});

gulp.task('deletePreviousDist', function () {
    deleteFolderRecursive('./dist');
});

gulp.task('build', ['deletePreviousDist', 'libsAndTemplates', 'less', 'copyFonts', 'copyPackage', 'copyIndex', 'copyLessUtil'], function () {
    setTimeout(function () {
        deleteFolderRecursive('./tmp');    
    }, 100);
});

// Web server docs only.
gulp.task('webserver', function() {
  gulp.src('./').pipe(webserver({
		  host:             server.host,
		  port:             server.port,
		  livereload:       true,
		  directoryListing: false,
	  	  fallback: 'index.html'
    }));
});

gulp.task('openbrowser', function() {
  opn('http://' + server.host + ':' + server.port, {app: 'google-chrome'});
});

gulp.task('deleteTmp', function () {
    deleteFolderRecursive('./tmp');
});

gulp.task('serve', function () {
    gulp.start('webserver');

    gulp.src('./')
        .pipe(postMortem({gulp: gulp, tasks: ['deleteTmp']}));
});