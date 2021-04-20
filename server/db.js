let pg = require("pg");

let config = {
    user: 'postgres',
    database: '',
    password: '',
    port: 5432
};

let pool = new pg.Pool(config);
console.log("Connexion");

module.exports = pool;
