'use strict';

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Initialiser la connection
// SQLite est une base de données ultra light
// Toutes les données sont stockées sur un seul simple fichier
// On va donc d'abord require ce fichier et vérifier qu'il existe
//------------------------------------------------//
const dbfile = 'test.db';
const db = new sqlite3.Database(dbfile);
//------------------------------------------------//

// Construire les models
//------------------------------------------------//

// Si le fichier n'existe pas je vais le créer
if (!fs.existsSync(dbfile)) {

    // Et définir les models de chaque table
    const users = require('./models/users');

    db.run(users);
}
//------------------------------------------------//

// J'exporte ma base de données
module.exports = db;