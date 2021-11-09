'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {
    console.log(req.headers);
    console.log('req.headers.authorization=========',await req.headers.authorization);

    if (!req.headers.authorization) { next('Invahhhhhhhhhhhlid Login') }

    const token =  req.headers.authorization.split(' ').pop();
    console.log('tooooooooooken',token);
    const validUser = await users.authenticateWithToken(token);

    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    res.status(403).send('Invalifffffffd Login');
  }
}

// 'use strict';

// const { users } = require('../models/index.js');

// module.exports = async (req, res, next) => {

//   try {

//     if (!req.headers.authorization) { next('Invalid Login') }

//     const token = req.headers.authorization.split(' ').pop();
//     const validUser = await users.authenticateToken(token);

//     req.user = validUser;
//     req.token = validUser.token;
//     next();

//   } catch (e) {
//     res.status(403).send('Invalid Login');;
//   }
// }