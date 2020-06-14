// miniprogram/pages/plan/plan.js
const Datetime = require('../../utils/Datetime');
const cloud = require('../../utils/cloud');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 1,
    backLock: false,
    scanLock: false,
    bookInfo: {},
    completeDate: '',
    timePerDayChoices: [
      '15min', '30min', '45min', '1h', '2h', '3h', '4h',
    ],
    completeDaysChoices: [
      '1个月', '2个月', '3个月', '4个月', '5个月', '6个月'
    ],
    patternChoices: ['精读', '粗读'],
    remindTime: '12:00',
    pattern: '精读',
    timePerDay: '45min',
    completeDays: '2个月'
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
    this.setData({
      backLock: true
    });
    wx.navigateBack({
      delta: 1,
    });
  },
  bindDateChange(e) {
    const {
      value
    } = e.detail;
    this.setData({
      date: value
    })
  },
  async scanCode(e) {
    if (e.detail.type !== 'barcode') return;
    if (this.data.scanLock) return;
    this.setData({
      scanLock: true
    });
    const isbn = e.detail.result;
    const isbnNum = parseInt(isbn);
    if (!isbnNum) return;
    const res = await cloud.callFunction('getBookInfo', {
      isbn
    });
    if (!res || !res.name) {
      wx.showToast({
        title: '识别失败~再试试吧',
        icon: 'none',
        duration: 1500,
        success: () => {}
      });
    } else {
      this.setData({
        bookInfo: res,
        step: 2,
      })
    }
    this.setData({
      scanLock: false
    });
  },
  s2tos3() {
    this.setData({
      step: 3
    });
  },
  remindTimeChange(e) {
    const remindTime = e.detail.value;
    this.setData({
      remindTime
    });
  },
  patternChange(e) {
    const pattern = e.detail.value;
    this.setData({
      pattern: this.data.patternChoices[pattern]
    });
  },
  timePerDayChange(e) {
    const timePerDay = e.detail.value;
    this.setData({
      timePerDay
    });
  },
  completeDaysChange(e) {
    const completeDays = e.detail.value;
    this.setData({
      completeDays
    });
  },
  async completeTap() {
    const openid = wx.getStorageSync('openid');
    const res = await cloud.callFunction('updateBook', {
      openid,
      bookInfo: this.data.bookInfo,
      completeDate: this.data.completeDate,
      completeDays: this.data.completeDays,
      pattern: this.data.pattern,
      timePerDay: this.data.timePerDay,
      reading: false,
    });
    if (res.errCode = 1) {
      wx.showToast({
        title: '这本书已经有啦',
        icon: 'none',
        duration: 2000,
        success: (result)=>{
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          }, 2000);
        },
      });
    }
  }
})