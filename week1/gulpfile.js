// 引入需要的插件
var gulp = require('gulp'),
    htmlmin = require('htmlmin'),
    sass = require('gulp-sass'),
    mincss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    server = require('gulp-webserver'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat');

var path = require('path'),
    fs = require('fs'),
    url = require('url');

// json数据
var json = require('./src/data/data.json');

// 启动服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/list') {
                    res.end(JSON.stringify(data));
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});

// 开发css
gulp.task('devcss', function() {
    gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            brosers: ['last 2 versions', 'Android >=4.0']
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(concat('all.css'))
        .pipe(mincss())
        .pipe(gulp.dest('build/css'))
});

//js操作
gulp.task('uglify', function() {
    gulp.src('src/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});


gulp.task('default', ['server', 'devcss', 'uglify']);