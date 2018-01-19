//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
    rev = require('gulp-rev-append');

//定义一个testRev任务（自定义任务名称）
gulp.task('testRev', function () {
    gulp.src('src/html/index.html') //该任务针对的文件
        .pipe(rev()) //该任务调用的模块
        .pipe(gulp.dest('dist/html'));
});
