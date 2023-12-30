function generateOtp() {
    var minm = 10000;
    var maxm = 99999;
    // console.log(Math.floor(Math.random() * (maxm - minm + 1)) + minm);
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    
}


module.exports = generateOtp;