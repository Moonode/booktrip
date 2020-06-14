//Page Object
const time = require('../../utils/time');

Page({
  data: {
    secondStr: '00',
    minuteStr: '00',
    minute: 0,
    second: 0,
    goalMin: 0,
    goalHour: 0,
    totalSecond: 0,
    book: {},
    pause: true,
    step: 0,
    complete: false,
    active: false,
    top: 0,
    experience: [],
    value: '',
    page: 0,
  },
  onLoad: function (options) {
    const book = wx.getStorageSync('currentBook');
    const timeInfo = time.parseStr(book.timePerDay);
    this.setData({
      book,
      goalMin: timeInfo.minute,
      goalHour: timeInfo.hour,
      totalSecond: timeInfo.totalSecond,
    });
  },
  onReady: function () {
    this.drawProgressbg();
    this.drawCircle(0);
  },
  onShow: function () {

  },
  drawProgressbg: function () {
    var ctx = wx.createCanvasContext('progress-bg')
    ctx.setLineWidth(4); // 设置圆环的宽度
    ctx.setStrokeStyle('#e8e5e0'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath(); //开始一个新的路径
    ctx.arc(128, 128, 125, 0, 2 * Math.PI, false);
    //设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke(); //对当前路径进行描边
    ctx.draw();
  },
  drawCircle(step) {
    var ctx = wx.createCanvasContext('progress')
    ctx.setLineWidth(4); // 设置圆环的宽度
    ctx.setStrokeStyle('#707070'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.beginPath(); //开始一个新的路径
    ctx.arc(128, 128, 125, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
    ctx.stroke();
    ctx.draw();
  },
  pause() {
    const {
      pause
    } = this.data;
    if (pause) {
      this.interval = setInterval(this.engine, 0.2);
    } else {
      clearInterval(this.interval);
    }
    this.setData({
      pause: !pause
    })
  },
  engine() {    
    let {
      minute,
      second,
      minuteStr,
      secondStr,
      step,
      goalMin,
      goalHour,
      totalSecond
    } = this.data;
  
    if (minute === this.data.goalMin + this.data.goalHour * 60) {
      this.complete();
      this.setData({ complete: true });
      return;
    }
    second++;
    if (second === 60) {
      second = 0;
      minute++;
    }
    if (second < 10) secondStr = `0${second.toString()}`;
    else secondStr = second.toString();
    if (minute < 10) minuteStr = `0${minute.toString()}`;
    else minuteStr = minute.toString();
    step = (minute * 60 + second) / totalSecond * 2;
    this.drawCircle(step);
    this.setData({
      minute,
      second,
      minuteStr,
      secondStr,
      step
    });
  },
  complete() {
    clearInterval(this.interval);
    wx.setStorageSync('experience', this.data.experience);
    wx.navigateTo({
      url: '../checkIn/checkIn',
    });
  },
  back() {
    wx.navigateBack({
      delta: 1
    });
  },
  touchstart(e) {
    const top = e.changedTouches[0].pageY;
    this.setData({ top });
  },
  touchend(e) {
    const top = e.changedTouches[0].pageY;
    if (top < this.data.top) {
      this.setData({ active: true });
      this.up();
    } else {
      this.setData({
        active: false
      });
      this.down();
    }
  },
  up() {
    
  },
  down() {
    const {
      page,
      value
    } = this.data;
    if (page <= this.data.book.bookmark) return;
    const { experience } = this.data;
    experience.push({
      page,
      detail: value
    }),
    this.setData({
      experience,
      value: '',
      page: 0
    })
  },
  pageInput(e) {
    const page = e.detail.value;
    this.setData({ page });
  },
  textareaInput(e) {
    const value = e.detail.value;
    this.setData({
      value
    });
  }
});