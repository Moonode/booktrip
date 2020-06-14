
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unfinished: [

    ],
    finished: [
      
    ],
    bookInfo: {
      name: '吹推绿隐跳',
      author: '浪比',
      page: 522,
      category: '教学',
      totalTime: '',
      totalDay: 0,
      timePerDay: '',
      pattern: '精读',
      experience: {
        number: 2,
        detail: [
          {
            page: 1,
            detail: '这什么垃圾书，烧掉！'
          },
          {
            page: 3,
            detail: '滚犊子！'
          }
        ],
      }
    },
    book: {},
    allBook: {},
    experience: [],
    mode: 0,
    empty: false,
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
    const userData = wx.getStorageSync('userData');
    const book = userData.book;
    const experience = userData.experience;
    const finished = [];
    const unfinished = [];
    book.forEach(element => {      
      if (element.complete) finished.push(element);
      else unfinished.push(element);
    });
    if (!finished[0] && !unfinished[0]) {
      this.setData({ empty: true });
    }
    this.setData({
      allBook: book,
      experience,
      finished,
      unfinished
    });

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tapItem(e) {
    const book = e.detail.item;
    this.setData({
      book,
      mode: 1,
    });
  },
  back() {
    this.setData({ mode: 0 });
  }
})