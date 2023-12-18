const mysql2 = require('mysql2/promise')

let pool = mysql2.createPool({
    connectionLimit: 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "ewaglazewska", // identifiant BDD
    password: "9fea52c003c89a940d7b8f97602637b2", // le password
    database: "ewaglazewska_projet", // nom de la base de donnée
});

module.exports = pool