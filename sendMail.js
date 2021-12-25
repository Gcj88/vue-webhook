const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    // host: 'emtp.ethereal.email',
    service: 'qq', // 使用内置传输 查看：https:nodemailer.com/smtp/well-known/
    port: 465, //smtp 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: '775288788@qq.com',
        // 这里的密码不是qq密码，是你设置的smtp授权码
        pass: 'zaoawjkpzqflbdji',
    }
});
function sendMail(message){
    let mailOptions = {
        from: '"775288788" <775288788@qq.com>', // 发送地址
        to: '775288788@qq.com', // 接收者
        subject: '部署通知', // 主题
        html: message // 内容主体
    };
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            return console.log(error);
        }
        console.log('Message sent: %s',info.messageId);
    });
}
module.exports = sendMail;