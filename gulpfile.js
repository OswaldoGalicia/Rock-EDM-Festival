//gulp
const { src, dest, watch, parallel } = require("gulp");
//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//imagenes 
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//js
const terser = require('gulp-terser-js');



function css( done ){
    //identidficar el archivo de sass
    //compilar las funciones de sass
    //almacenarlo en el disco duro 
    src('src/scss/**/*.scss')//identifica el archivo sass
        .pipe(sourcemaps.init())//inicializa el sourcemaps
        .pipe(plumber())
        .pipe(sass()) //compilarlo
        .pipe(postcss([autoprefixer(),cssnano()]))//mejoras css
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css")) //Almacenarla en la memoria
    done();//callback para que acabe el 
}

//imgmin
function imagenesAvif( done ){
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done ();
}

function imagenes( done ){
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

function versionWebp(done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'))

    done();
}

function javascript( done ){
     src('src/js/**/*.js')
     .pipe(sourcemaps.init())
     .pipe(terser())
     .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'))
    done();
}

function dev( done ){
    watch("src/scss/**/*.scss", css)
    watch("src/js/**/*.js", javascript)
    done();
}


//npm run sass
//npx gulp dev
exports.css = css;
exports.imagenesAvif = imagenesAvif;
exports.versionWebp = versionWebp;
exports.imagenes = parallel(versionWebp,imagenes,imagenesAvif);
exports.javascript = javascript; 
exports.dev = dev;