const jwt = require('jsonwebtoken-promisified');
const appSecret = process.env.APP_SECRET || 'change-me';

module.exports = {
  async sign(user) {
    const payload = user;
    const token = await jwt.signAsync(payload, appSecret, {expiresIn: '14d' });
    return ;
  },

  async verify(token) {
    const verifiedUser = await jwt.verifyAsync(token, appSecret)
    if (verifiedUser) return verifiedUser
    return ({ code: 401, error: 'Authorization Failed' });
  }}

