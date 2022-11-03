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
  // let url=`https://api.weixin.qq.com/wxa/business/getuserphonenumber?code=${code}`
  // let req_wx=http.request(url,function(res))
  res.send({
    headers: req.headers
  })
})

const port = process.env.PORT || 80

app.listen(port, () => {
  console.log('启动成功', port)
})
