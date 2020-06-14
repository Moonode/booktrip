// miniprogram/pages/checkIn/checkIn.js
const cloud = require('../../utils/cloud');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {},
    page: 0,
    calendar: [],
    num: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    function checkNum(arr, now) {
      let count = 0;
      if (arr.includes(now - 1)) {
        count++;
        count += checkNum(arr, now - 1);
      }
      return count;
    }
    const book = wx.getStorageSync('currentBook');
    this.setData({
      book,
      page: book.bookmark
    });
    const calendar = [];
    const date = new Date;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = new Date(`${month}/1/${year}`).getDay();
    const dayCount = new Date(year, month, 0).getDate();
    const { checkIn } = wx.getStorageSync('userData');
    let num = 0;
    if (checkIn[year] && checkIn[year][month]) {
      const monthArr = checkIn[year][month];      
      num = checkNum(monthArr, day);
    }
    for (let i = 0; i < 35; i++) {
      const cursor = i - weekday + 1;
      const today = (cursor <= 0 || i > dayCount) ? '' : cursor;
      const mode = (day === cursor) ? 2 : 0;
      if (checkIn[year] && checkIn[year][month] && checkIn[year][month].includes(cursor)) mode = 1;
      calendar.push({
        mode,
        day: today,
      })
    }
    this.setData({
      calendar,
      num
    });
  },
  input(e) {
    const page = e.detail.value;
    if (page < this.data.book.bookmark) {
      page = this.data.book.bookmark;
    }
    this.setData({ page });
  },
  async checkIn() {
    const bookmark = this.data.page;
    let experience = wx.getStorageSync('experience');
    if (!experience) experience = [];
    await cloud.callFunction('checkIn', {
      bookmark,
      experience
    });
    const res = await cloud.callFunction('login');
    wx.setStorageSync('userData', res);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    wx.setStorageSync('complete', {
      year, month, day
    });
    wx.switchTab({
      url: '../index/index',
    });
  },
})