const SECRETKEY = 'my_secret_key'
const EXPIRESIN = '5h'
const AUTHSCHEME = 'jwt'
module.exports = {  
    jwtSecret: SECRETKEY,
    jwtSession: {
        session: false
    },
    authScheme: AUTHSCHEME,
    expiresIn: EXPIRESIN
};