/**
 * 图片上传压缩剪裁处理
 * @param openImgBtn 选择文件的按钮节点Class
 * @param uploadBtn  上传按钮的节点Class
 * @param canvas     canvas节点的class
 * @returns {ImgCompress} void
 * @constructor
 */
function ImgCompress(openImgBtn, uploadBtn, canvas) {
    this.openImgBtn = $('.' + openImgBtn);
    this.uploadBtn = $('.' + uploadBtn);
    this.canvasDom = $('.' + canvas);
    this.intEvent();//启动任务
}

ImgCompress.prototype = {
    intEvent: function () {//事件绑定操作
        var self = this;
        $(this.openImgBtn).change(function () {//当选择文件按钮发生改变时调用showImg
            self.showImg();
        });
        $(this.uploadBtn).on('click', function () {//上传按钮事件绑定
            self.uploadImg();
        });
    },
    showImg: function () {//上传前本地预览图片
        var self = this;
        var dataURL = URL.createObjectURL(self.openImgBtn.prop('files')[0]);//得到本地预览的URL
        new ImgTouchCanvas({//将图片显示在支持手势canvas中
            canvas: self.canvasDom[0],
            path: dataURL,
            desktop: true
        });
    },
    //获取图片base64Code
    uploadImg: function () {
        var self = this;
        var imgBaseCode = self.canvasDom[0].toDataURL();
        self.uploadEvent(imgBaseCode);

    },
    //图片压缩并上传动作
    uploadEvent: function (imgCode) {
        lrz(imgCode, {quality: 0.7}).then(function (res) {
            $.post('./process_post', {imgCode: res.base64}, function (res) {
                alert(res);
            });
        });
    }
}
