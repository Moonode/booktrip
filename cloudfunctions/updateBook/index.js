const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  const openid = event.openid;
  const user = await (await db.collection('user').where({openid}).get()).data[0];
  let res;
  const obj = {
    bookInfo: event.bookInfo,
    bookmark: 0,
    completeDate: event.completeDate,
    completeDays: event.completeDays,
    experience: [],
    pattern: event.pattern,
    timePerDay: event.timePerDay,
    totalDay: 0,
    totalTime: 0,
    complete: false,
  }
  if (!user) {
    res = await db.collection('user').add({
      data: {
        openid,
        book: [obj],
        mail: [],
        checkIn: [],
      }
    })
  } else {
    const book = user.book;
    for (let i = 0; i < book.length; i++) {
      if (book[i].bookInfo.isbn === obj.bookInfo.isbn) {
        return {
          errCode: 1,
          errMsg: 'book already exist',
        }
      }
    }
    book.push(obj);
    res = await db.collection('user').where({openid}).update({
      data: {
        book
      }
    });
  }
  return res;
}