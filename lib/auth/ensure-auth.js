const tokenService = require('./token-service');
const localStorage = require('./local-storage');

// eslint-disable-next-line
module.exports = function getEnsureAuth() {
    return function ensureAuth(req, res, next) {
        const token = req.get('Authorization');
        if(!token) {
          return localStorage.getToken() ? token: next({ code: 401, error: 'No Authorization Found' });
        }

        tokenService.verify(token)
            .then(payload => {
                req.user = payload;
                next();
            })
            .catch(() => {
                next({ code: 401, error: 'Authorization Failed' });
            });
    };

};
