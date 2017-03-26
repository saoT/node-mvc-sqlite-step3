'use strict';

const db = require('../../database');

const products =  {

  find : function (req, res) {
    db.all('SELECT * from users WHERE mail=?', req.query.name, (err, data) => {
      if (!err) res.send('Operation completed ' + data[0]);
      else res.send('Operation failed :: ' + err);
    });
  }

}

module.exports = products;