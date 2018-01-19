//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
    cssmin = require('gulp-minify-css');

//定义一个testCssmin任务（自定义任务名称）
gulp.task('testCssmin', function () {
    gulp.src('src/css/*.css') //该任务针对的文件
        .pipe(cssmin({compatibility: 'ie7'})) //该任务调用的模块
        .pipe(gulp.dest('dist/css')); //将压缩后的css文件放入dist/css目录下
});

//gulp-minify-css 参数
gulp.task('testCssmin1', function () {
    gulp.src('src/css/*.css')
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true//类型：Boolean 默认：false 是否保留换行
        }))
        .pipe(gulp.dest('dist/css'));
});

//给引用url添加版本号
var cssver = require('gulp-make-css-url-version');
gulp.task('testCssmin2', function () {
    gulp.src('src/css/*.css')
        .pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});
