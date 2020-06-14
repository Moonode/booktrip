const db = wx.cloud.database({ env: 'moonode'});
const ex = module.exports;

ex.find = (collection, fields) => {
  return new Promise((resolve, reject) => {
    db.collection(collection).where(fields).get({
      success: (res) => {
        resolve(res.data);
      },
      fail: (res) => {
        reject(res);
      },
    })
  })
}