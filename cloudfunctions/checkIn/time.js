function time() {}

time.parseStr = function parseStr(str) {
    const minidx = str.indexOf('min');
    const houridx = str.indexOf('hour');
    const data = {
        hour: 0,
        minute: 0
    }
    if (minidx === -1) {
        if (houridx !== -1) {
            data.hour = parseInt(str.slice(0, houridx));
            
        }
    } else if (houridx === -1) {
        if (minidx !== -1) {
            data.minute = parseInt(str.slice(0, minidx));
        }
    } else {
        data.hour = parseInt(str.slice(0, houridx));
        data.minute = parseInt(str.slice(houridx, minidx));
    }
    data.totalHour = data.hour + data.minute / 60;
    data.totalMinute = data.hour * 60 + data.minute;
    data.totalSecond = data.hour * 3600 + data.minute * 60;    
    return data;
}

module.exports = time;