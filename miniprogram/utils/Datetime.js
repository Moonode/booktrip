function Datetime(dayOffset, monthOffset, yearOffset) {
    if (typeof dayOffset !== 'number') dayOffset = 0;
    if (typeof monthOffset !== 'number') monthOffset = 0;
    if (typeof yearOffset !== 'number') yearOffset = 0;
    const date = new Date();
    let year = date.getFullYear(date.setFullYear(date.getFullYear() + yearOffset));
    let month = date.getMonth(date.setMonth(date.getMonth() + monthOffset)) + 1;
    let day = date.getDate(date.setDate(date.getDate() + dayOffset));
    this.year = year;
    this.month = month;
    this.year = year;
}

Datetime.prototype._fixZero = function _fixZero(data) {
    return data < 10 ? `0${data}` : `${data}`;
}

Datetime.prototype.getYYYYMMDD = function getYYYYMMDD (dayOffset, monthOffset, yearOffset) {
    if (typeof dayOffset !== 'number') dayOffset = 0;
    if (typeof monthOffset !== 'number') monthOffset = 0;
    if (typeof yearOffset !== 'number') yearOffset = 0;
    const date = new Date();
    let year = date.getFullYear(date.setFullYear(date.getFullYear() + yearOffset));
    let month = date.getMonth(date.setMonth(date.getMonth() + monthOffset)) + 1;
    let day = date.getDate(date.setDate(date.getDate() + dayOffset));
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
}

Datetime.prototype.getDay = function getDay() {
    return this.day;
}

Datetime.prototype.getMonth = function getMonth() {
    return this.month;
}

Datetime.prototype.getYear = function getYear() {
    return this.year;
}
    
module.exports = Datetime;
