//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')

Page({
  data: {
    list:[],
    hidden: false
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    wx.request({
      url: 'https://www.v2ex.com/api/topics/latest.json',
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
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
              content: a.content
            }
          }),
          hidden: true
        })
      }
    })
  },
  bindViewTap: function(e) {
    var title = e.currentTarget.dataset.title;
    var content = e.currentTarget.dataset.content
    wx.navigateTo({
      url: `../content/content?title=${title}&content=${content}`
    })
  },
})
