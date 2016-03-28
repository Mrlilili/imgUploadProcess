/**
 * body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
 * cookie-parser - 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
 * multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

/*创建 application/x-www-form-urlencoded 编码解析*/
var urlencodedParser = bodyParser.urlencoded({extended: false})

app.use(express.static('bower_components'));
app.use(express.static('dest/'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "./dest/index.html");
})

app.post('/process_post', urlencodedParser, function (req, res) {
    var imgBase64 = req.body.imgCode;
    var base64Data = imgBase64.replace("data:image/jpeg;base64,", "");
    require("fs").writeFile("out.png", base64Data, 'base64', function (err) {
        console.log(err);
        res.send("上传成功!");
    });
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})