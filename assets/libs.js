const rp = require('request-promise');
const fs = require('fs');
const path = require('path');
const {appid,secret,url} = require('./config');
_createMenu = async (token,menu) => {
  uri = `${url.createMenuUrl}?access_token=${token}`;
  let options = {
    method: 'POST', //post
    uri,
    body: {
      ...menu
    },
    json: true
  };
  return await rp(options);
}


_getTicket = async (token) => {
  console.log('token',token)
  let options = {
    uri: url.ticketUrl,
    qs: {
      access_token: token,
      type: 'jsapi',
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
  return await rp(options);
}

_getToken = async () => {
  console.log("appid",appid);
  console.log("secert",secret);
  console.log("secret",url.getTokenUrl);
  let options = {
    uri:url.getTokenUrl,
    qs: {
      grant_type: 'client_credential',
      appid,
      secret,
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
  return await rp(options);
}
_deleteMenu = async (token) => {
  let options = { //get
    uri: url.deleteMenuUrl,
    qs: {
      access_token: token
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  }
  return await rp(options);
}
setTicket = async (ctx) => {
    let ticket = JSON.parse(fs.readFileSync(__dirname+"/ticket.json", 'utf-8')); //这里的票据 建议存入redis
  if (!ticket.ticket || ticket.expires_ticket_time <= new Date().getTime()) {
    let status = await _getTicket(ctx.state.access_token)
    let params = {
      "ticket": status.ticket,
      "expires_ticket_time": new Date().getTime() + 60 * 50 * 2 * 1000
    }
    fs.writeFileSync(__dirname+"/ticket.json", JSON.stringify(params));
    ctx.state.ticket = params.ticket;
    ctx.state.expires_ticket_time = params.expires_ticket_time;
  } else {
    ctx.state.ticket = ticket.ticket;
    ctx.state.expires_ticket_time = ticket.expires_ticket_time;
  }
} 
setToken = async (ctx)=>{
  let accesstoken = JSON.parse(fs.readFileSync(__dirname+"/accesstoken.json", 'utf-8')); //这里的数据建议存入redis
  console.log('acccesstoken',accesstoken);
  if (!accesstoken.access_token || accesstoken.expires_time <= new Date().getTime()) { //设置更新access_token
    let status = await _getToken();
    console.log('status',status);
    console.log('new Date().getTime()',new Date().getTime())
      let params = { 
        "access_token": status.access_token,
        "expires_time": new Date().getTime() + 60 * 50 * 2 * 1000
      }
      console.log('asdfasdfasdfasdfasfd',JSON.stringify(params));
      fs.writeFileSync(__dirname + "/accesstoken.json", JSON.stringify(params));

      ctx.state.access_token = params.access_token;
      ctx.state.expires_time = params.expires_time;
  }else{
    ctx.state = {
      access_token:accesstoken.access_token,
      expires_time:accesstoken.expires_time
    }
   

  }
}
setMenu = async (ctx,menu)=>{
  let status =  await _deleteMenu(ctx.state.access_token);
  if(status.errcode==0){
     await _createMenu(ctx.state.access_token,menu);
  }else{
    ctx.body='error';
  }
}

//TODO:
_getCurrentMenu = async () =>{
  let options = {//get
    uri: url.currentMenuUrl,
    qs: {
        access_token: token
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
  }
  return await rp(options);  
}



module.exports = {
  setToken,//设置token
  setMenu,//设置菜单
  setTicket,//设置票据
}