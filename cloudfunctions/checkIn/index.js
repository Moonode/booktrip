// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const time = require('./time');

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    bookmark, 
    experience,
  } = event;
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const user = (await db.collection('user').where({openid}).get()).data[0];
  const idx = user.book.findIndex(val => val.reading);
  const book = user.book[idx];
  book.experience = experience;
  book.bookmark = bookmark;
  const {
    timePerDay
  } = book;
  const timeInfo = time.parseStr(timePerDay);
  book.totalTime += timeInfo.hour * 60 + timeInfo.minute;
  book.totalDay++;
  user.book[idx] = book;
  const checkIn = user.checkIn;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if (!checkIn[year]) checkIn[year] = {};
  if (!checkIn[year][month]) checkIn[year][month] = [];
  if (checkIn[year][month].includes(day)) {
    return {
      errCode: 1,
      errMessage: 'duplicated checkIn'
    }
  }
  checkIn[year][month].push(day);
  if (book.bookInfo.page <= book.bookmark) {
    user.book.complete = true;
  }
  const res = await db.collection('user').where({openid}).update({
    data: {
      checkIn,
      book: user.book
    }
  })
  return {
    ...res
  }
}