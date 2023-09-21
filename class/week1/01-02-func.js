const { odd, even } = require('./01-02-var');
const mtest = require('./01-02-var');

function checkOddOrEven(num) {
    if (num % 2 == 0) {
        return even;
    }
    else return odd;
}

function checkOddOrEven2(num) {
    if (num %  2 == 0) {
        return mtest.even;
    }
    else return mtest.odd;
}