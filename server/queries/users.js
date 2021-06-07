let db = require("../db-config.js")

let User = {

    addUser: function(data, callback)
    {
        console.log(data);
        console.log("Insert user en cours...");
        db.query(
            'INSERT INTO users (username, full_name, email, password, bool_admin) VALUES ($1,$2,$3,$4,false) RETURNING user_id',
            [data.username, data.fullName, data.mail, data.password],
            callback);
    },

    checkLogin: function(data, callback){
        console.log("Enter in checkLogin");
        db.query('SELECT user_id, bool_admin FROM users WHERE email = $1 AND password = $2',[data.mail, data.password], callback);
    }
}

module.exports = User;


