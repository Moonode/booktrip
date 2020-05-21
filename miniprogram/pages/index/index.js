// miniprogram/pages/index/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: 30,
    bookmark: 0,
    name: '《A杖刷新大》',
    bookImgUrl: '',
    duration: 30,
    currentProgress: 18,
    totalProgress: 180,
    newMessage: false,
    logined: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  importBook() {
    wx.navigateTo({
      url: '../plan/plan',
    })
  },
})