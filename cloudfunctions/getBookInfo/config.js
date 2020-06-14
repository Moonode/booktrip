const e = module.exports;

e.url = 'https://search.douban.com/book/subject_search';
e.apiUrl = 'https://douban.uieee.com/v2/book/isbn/';

e.allFields = {
    '作者': {
        'alias': 'author',
        'formal': 'author',
        'type': 'Array'
    },
    '原作名': {
        'alias': 'originalTitle',
        'formal': 'original_title',
        'type': 'String'
    },
    '出版社': {
        'alias': 'publishingHouse',
        'formal': ''
    },
    '副标题': 'subtitle',
    '译者': 'translator',
    '出版年': 'publishTime',
    '页数': 'pages',
    '定价': 'price',
    '装帧': 'binding',
    '丛书': 'series',
    'ISBN': 'ISBN',
};

e.fields = ['作者', '译者', '页数', '出版社', '出版年', 'ISBN'];

