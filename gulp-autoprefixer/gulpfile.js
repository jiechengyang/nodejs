var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('testAutoFx', function () {
    return gulp.src('src/css/index.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('dist/css'));
});