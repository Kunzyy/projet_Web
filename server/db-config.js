let Pool = require("pg").Pool;

let config = {
    user: 'postgres',
    database: 'webTechno',
    password: 'B16$onus#FN4C',
    port: 5432
};

let pool = new Pool(config);
console.log("Connexion");

module.exports = pool;
