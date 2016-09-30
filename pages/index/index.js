//index.js
//获取应用实例
var app = getApp()
var webapi = require('../../utils/web_api.js')
var utils = require('../../utils/util.js')

Page({
  data: {
    list:[],
    hidden: false
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    wx.request({
      url: webapi.getHotTopic(),
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        var resData = res.data

        that.setData({
          list: resData.map(function(a){
            return {
              avatar_normal: a.member.avatar_normal,
              username: a.member.username,
              node_title: a.node.title,
              last_modified: utils.kindTime(a.last_modified),
              replies: a.replies,
              title: a.title,
              topicid: a.id
            }
          }),
          hidden: true
        })
      }
    })
  },
  bindViewTap: function(e) {
    var topicid = e.currentTarget.dataset.topicid;
    wx.navigateTo({
      url: `../content/content?topicid=${topicid}`
    })
  },
})
