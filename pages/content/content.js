var app = getApp()
var webapi = require('../../utils/web_api.js')
var utils = require('../../utils/util.js')

Page({
  data:{
    hidden: false,
    topic:{
      title: 'V2EX',
      content: ''
    },
    errorCount: 0,
    replies: []
  },
  onLoad:function(options){

    this.getTopicData(options.topicid)
    this.getReplyData(options.topicid)
  },

  getTopicData: function(id){
    var that = this
    wx.request({
      url: webapi.getTopic({id: id}),
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
          hidden: true,
        })
       },
       fail: function (err){
        that.setData({
          errorCount:that.data.errorCount + 1
        })
        if(that.data.errorCount < 4){
          setTimeout(that.getData,2000)
        }
      }
    })
  },

  getReplyData: function(id){
    var that = this
    wx.request({
      url: webapi.getReplies({topic_id: id}),
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        var resData = res.data
        that.setData({
          replies: resData.map(function(a){
            return {
              avatar: a.member.avatar_normal,
              username: a.member.username,
              last_modified: utils.kindTime(a.last_modified),
              content: a.content
            }
          }),
          hidden: true,
        })
      },
      fail: function (err){
        that.setData({
          errorCount:that.data.errorCount + 1
        })
        if(that.data.errorCount < 4){
          setTimeout(that.getData,2000)
        }
      }
    })
  }
})