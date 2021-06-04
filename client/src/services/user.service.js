import http from "../http-common";

class UserService {
    checkLogin(mail, password){

        return http.post('/users/checkLogin', {
            mail: mail,
            password: password
        });
    }
}

export default new UserService();
