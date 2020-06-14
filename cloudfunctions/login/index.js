const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID;
  const res = (await db.collection('user').where({openid}).get()).data[0];
  return {
    openid,
    data: res,
  }
}