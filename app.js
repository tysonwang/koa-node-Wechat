const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const static = require('koa-static');
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const router = require('koa-router')()
const index = require('./routes/index')
const webview = require('./routes/webview')
const menu = require('./assets/menu');
const {setToken,setTicket,setMenu} =require('./assets/libs');
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(static(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
app.use(async (ctx, next) => {
 if(ctx.url=='favicon.ico'){
   return;
 }
  await setToken(ctx);
  await setMenu(ctx,menu);
  await setTicket(ctx)
  await next();
})
router.use(index)
router.use('/webview',webview)
/**
 * .allowedMethods处理的业务是
 * 当所有路由中间件执行完成之后,
 * 若ctx.status为空或者404的时
 * 候,丰富response对象的header头.
 */
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});
app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
module.exports = app