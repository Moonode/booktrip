// miniprogram/pages/plan/plan.js
const Datetime = require('../../utils/Datetime');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 3,
    backLock: false,
    percent: 50,
    bookInfo: {},
    completeDate: '',

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
  back() {
    if (this.data.backLock) return;
    this.setData({ backLock: true });
    wx.navigateBack({
      delta: 1,
    });
  },
  bindDateChange(e) {
    const { value } = e.detail;
    this.setData({
      date: value
    })
  }
})