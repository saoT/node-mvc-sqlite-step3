'use strict';


const db = require('../../database');

//------------------ /!\ ------------------//
// N'oubliez pas de rajouter la méthode pour chaque route.
// ----------------------------------------//
const users  = {

  // Find a user by name
  find : function (req, res) {
    db.all('SELECT * from users WHERE mail=?', req.query.mail, (err, data) => {
      if (!err) res.send('Operation completed ' + data[0]);
      else res.send('Operation failed :: ' + err);
    });
  },

  restricted : (req, res) => {
    console.log('Accessed the restricted area');
    res.send('Access authorized');
  }

}

module.exports = users;