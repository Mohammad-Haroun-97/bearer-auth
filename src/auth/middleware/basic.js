'use strict';

const base64 = require('base-64');
const  {users}  = require('../models/index')

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { next('errrorrrr'); }

  
  console.log('req.headers.authorization',req.headers.authorization);
    let basic = req.headers.authorization.split(" ");
  let encodedString = basic.pop();
  let decodedString = base64.decode(encodedString);
  console.log('decodedString',decodedString);
  let [username, password] = decodedString.split(":");
  console.log('signIn', username, password);
  

  try {
    // console.log('reqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',req);
    req.user = await users.authenticateBasic(username, password)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}


// 'use strict';

// const base64 = require('base-64');
// const { users } = require('../models/index.js')

// module.exports = async (req, res, next) => {
// console.log('++++++++++', req.headers.authorization);
//   if (!req.headers.authorization) { return _authError(); }
 
//   let basic = req.headers.authorization.split(" ");
//   let encodedString = basic.pop();
//   let decodedString = base64.decode(encodedString);
//   let [username, pass] = decodedString.split(":");
//   console.log('signIn', username, pass);

//   try {
//     req.user = await users.authenticateBasic(username, pass)
//     console.log('uuuuuuuuuuuuu',req.user);
//     next();
//   } catch (e) {
//     res.status(403).send('Invalid Login');
//   }

// }
