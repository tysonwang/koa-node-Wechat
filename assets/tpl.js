const ejs = require('ejs');
const heredoc = require('heredoc');
var template = heredoc(() => {
  /*
  <xml>
    <ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
    <FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
    <CreateTime><%= createTime %></CreateTime>
    <MsgType><![CDATA[<%= msgType %>]]></MsgType>

    <% if(msgType=='text'){ %>
      <Content><![CDATA[<%= content %>]]></Content>
    
    <% }else if(msgType=='image'){ %>
        <Image>
          <MediaId><![CDATA[<%= content.media_id %>]]></MediaId>
        </Image>

    <% }else if(msgType=='voice'){ %>
        <Voice>
          <MediaId><![CDATA[<%= content.media_id %>]]></MediaId>
        </Voice>
    <% }else if(msgType=='video'){ %>
    <Video>
        <MediaId><![CDATA[<%= content.media_id %>]]></MediaId>
        <Title><![CDATA[<%= content.title %>]]></Title>
        <Description><![CDATA[<%= content.description %>]]></Description>
    </Video> 

    <% }else if(msgType=='music'){ %>
        <Music>
            <Title><![CDATA[<%= content.TITLE %>]]></Title>
            <Description><![CDATA[<%= content.DESCRIPTION %>]]></Description>
            <MusicUrl><![CDATA[<%= content.musicUrl %>]]></MusicUrl>
            <HQMusicUrl><![CDATA[<%= content.hqMusicUrl %>]]></HQMusicUrl>
            <ThumbMediaId><![CDATA[<%= content.thumbMediaId %>]]></ThumbMediaId>
        </Music>
    <% }else if (msgType === 'news'){ %>
    <ArticleCount><%= content.length %></ArticleCount>
            <Articles>
            <% content.forEach(function(item){ %>
                <item>
                    <Title><![CDATA[<%= item.title %>]]></Title> 
                    <Description><![CDATA[<%= item.description %>]]></Description>
                    <PicUrl><![CDATA[<%= item.picUrl %>]]></PicUrl>
                    <Url><![CDATA[<%= item.url %>]]></Url>
                </item>
            <% }) %>
            </Articles> 
    <%}%>
  </xml>
  */

})
let complied = ejs.compile(template);
exports.cpl = (content, message) => {
  var info = {}
  var type = 'text';
  var FromUserName = message.FromUserName;
  var toUserName = message.ToUserName;
  if (Array.isArray(content)) {
    type = 'news'
  }

  type = content.type || type
  info.content = content;
  info.createTime = new Date().getTime();
  info.msgType = type
  info.toUserName = FromUserName
  info.fromUserName = toUserName
  return complied(info);
}