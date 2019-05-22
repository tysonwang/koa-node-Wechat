const router = require('koa-router')()
const crypto = require('crypto');
let createNonce = () => {
  return Math.random().toString(36).substr(2, 15)
}
let createTimeStamp = () => {
  return parseInt(new Date().getTime() / 1000, 10) + '';
}
let sign = (ticket, url) => {
  let nonceStr = createNonce();
  let timestamp = createTimeStamp();
  let signature = _sign(nonceStr, ticket, timestamp, url)
  return {
    nonceStr,
    timestamp,
    signature 
  }
}

let _sign = (nonceStr, ticket, timestamp, url) => {
  let params = [
    'noncestr='+nonceStr,
    'jsapi_ticket='+ticket,
    'timestamp='+timestamp,
    "url="+url
]
console.log('params',params);
let str= params.sort().join('&');
console.log("str",str);
let shasum = crypto.createHash('sha1');
return  shasum.update(str).digest('hex');
}

router.get('/',async(ctx,next)=>{
  let status = sign(ctx.state.ticket,ctx.href);
  console.log("status",status);
    await ctx.render('index', {
    title: 'web view',
    node:0,
    ...status
  })
})
module.exports = router.routes()