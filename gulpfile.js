const {src, dest, watch, series, parallel} = require('gulp');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const { path }     = require('./gulp/config/path.js');
const include      = require('gulp-file-include');
const uglify       = require('gulp-uglify-es').default;
const sass         = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCss     = require('gulp-clean-css');
const del          = require('del');

function browsersync(){
    browserSync.init({
        server:{
            baseDir: path.buildFolder,
        },
    })
}

function copy(){
    return src(path.src.files)
    .pipe(dest(path.buildFolder))
}

function html(){
    return src(`${path.srcFolder}/**.html`)
    .pipe(include({
        prefix:'@@'
    }))
    .pipe(dest(path.buildFolder))
}

function styles(){
    return src(`${path.srcFolder}scss/style.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist:['last 10 versions'],
        
    }))
    .pipe(cleanCss(({ level:{ 1: { specialComments: 0}}})))
    .pipe(dest(`${path.buildFolder}css/`))
    .pipe(browserSync.stream())
}

function scripts(){
    return src(path.scripts.src)
    .pipe(concat('index.min.js'))
    .pipe(dest(path.scripts.output))
    .pipe(browserSync.stream())
}

function clearDist(){
    return del(path.buildFolder)
}

function startwatch(){
    watch(path.watch.scss, {interval:100, usePolling: true}, series(styles))
    watch(path.watch.scripts, {interval:100, usePolling: true}, series(scripts))
    watch(path.watch.html, {interval:100, usePolling: true}, series(html)).on('change', browserSync.reload)
}

exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.copy        = copy;
exports.styles      = styles;
exports.default     = series(clearDist,parallel(html, styles, scripts, browsersync, startwatch))