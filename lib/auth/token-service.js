const jwt = require('jsonwebtoken-promisified');
const appSecret = process.env.APP_SECRET || 'change-me';

module.exports = {
  async sign(user) {
    // oh dear, you just put the entire user object into the token.
    // ALL the user data. edu, media, info.
    // You need to change this ASAP
    const payload = {user};
    const token = await jwt.signAsync(payload, appSecret, {expiresIn: '14d' });
    user.auth = token
    return ({user, token});
  },
  async verify(token) {
    const verifiedUser = await jwt.verifyAsync(token, appSecret)
    if (verifiedUser) return verifiedUser;
    return ({ code: 401, error: 'Authorization Failed' });
  }}

