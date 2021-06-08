let db = require("../db-config.js")

let Annotation = {

    addAnnotation: function (data,callback) {
    db.query('INSERT INTO annotations (bdd_id,application_id,user_id,creation_path,creation_date,description) VALUES ($1,$2,$3,$4,$5,$6)',
      [data.bdd_id,data.application_id,data.user_id,data.creation_path,data.creation_date,data.description],
      callback);
  },

    addBdd: function(data,callback){

        db.query('INSERT INTO bdd (bdd_name,bdd_size,nb_classes) VALUES($1,$2,$3)',
        [data.bdd_name,data.bdd_size,data.nb_classes],
        callback);
    },

    bdd_id: function(callback){
        db.query('SELECT * FROM bdd WHERE bdd_id=(SELECT max(bdd_id) FROM bdd)', callback);
    },

    getAll: function(callback){
        db.query('SELECT * FROM annotations');
    },

    delete: function(data, callback){
        db.query('DELETE FROM annotations WHERE annotation_id = $1', [data.annotId], callback);
    }
};


module.exports = Annotation;
