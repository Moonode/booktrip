// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database();

const cheerio = require('cheerio');
const request = require('bluebird').promisify(require('request'));
const config = require('./config');
const spider = require('./spider');

/**
 * 解析书籍信息的字符串
 * @param str
 */
function parseInfoString(str) {
    const fields = config.fields;
    let indexArr = Object.keys(fields).map(field => str.indexOf(field));
    indexArr.sort((a, b) => a - b);
    indexArr = indexArr.filter(index => index !== -1);
    const strArr = [];
    indexArr.forEach((val, idx) => {
        if (idx !== indexArr.length) strArr.push(str.slice(val, indexArr[idx + 1]))
    });
    const dataObj = {};
    strArr.forEach(item => {
        const arr = item.split(':');
        dataObj[fields[arr[0]]] = arr[1];
    });
    return dataObj;
}

function parseContentString(str) {
    let contentArr = str.split('\n');
    contentArr = contentArr.filter(item => {
        return item !== '' && item !== '······(收起)';
    });
    return contentArr;
}

async function getBookData(ISBN) {
    const html = await spider.crawl(config.url + `?search_text=${ISBN}`);
    let $ = cheerio.load(html);
    const href = $('#wrapper .item-root a').attr('href');
    const arr = href.split('/');
    const id = arr[arr.length - 2];
    const res = await request({
        url: href
    });
    $ = cheerio.load(res.body);
    const name = $('#wrapper h1 span').text();
    const info = $('#info').text().replace(/[ \n]+/g, '');
    const bookData = parseInfoString(info);
    bookData.name = name;
    const content = $(`#dir_${id}_full`).text().replace(/[ ]+/g, '');
    bookData.content = parseContentString(content);
    bookData.imgUrl = $('#wrapper #mainpic img').attr('src');
    return bookData;
}

async function getBookData_api(ISBN) {
    const res = await request({
        url: 'https://douban.uieee.com/v2/book/isbn/' + ISBN
    });
    const body = JSON.parse(res.body);
    const bookData = {};
    bookData.name = body.title;
    bookData.author = body.author;
    bookData.page = body.pages;
    bookData.isbn = ISBN;
    bookData.imgUrl = body.images.medium.replace('\\', '');
    bookData.category = body.tags[0].name;
    return bookData;
}

// 云函数入口函数
exports.main = async (event, context) => {
    const {
        isbn,
        mode
    } = event;
    const book = (await db.collection('book').where({isbn}).get()).data[0];
    let res;
    if (!book) {
        if (mode === 1) res = await getBookData(isbn);
        else res = await getBookData_api(isbn);
        await db.collection('book').add({data: res});
    } else {
        res = book;
    }
    return res;
}
