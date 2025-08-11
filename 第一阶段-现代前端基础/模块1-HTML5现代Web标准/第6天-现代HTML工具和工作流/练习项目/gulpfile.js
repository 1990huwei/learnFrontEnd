const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const rimraf = require('rimraf');

// 路径配置
const paths = {
  src: {
    html: 'src/**/*.html',
    css: 'src/css/**/*.css',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    images: 'src/images/**/*',
    fonts: 'src/fonts/**/*'
  },
  dist: {
    base: 'dist',
    css: 'dist/css',
    js: 'dist/js',
    images: 'dist/images',
    fonts: 'dist/fonts'
  }
};

// 清理任务
function clean(cb) {
  rimraf(paths.dist.base, cb);
}

// HTML处理任务
function html() {
  return gulp.src(paths.src.html)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true
    }))
    .pipe(gulp.dest(paths.dist.base))
    .pipe(browserSync.stream());
}

// CSS处理任务
function css() {
  return gulp.src(paths.src.css)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2,
      compatibility: 'ie8'
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream());
}

// SCSS处理任务
function scss() {
  return gulp.src(paths.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['node_modules']
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(cleanCSS({
      level: 2,
      compatibility: 'ie8'
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream());
}

// JavaScript处理任务
function js() {
  return gulp.src(paths.src.js)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(uglify({
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream());
}

// 图片优化任务
function images() {
  return gulp.src(paths.src.images)
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 80, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: false },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(gulp.dest(paths.dist.images))
    .pipe(browserSync.stream());
}

// 字体复制任务
function fonts() {
  return gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.dist.fonts));
}

// 开发服务器任务
function serve() {
  browserSync.init({
    server: {
      baseDir: paths.dist.base
    },
    port: 3000,
    open: true,
    notify: false
  });
}

// 监听文件变化
function watchFiles() {
  gulp.watch(paths.src.html, html);
  gulp.watch(paths.src.css, css);
  gulp.watch(paths.src.scss, scss);
  gulp.watch(paths.src.js, js);
  gulp.watch(paths.src.images, images);
  gulp.watch(paths.src.fonts, fonts);
}

// 代码质量检查任务
function lintHTML() {
  const htmlhint = require('gulp-htmlhint');
  return gulp.src(paths.src.html)
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter());
}

function lintCSS() {
  const stylelint = require('gulp-stylelint');
  return gulp.src(paths.src.css)
    .pipe(stylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
}

// 代码格式化任务
function format() {
  const prettier = require('gulp-prettier');
  return gulp.src(['src/**/*.{html,css,js}'])
    .pipe(prettier({
      singleQuote: true,
      tabWidth: 2,
      useTabs: false
    }))
    .pipe(gulp.dest('src'));
}

// 性能分析任务
function analyze() {
  const size = require('gulp-size');
  return gulp.src('dist/**/*')
    .pipe(size({
      showFiles: true,
      showTotal: true,
      title: '构建文件大小分析'
    }));
}

// 创建ZIP包任务
function zip() {
  const gulpZip = require('gulp-zip');
  return gulp.src('dist/**/*')
    .pipe(gulpZip('project.zip'))
    .pipe(gulp.dest('.'));
}

// 任务组合
const build = gulp.series(
  clean,
  gulp.parallel(html, css, scss, js, images, fonts)
);

const dev = gulp.series(
  build,
  gulp.parallel(serve, watchFiles)
);

const lint = gulp.parallel(lintHTML, lintCSS);

// 导出任务
exports.clean = clean;
exports.html = html;
exports.css = css;
exports.scss = scss;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.serve = serve;
exports.watch = watchFiles;
exports.lint = lint;
exports.format = format;
exports.analyze = analyze;
exports.zip = zip;
exports.build = build;
exports.dev = dev;
exports.default = dev;

// 帮助任务
function help() {
  console.log(`
可用的Gulp任务：

  gulp              - 运行开发环境（默认任务）
  gulp build        - 构建生产版本
  gulp dev          - 运行开发环境
  gulp clean        - 清理构建目录
  gulp lint         - 代码质量检查
  gulp format       - 代码格式化
  gulp analyze      - 构建文件大小分析
  gulp zip          - 创建项目ZIP包
  gulp serve        - 启动开发服务器
  gulp watch        - 监听文件变化
  
单独任务：
  gulp html         - 处理HTML文件
  gulp css          - 处理CSS文件
  gulp scss         - 处理SCSS文件
  gulp js           - 处理JavaScript文件
  gulp images       - 优化图片
  gulp fonts        - 复制字体文件
`);
}

exports.help = help;