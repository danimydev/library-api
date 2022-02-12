const  { createHmac } = require('crypto');

function md5(object, algorithm = 'md5') {
    const hmac = createHmac(algorithm, 'secrect_key');
    hmac.update(JSON.stringify(object));
    return hmac.digest('hex');
}

module.exports = {
    md5,
}