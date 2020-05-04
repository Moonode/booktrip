// promisify all wx's api
const Promisify = require('./miniprogram-api-promise/src/index');
const wxp = {};
Promisify.promisifyAll(wx, wxp);

module.exports = wxp;
