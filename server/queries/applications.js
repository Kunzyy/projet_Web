let db = require("../db-config.js")

let Applications = {
    create : function(data, callback){
        let requirements = {
            requirements : data.requirements
        }
        db.query('INSERT INTO applications (application_name, description, requirements) VALUES ($1,$2,$3)',[data.name, data.descr, requirements], callback);
    },

    getAll : function(callback){
        db.query('SELECT * FROM applications', callback);
    },

    getDescrById : function(data, callback){
        console.log(data);
        db.query('SELECT application_name, description FROM applications WHERE application_id = $1', [data.applicationId], callback);
    }
}

module.exports = Applications;
