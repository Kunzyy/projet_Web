let db = require("../db.js")

let Utilisateur = {

    //Exemple de query

    addUtilisateur: function(utilisateur, callback)
    {
        console.log("Insert user en cours...");
        db.query('INSERT INTO utilisateur (nom) VALUES ($1)', [utilisateur], callback);
    }
}

module.exports = Utilisateur;
