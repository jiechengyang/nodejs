var express = require('express'),
    http = require('http'),
    events = require('events');
const CLIENT_PORT = 8090; 
let app = express();
// const bodyParser = require('body-parser');
 
// 创建 application/x-www-form-urlencoded 编码解析
// let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(__dirname + '/static'));
 
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
 

 
const server = app.listen(CLIENT_PORT,  () => {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("聊天室，访问地址为 http://%s:%d", host, port)
 
})