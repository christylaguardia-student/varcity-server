module.exports = function getRedirectHttp() {
  return function redirectHttp(req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'https') next();
    else res.redirect(`https://${req.hostname}${req.url}`);
  };
};