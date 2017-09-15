const jwt = require('jsonwebtoken-promisified');
const appSecret = process.env.APP_SECRET || 'change-me';
const localStorage = require('./local-storage');

module.exports = {
  sign(user) {
    const payload = { id: user._id };
    const token = jwt.signAsync(payload, appSecret);
    localStorage.storeToken(token);
    return token;
  },
  verify(token) {
    return (jwt.verifyAsync(token, appSecret) || localStorage.getToken()) ? token : { code: 401, error: 'Authorization Failed' };
  }
};
