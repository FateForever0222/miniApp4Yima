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

app.all('/phone',(req,res)=>{
  var code=req.headers.code
  let url=`https://api.weixin.qq.com/wxa/business/getuserphonenumber?code=${code}`
  var body
  let req_wx=new Promise((resolve, reject) => {
    request({
      method: 'POST',
      // url: 'http://api.weixin.qq.com/wxa/msg_sec_check?access_token=TOKEN',
      url: url, // 这里就是少了一个token
    },function (error, response) {
      console.log('接口返回内容', response.body)
      body=resolve(JSON.parse(response.body))
    })
  })
  res.send({
    ip: ip.address(),
    headers: req.headers,
    body:body
  })
})

const port = process.env.PORT || 80

app.listen(port, () => {
  console.log('启动成功', port)
})
