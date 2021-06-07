let Pool = require("pg").Pool;

let config = {
    user: 'postgres',
    database: 'webTechno',
    password: '',
    port: 5432
};

let pool = new Pool(config);
console.log("Connexion");

module.exports = pool;
