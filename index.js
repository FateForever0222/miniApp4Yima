const express = require('express')
const ip = require('ip')
const app = express()
const request =require('request')
app.use(express.json())

app.all('/', (req, res) => {
  res.send({
    ip: ip.address(),
    headers: req.headers,
    test:req.data,
    env: process.env
  })
})

app.post('/phone', (req, res) => {
  // 拼接 Header 中的 x-wx-openid 到接口中
  const api = `http://api.weixin.qq.com/wxa/business/getuserphonenumber?code=${req.headers['code']}`;
  request(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }, (err, resp, body) => {
    try {
      const data = JSON.parse(body).phone_info; // 从回包中获取手机号信息
      const phone = JSON.parse(data.json).purePhoneNumber;
      // 将手机号发送回客户端，此处仅供示例
      // 实际场景中应对手机号进行打码处理，或仅在后端保存使用
      res.send(phone);
    } catch (error) {
      res.send('get phone failed');
    }
  });
});

const port = process.env.PORT || 80

app.listen(port, () => {
  console.log('启动成功', port)
})
