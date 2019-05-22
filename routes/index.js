const router = require('koa-router')()
const rawbody = require('raw-body');
const {
  parsexml,
  formatMessage
} = require('../assets/xml2js');
const crypto = require('crypto');
const {
  cpl
} = require('../assets/tpl');
// let {promisePool} = require('../modules/DB');
let {promisePool} = require('../modules/MD');


router.get('/', async (ctx, next) => {
  let signature = ctx.query.signature,
  timestamp = ctx.query.timestamp,
  nonce = ctx.query.nonce,
  echostr = ctx.query.echostr;  
 let array = ['asdfasfasdfasdfasdfasdfa123123', timestamp, nonce]; 

array.sort(); //按照字典进行排序
let tempStr = array.join('');
let hashCode = crypto.createHash('sha1');
let resultCode = hashCode.update(tempStr, 'utf8').digest('hex');
  if (resultCode == signature) {  
    ctx.state.status = 1
    ctx.state.echostr = ctx.query.echostr
    ctx.body = ctx.state.echostr
  } else {
    ctx.state.status = 0
    ctx.body = 'error'
  }
})

router.post('/', async (ctx, next) => {
  //此处可以通过ctx.query.openid 存储用户的openid
  let data = await rawbody(ctx.req, {
    length: ctx.req.length,
    limit: '1mb',
    encoding: ctx.req.charset
  })
  ctx.state.data = data;
  let result = await parsexml(ctx.state.data.toString());
  let message = formatMessage(result.xml);

  if (message.MsgType == 'event') {
    if (message.Event == 'subscribe') {
      let content = '欢迎您使用老王的私有公众号！';
      let sendMessage = cpl(content, message);
      ctx.set('Content-Type', 'application/xml');
      ctx.body = sendMessage;
    } else if (message.Event == 'unsubscribe') {
      ctx.body = ''
    } else if (message.Event == 'LOCATION') {
      let content = message.Latitude + ' / ' + message.Longitude + '' + message.Precision;
      let sendMessage = cpl(content, message);
      ctx.set('Content-Type', 'application/xml');
      ctx.body = sendMessage;
    } else if (message.Event == 'CLICK') {
      let content = message.EventKey;
      let sendMessage = cpl(content, message);
      ctx.set('Content-Type', 'application/xml');
      ctx.body = sendMessage;
    } else if (message.Event == 'SCAN') {
      let content = message.EventKey + '-' + message.Ticket;
      let sendMessage = cpl(content, message);
      ctx.set('Content-Type', 'application/xml');
      ctx.body = sendMessage;
    } else if (message.Event = 'VIEW') {
      let content = '您点击了 ' + message.EventKey;
      let sendMessage = cpl(content, message);
      ctx.set('Content-Type', 'application/xml');
      ctx.body = sendMessage;
    }
  } else if (message.MsgType == 'text') {
    let con = message.Content
    ctx.set('Content-Type', 'application/xml');
    if (con == '1') {
      let content = '1' + con;
      let sendMessage = cpl(content, message);
      ctx.body = sendMessage
    } else if (con == "2") {
      let content = '2' + con;
      let sendMessage = cpl(content, message);
      ctx.body = sendMessage
    } else if (con == "3") {
      let content = '3' + con;
      let sendMessage = cpl(content, message);
      ctx.body = sendMessage
    } else if (con == '4') {
      let content = [{
        title: '技术改变世界',
        description: 'this is a girl',
        picUrl: 'http://imgsrc.baidu.com/imgad/pic/item/d50735fae6cd7b8940b8f3a1052442a7d9330e38.jpg',
        url: 'http://www.baidu.com'
      },
      {
        title: '技术改变世界',
        description: 'this is a girl',
        picUrl: 'http://imgsrc.baidu.com/imgad/pic/item/d50735fae6cd7b8940b8f3a1052442a7d9330e38.jpg',
        url: 'http://www.baidu.com'
      }]
      let sendMessage = cpl(content, message);
      ctx.body = sendMessage   
    }
  }
})
module.exports = router.routes()