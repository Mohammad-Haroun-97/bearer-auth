'use strict';

const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');

const { users } = require('./models/index.js');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')



authRouter.post('/signup', async (req, res, next) => {
  try {
    // console.log(req.body);

    req.body.password= await bcrypt.hash(req.body.password,7)


    console.log(req.body.password);
    
    const userRecord = await users.create(req.body);
    console.log('useeeeeeeeeerRecooord',userRecord);
    const output = {
      user: userRecord,
      // id: userRecord.id,
      token: userRecord.token
    };
    console.log('ouuuuuuuuutpuuuuuuuut',output);
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  console.log('req==================================================================',req);
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  console.log('heloooooooooooooooooooooooooo');
  const allLUsers = await users.findAll({});
  const list = allLUsers.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send("Welcome to the secret area!")
});


module.exports = authRouter;
