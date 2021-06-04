let db = require("../db-config.js")

let User = {

    addUtilisateur: function(utilisateur, callback)
    {
        console.log("Insert user en cours...");
        db.query('INSERT INTO users (nom) VALUES ($1)', [utilisateur], callback);
    },

    checkLogin: function(data, callback){
        console.log("Enter in checkLogin");
        db.query('SELECT COUNT(*) FROM users WHERE email = $1 AND password = $2',[data.mail, data.password], callback);
    }
}

module.exports = User;


