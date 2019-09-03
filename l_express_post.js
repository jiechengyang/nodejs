// POST 方法
// 以下实例演示了在表单中通过 POST 方法提交两个参数，我们可以使用 server.js 文件内的 process_post 路由器来处理输入：
const express = require('express');
let app = express();
const bodyParser = require('body-parser');
 
// 创建 application/x-www-form-urlencoded 编码解析
let urlencodedParser = bodyParser.urlencoded({ extended: false })
 
app.use(express.static('./static'));
 
app.get('/post.html', function (req, res) {
   res.sendFile( __dirname + "/" + "post.html" );
})
 
app.post('/process_post', urlencodedParser, (req, res)  => {
   // 输出 JSON 格式
   let response = {
       "first_name":req.body.first_name,
       "last_name":req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})
 
const server = app.listen(8081,  () => {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%d", host, port)
 
})