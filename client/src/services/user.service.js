import http from "../http-common";

class UserService {
    addUser(username, fullName, mail, password){

        return http.post('/users/inscription', {
            username: username,
            fullName: fullName,
            mail: mail,
            password: password
        });
    }

    checkLogin(mail, password){

        return http.post('/users/checkLogin', {
            mail: mail,
            password: password
        });
    }
}

export default new UserService();



