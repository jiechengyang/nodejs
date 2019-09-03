//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');

//定义一个testImagemin任务（自定义任务名称）
gulp.task('testImagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}') //该任务针对的文件
        .pipe(imagemin()) //该任务调用的模块
        .pipe(gulp.dest('dist/img')); //将会把压缩的图片文件放入src/css下
});

//gulp-imagemin参数
gulp.task('testImagemin1', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});

//深度压缩图片
var pngquant = require('imagemin-pngquant');
gulp.task('testImagemin2', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('dist/img'));
});

//只压缩修改的图片
var cache = require('gulp-cache');
gulp.task('testImagemin3', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});
