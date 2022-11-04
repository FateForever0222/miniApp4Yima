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
  const api = `http://api.weixin.qq.com/wxa/getopendata?openid=${req.headers['x-wx-from-openid']}`;
  request(api, {
    method: 'POST',
    body: JSON.stringify({
      cloudid_list: [req.body.cloudid], // 传入需要换取的 CloudID
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }, (err, resp, body) => {
    try {
      const data = JSON.parse(body).data_list[0]; // 从回包中获取手机号信息
      const phone = JSON.parse(data.json).data.phoneNumber;
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
