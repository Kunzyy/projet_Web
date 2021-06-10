let db = require("../db-config.js")

let Bdd = {
    addBdd: function(bddSize, nbreClasses, callback){
        db.query('INSERT INTO bdd (bdd_size,nb_classes) VALUES($1,$2) RETURNING bdd_id',
            [bddSize, nbreClasses],
            callback);
    },

    getAll: function(callback){
        db.query('SELECT * FROM bdd', callback);
    }
}

module.exports = Bdd;
