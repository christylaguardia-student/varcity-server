const jwt = require('jsonwebtoken-promisified');
const appSecret = process.env.APP_SECRET || 'change-me';
const {storeToken, getToken} = require('./local-storage');

module.exports = {
  sign(user) {
    const payload = { id: user._id};
    const token = jwt.signAsync(payload, appSecret, {expiresIn: '14d' });
    storeToken(token);
    return token;
  },
  verify(token) {
    return jwt.verifyAsync(token, appSecret)
    .then(token => {
      return token ? token : getToken()
    })
    .catch ({ code: 401, message: 'Authorization Failed' })
    }
};
