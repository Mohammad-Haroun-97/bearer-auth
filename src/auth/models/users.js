'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const API_SECRET = process.env.API_SECRET || 'semba';
// const { Sequelize, DataTypes } = require('sequelize');
const { sequelize, DataTypes } = require('./index');
const { where } = require('sequelize');






const userSchema =  (sequelize, DataTypes) => {

    const model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false, },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username },API_SECRET );
      }
    }
  });


  // userSchema.beforeCreate(async (user) => {
  //   let hashedPass = bcrypt.hash(user.password, 10);
  //   user.password = hashedPass;
  // });

  // Basic AUTH: Validating strings (username, password) 
  model.authenticateBasic = async function (username, password) {
    console.log('username, passwoggggggggrd',username, password);
    const user = await this.findOne({ where:{username} }); 
    console.log('gggggggggggggggg');
    const valid = await bcrypt.compare(password, user.password);
    // if the user is validated, we will create a new token for that user using the jsonwebtokenlibaray
  
    if (valid) {
      let newToken = jwt.sign({ username: user.username }, API_SECRET);
      user.token = newToken;
      return user;
    } else {
      throw new Error('Invalid User');
    }
   
  }

  // Bearer AUTH: Validating a token
  model.authenticateWithToken = async function (token) {
    console.log('goooooodeneh');
    try {
      const parsedToken = jwt.verify(token, process.env.API_SECRET);
      console.log('parsedToken',parsedToken);
      const user = this.findOne({ username: parsedToken.username })
      if (user) { return user; }
      else {throw new Error("User Not Found");}
      
    } catch (e) {
      throw new Error(e.message)
    }
  }
  return model;
  
}

module.exports = userSchema;


// 'use strict';

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// // const { where } = require('sequelize/types');

// const userSchema = (sequelize, DataTypes) => {
//   const model = sequelize.define('User', {
//     username: { type: DataTypes.STRING, allowNull: false, unique: true },
//     password: { type: DataTypes.STRING, allowNull: false, },
//     token: {
//       type: DataTypes.VIRTUAL,
//       get() {
//         return jwt.sign({ username: this.username },
//           process.env.JWT_KEY,
//           {
//             expiresIn: "1h"
//           });
//       }
//     }
//   });

//   model.beforeCreate(async (user) => {
//     let hashedPass = bcrypt.hash(user.password, 10);
//     user.password = hashedPass;
//   });

//   // Basic AUTH: Validating strings (username, password) 
//   model.authenticateBasic = async function (username, password) {
//     console.log('aaaaaaaaaaaaaaa', username, password );
//     const user = await this.findOne({where:{ username: username }})
//     const valid = await bcrypt.compare(password, user.password)
//     console.log('valid', valid);
//     if (valid) { return user; }
//     throw new Error('Invalid User');
//   }

//   // Bearer AUTH: Validating a token
//   model.authenticateToken = async function (token) {
//     try {
//       const parsedToken = jwt.verify(token, process.env.JWT_KEY);
//       const user = await this.findOne({ where:{ username: parsedToken.username }})
//       if (user) { return user; }
//       throw new Error("User Not Found");
//     } catch (e) {
//       throw new Error(e.message)
//     }
//   }
//   return model;
// }

// module.exports = userSchema;