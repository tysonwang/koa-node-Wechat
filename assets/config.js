module.exports = {
    appid: 'wxd78d8d7237d1d84b',
    secret: '57ac56f3e245348712e39e0abca7bf5f',
    token:'asdfasfasdfasdfasdfasdfa123123',
    url: {
        getTokenUrl: 'https://api.weixin.qq.com/cgi-bin/token',
        createMenuUrl: 'https://api.weixin.qq.com/cgi-bin/menu/create',
        ticketUrl: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
        deleteMenuUrl: 'https://api.weixin.qq.com/cgi-bin/menu/delete',
        currentMenuUrl:'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info'
    },
    SQLserver:{
        host:'127.0.0.1',
        username:'root',
        password:'123456',
        database:'koawx'
    }
}