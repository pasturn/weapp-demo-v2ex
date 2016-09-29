var app = getApp()

Page({
  data:{
    title: 'V2EX',
    content: ''
  },
  onLoad:function(options){
    this.setData({
      title: options.title,
      content: options.content
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