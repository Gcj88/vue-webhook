let http = require('http');
let crypto = require('crypto');
let {spawn} = require('child_process');
let SECRET = '123456';
function sign(body){
    return 'sha1='+crypto.createHmac('sha1',SECRET).update(body).digest('hex');
}
let server = http.createServer(function(req,res){
    console.log(req.method,req.url);
    if(req.method == 'POST' && req.url == '/webhook'){
        let buffers = [];
        req.on('data',function(buffer){
            buffers.push(buffer);
        });
        req.on('end',function(buffer){
            let body = Buffer.concat(buffers);
            let event = req.headers['x-github-event'];//event=push
            //git请求过来时既传递请求体body，又传递签名signature，需要验证签名是否正确
            let signature = req.headers['x-hub-signature'];
            if(signature !== sign(body)){
                res.end('Not Allowed!');
            }
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify({ok:true}));
            if(event == 'push'){
                let payload = JSON.parse(body);
                let child = spawn('sh',['./${payload.repositry,name}.sh']);
                let buffers2 = [];
                child.stdout.on('data',function(buffer){
                    buffers2.push(buffer);
                });
                child.stdout.on('end',function(buffer){
                    let logs = Buffer.concat(buffers2);
                    console.log(logs);
                });
            }
        });
       
    }else{
        res.end('Not Found!');
    }
});
server.listen(4000,()=>{
    console.log('webhook服务已经在4000端口启动！')
})