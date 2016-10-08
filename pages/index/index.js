//index.js
//获取应用实例
var app = getApp()
var webapi = require('../../utils/web_api.js')
var utils = require('../../utils/util.js')

Page({
  data: {
    list:[],
    hidden: false,
    errorCount: 0,
    template: 'latest'
  },
  onLoad: function () {
    this.getData('getLatestTopic')
  },

  getData: function (request, cb) {
    var that = this
    wx.request({
      url: webapi[request](),
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
          hidden: true,
          errorCount: 0
        })
        if(cb && typeof cb === 'function'){
          cb()
        }
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

  switchTab: function (e) {
    var that = this
    var currentTarget = e.currentTarget.id;
    if( currentTarget === 'latest' && this.data.template !== 'latest'){
      this.setData({
        hidden:false
      })
      this.getData('getLatestTopic',function(){
        that.setData({
          hidden:true,
          template:'latest'
        })
      })
      
    }else if(currentTarget === 'hot' && this.data.template !== 'hot'){
      this.setData({
        hidden:false
      })
      this.getData('getHotTopic',function(){
        that.setData({
          hidden:true,
          template:'hot'
        })
      })
    }
  },

  bindViewTap: function(e) {
    var topicid = e.currentTarget.dataset.topicid;
    wx.navigateTo({
      url: `../content/content?topicid=${topicid}`
    })
  },
})
