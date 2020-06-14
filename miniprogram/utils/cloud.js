const cloud = wx.cloud;
const ex = module.exports;

ex.callFunction = (name, data) => {
  return new Promise((resolve, reject) => {
    cloud.callFunction({
      name,
      data,
      complete: (res) => {
        console.error(res);
        resolve(res.result);
      }
    })
  })
}

