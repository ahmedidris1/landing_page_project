const { src, dest, parallel, series, watch } = require("gulp");

const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
// const del = require("del");
const browsersync = require("browser-sync").create();

const files = {
  htmlPath: "./dist/index.html",
  // htmlOutput: "./dist/index.html",
  sassPath: "./src/sass/main.scss",
  cssOutput: "./dist/css/",
};

function htmlTemplate() {
  return src(files.htmlPath).pipe(dest(".")).pipe(browsersync.stream());
}

// function clearHtml() {
//   del(["./dist/index.html"]);
// }

function styles() {
  return src(files.sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(cssnano())
    .pipe(sourcemaps.write("."))
    .pipe(dest(files.cssOutput))
    .pipe(browsersync.stream());
}

function watchFiles() {
  watch(files.htmlPath, htmlTemplate);
  watch(files.sassPath, styles);
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./dist",
    },
    port: 3000,
  });
}

exports.watch = parallel(watchFiles, browserSync);
