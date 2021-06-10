let db = require("../db-config.js")

let Annotation = {

    addAnnotation: function (data, bddId, callback) {

        db.query('INSERT INTO annotations (bdd_id,application_id,user_id,creation_date,description) VALUES ($1,$2,$3,CURRENT_DATE,$4) RETURNING annotation_id',
      [bddId,data.application_id,data.user_id,data.description],
      callback);
  },

    getAll: function(callback){
        db.query('SELECT * FROM annotations', callback);
    },

    delete: function(data, callback){
        db.query('DELETE FROM annotations WHERE annotation_id = $1', [data.annotId], callback);
    }
};


module.exports = Annotation;
