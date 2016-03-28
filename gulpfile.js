/**
 * 函数功能简述
 *
 * 具体描述一些细节
 *
 * @param    {string}  address     地址
 * @param    {array}   com         商品数组
 * @param    {string}  pay_status  支付方式
 * @returns  void
 *
 * @date     16/3/12
 * @author   Aaron
 */

var gulp = require('gulp');
var wiredep = require('wiredep').stream;

gulp.task('bower', function () {
    gulp.src('./index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest('./dest'));
});
