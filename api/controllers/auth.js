'use strict';

const db = require('../../database');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');
const Users = require('../../database').users;

// Create a token for the user
function generate_token (user) {
  const payload = {
      exp: moment().add(14, 'days').unix(),
      iat: moment().unix(),
      iss: user.mail,
      sub : user.hash
  }
  return jwt.sign(payload, global.config.APP_SECRET);
}

// Create a hash for the user
function format (user) {
  const salt = bcrypt.genSaltSync(10);
  return {
    mail: user.mail,
    hash: bcrypt.hashSync(user.mail + user.pwd, salt)
  }
}

const auth =  {

  register : (req, res) => {
    const user = format(req.body);
    db.run("INSERT into users values (?,?)", user.mail, user.hash, (err) => {
      if (!err) {
        const token = generate_token(user);
        res.send('Operation succeeded : \n' + token);
      }
      else {
        res.send('Operation failed : \n' + err);
      }
    });
  },

  login : (req, res) => {
    db.all("SELECT * from users WHERE mail=?", req.body.mail, function (err, users) {
      if (!err && users.length > 0 && bcrypt.compareSync(req.body.mail + req.body.pwd, users[0].hash)) {
        const token = generate_token(users[0]);
        res.send('Operation succeeded : \n' + token);
      }
      else {
        res.send('Operation failed : \n' + err);
      }
    });
  },

  require_token : (req, res, next) => {
    const token = req.get('authorization');
    if (!token) res.send('Authorization Required');
    jwt.verify(token, global.config.APP_SECRET, (err, decoded) => {
      if (err || decoded.exp < moment().unix()) res.send('Token expired');
      else next();
    });
  }
}

module.exports = auth;