let db = require("../db-config.js")

let Annotation = {

    addAnnotation: function (req,callback) {
    return db.query('INSERT INTO annotations (bdd_id,application_id,user_id,creation_path,creation_date,description) VALUES ($1,$2,$3,$4,$5,$6)',
      [req.body.bdd_id,req.body.application_id,req.body.user_id,req.body.creation_path,req.body.creation_date,req.body.description],
      callback);
  },

    addBdd: function(req,callback){

        return db.query('INSERT INTO bdd (bdd_name,bdd_size,nb_classes) VALUES($1,$2,$3)',
        [req.body.bdd_name,req.body.bdd_size,req.body.nb_classes],
        callback);
  },
  bdd_id: function(callback){
    return db.query('SELECT * FROM bdd WHERE bdd_id=(SELECT max(bdd_id) FROM bdd)', callback);
  }
  
  
};


module.exports = Annotation;
