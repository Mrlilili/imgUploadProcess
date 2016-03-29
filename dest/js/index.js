/**
 *
 * @param openImgBtn
 * @param uploadBtn
 * @param canvas
 * @returns {ImgCompress}
 * @constructor
 */
var globalImgCompress;
function ImgCompress(openImgBtn, uploadBtn, canvas) {
    if (!(this instanceof ImgCompress)) {
        return new ImgCompress(openImgBtn, uploadBtn, canvas);
    }
    globalImgCompress = this;
    this.openImgBtn = $('.' + openImgBtn);
    this.uploadBtn = $('.' + uploadBtn);
    this.canvasDom = $('.' + canvas);
    this.intEvent();
}

ImgCompress.prototype = {
    //事件绑定
    intEvent: function () {
        var self = this;
        $(this.openImgBtn).change(self.showImg);
        $(this.uploadBtn).on('click', self.uploadImg);
    },
    //得到上传前本地预览的地址
    showImg: function () {
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL = windowURL.createObjectURL(fileObj.files[0]);
        new ImgTouchCanvas({
            canvas: globalImgCompress.canvasDom[0],
            path: dataURL,
            desktop: true
        });
    },
    //获取图片base64Code
    uploadImg: function () {
        var imgBaseCode = globalImgCompress.canvasDom[0].toDataURL();
        globalImgCompress.uploadEvent(imgBaseCode);

    },
    //图片进行压缩并上传
    uploadEvent: function (imgCode) {
        lrz(imgCode, {quality: 0.7}).then(function (res) {
            $.post('./process_post', {imgCode: res.base64}, function (res) {
                alert(res);
            });
        });
    }
}