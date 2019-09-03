//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin');

//定义一个testHtmlmin任务（自定义任务名称）
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/html/*.html') //该任务针对的文件
        .pipe(htmlmin(options)) //该任务调用的模块
        .pipe(gulp.dest('dist/html')); //将会在dist/html下生成压缩后的detail.html和index.html
});