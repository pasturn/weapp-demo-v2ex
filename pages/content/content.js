var app = getApp()
var webapi = require('../../utils/web_api.js')
var utils = require('../../utils/util.js')

Page({
  data:{
    topic:{
      title: 'V2EX',
      content: ''
    },
    replies: []
  },
  onLoad:function(options){
    var that = this
    console.log(webapi)
    wx.request({
      url: webapi.getTopic({id: options.topicid}),
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        var resData = res.data

        that.setData({
          topic: {
            avatar: resData['0'].member.avatar_normal,
            username: resData['0'].member.username,
            last_modified: utils.kindTime(resData['0'].last_modified),
            title: resData['0'].title,
            content: resData['0'].content,
            node_title: resData['0'].node.title
          },
        })
       }
    })

    wx.request({
      url: webapi.getReplies({topic_id: options.topicid}),
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        var resData = res.data
        console.log(resData)
        that.setData({
          replies: resData.map(function(a){
            return {
              avatar: a.member.avatar_normal,
              username: a.member.username,
              last_modified: utils.kindTime(a.last_modified),
              content: a.content
            }
          })
        })
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})