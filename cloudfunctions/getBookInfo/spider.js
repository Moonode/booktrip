const phantom = require('phantom');

module.exports.crawl = async function (url) {
    const instance = await phantom.create([
        '--local-url-access=false',
        '--load-images=false',
        '--disk-cache=true',
        '--ignore-ssl-errors=true',
    ]);
    const page = await instance.createPage();
    await page.on('onResourceRequested', function(requestData) {
        console.info('Requesting', requestData.url);
    });
    const status = await page.open(url);
    let content = await page.property('content');
    if (status !== 'success') content = '';
    await instance.exit();
    return content;
};
