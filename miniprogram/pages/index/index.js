// miniprogram/pages/index/index.js
const cloud = require('../../utils/cloud');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: 30,
    bookmark: 0,
    name: '《A杖刷新大》',
    book: {},
    imgUrl: '',
    duration: 30,
    currentProgress: 18,
    totalProgress: 180,
    newMessage: false,
    logined: false,
    empty: true,
    avatarUrl: '',
    complete: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        logined: true,
        avatarUrl: userInfo.avatarUrl
      });
    }
    const res = await cloud.callFunction('login');
    if (res.data) {
      wx.setStorageSync('userData', res.data);
      const idx = res.data.book.findIndex(val => (val.reading && !val.complete) );
      wx.setStorageSync('currentBook', res.data.book[idx]);
      this.setData({
        empty: false,
        book: res.data.book[idx],
      });
    }
    wx.setStorageSync('openid', res.openid);
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
    const complete = wx.getStorageSync('complete');
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (complete.year == year && complete.month == month && complete.day == day) {
      this.setData({ complete: true });
    } 
  },
  importBook() {
    wx.navigateTo({
      url: '../plan/plan',
    })
  },
  getUserInfo(e) {
    const userInfo = e.detail.userInfo;
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      logined: true,
    })
    wx.setStorageSync('userInfo', userInfo);
  },
  startTap() {
    if (this.data.complete) {
      wx.showToast({
        title: '阅读已完成啦！',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
      return;
    }
    wx.navigateTo({
      url: '../reading/reading',
    });
  }
})