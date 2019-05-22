module.exports = {
  'button': [{
    "name": "菜单1",
    "type": "click",
    "key": 'key1'
  },
  {
    "name": "菜单2",
    "sub_button":[{
      "type":"view",
      "name":'子菜单1',
      "url":"http://tyson.mynatapp.cc/webview"
    },
    {
      "type":"scancode_push",
      "name":'子菜单2',
      "key":"qrcode"
    }
  ]
  },
  {
    "name": "菜单3",
    "type": "click",
    "key": 'key1'
  }
]
}