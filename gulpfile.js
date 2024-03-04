const { src, dest, watch, parallel, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const svgSprite = require("gulp-svg-sprite");
const svgmin = require('gulp-svgmin');
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");
const ttf2woff2 = require("gulp-ttf2woff2");
const del = require("del");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const gutil = require("gulp-util");
const ftp = require("vinyl-ftp");
// const typograf = require("gulp-typograf");

const fonts = () => {
  return src("./src/fonts/ttf/*.ttf")
    .pipe(ttf2woff2())
    .pipe(dest(["./src/fonts/"]))
    .pipe(dest(["./app/fonts/"]));
};

const delFonts = () => {
  return del(["src/fonts/ttf"]);
};

const fontDest = () => {
  return src("./src/fonts/*.woff2")
  .pipe(dest(["./app/fonts/"]));
}
// const fonts = () => {
//   return src("./src/fonts/**.ttf")
//   .pipe(ttf2woff2())
//   .pipe(dest("./app/fonts/"))
// };

// return возвращает что-то, а функция scr - получает какой-то файл или файлы, котоыре нужно обработать
// .pipe это функция,которая как бы труба, через которую пропускаются все файлы, что мы получили
// Если src получает файлы, то dest - куда-то сохраняет их

// scss styles
const styles = () => {
  return src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", notify.onError())
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(dest("./app/css/"))
    .pipe(browserSync.stream());
};

const htmlInclude = () => {
  return src(["./src/*.html"])
    .pipe(
      fileinclude({
        prefix: "@",
        basepath: "@file",
      })
    )
    // .pipe(
    //   typograf({
    //     locale: ["ru", "en-US"],
    //   })
    // )
    .pipe(dest("./app"))
    .pipe(browserSync.stream());
};

const imgToApp = () => {
  return src([
    "./src/img/**.jpg",
    "./src/img/**.png",
    "./src/img/**.jpeg",
    "./src/img/**.svg",
  ]).pipe(dest("./app/img"));
};

const webpImages = () => {
  return src(["./src/img/**.jpg", "./src/img/**.png", "./src/img/**.jpeg"])
    .pipe(webp())
    .pipe(dest("./app/img"));
};

const avifImages = () => {
  return src([`./src/img/**/**.{jpg,jpeg,png}`])
    .pipe(avif())
    .pipe(dest("./app/img"));
};

//svg sprite
const svgSprites = () => {
  return src("./src/img/svg/**.svg")
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: {
          xmlMode: true,
        },
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("./app/img"));
};

const resources = () => {
  return src("./src/resources/**").pipe(dest("./app"));
};

const clean = () => {
  return del(["app/*"]);
};

// scripts
const scripts = () => {
  return src("./src/js/main.js")
    .pipe(
      webpackStream({
        mode: "development",
        output: {
          filename: "main.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                },
              },
            },
          ],
        },
      })
    )
    .on("error", function (err) {
      console.error("WEBPACK ERROR", err);
      this.emit("end");
    })
    .pipe(sourcemaps.init())
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write("."))
    .pipe(dest("./app/js"))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./app",
    },
    notify: false,
  });

  watch("./src/scss/**/*.scss", styles);
  watch("./src/parts/*.html", htmlInclude);
  watch("./src/*.html", htmlInclude);
  watch("./src/img/**jpg", imgToApp);
  watch("./src/img/**png", imgToApp);
  watch("./src/img/**jpeg", imgToApp);
  watch("./src/img/**svg", imgToApp);
  watch(`./src/img/**/**.{jpg,jpeg,png}`, webpImages);
  watch(`./src/img/**/**.{jpg,jpeg,png}`, avifImages);
  watch("./src/img/**svg", svgSprites);
  watch("./src/resources/**", resources);
  watch("./src/fonts/**", fonts);
  watch("./src/js/**/*.js", scripts);
};

exports.styles = styles; // exp.st - это такск, а styles - funcrion, который присвается этому таскуnpm i sass
exports.watchFiles = watchFiles;
exports.fileinclude = htmlInclude;

exports.default = series(
  clean,
  parallel(
    htmlInclude,
    scripts,
    fonts,
    resources,
    imgToApp,
    webpImages,
    avifImages,
    svgSprites
  ),
  delFonts,
  fontDest,
  styles,
  watchFiles
);

const imageMin = () => {
  return src(["./src/img/**.jpg", "./src/img/**.png", "./src/img/**.jpeg"])
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("./app/img"));
};

const stylesBuild = () => {
  return src("./src/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", notify.onError())
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(dest("./app/css/"));
};

const scriptsBuild = () => {
  return src("./src/js/main.js")
    .pipe(
      webpackStream({
        mode: "development",
        output: {
          filename: "main.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                },
              },
            },
          ],
        },
      })
    )
    .on("error", function (err) {
      console.error("WEBPACK ERROR", err);
      this.emit("end");
    })
    .pipe(uglify().on("error", notify.onError()))
    .pipe(dest("./app/js"));
};

exports.build = series(
  clean,
  parallel(
    htmlInclude,
    scriptsBuild,
    fonts,
    fontDest,
    resources,
    imgToApp,
    webpImages,
    avifImages,
    svgSprites
  ),
  stylesBuild,
  imageMin
);

// deploy
const deploy = () => {
  let conn = ftp.create({
    host: "77.222.57.185",
    user: "fizer00mai",
    password: "Fgyewp223",
    parallel: 10,
    log: gutil.log,
  });

  let globs = ["app/**"];

  return src(globs, {
    base: "./app",
    buffer: false,
  })
    .pipe(conn.newer("/sfizer_ru/public_html/")) // only upload newer files
    .pipe(conn.dest("/sfizer_ru/public_html/"));
};



exports.deploy = deploy;
