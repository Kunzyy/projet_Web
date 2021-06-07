import http from "../http-common";

class DataServiceUser {
  getAlluser() {
    return http.get("/users");
  }

  getUser(id) {
    return http.get(`/users/${id}`);
  }

  createUser(data) {
    return http.post("/users", data);
  }

  updateUser(id, data) {
    return http.put(`/users/${id}`, data);
  }

  deleteUser(id) {
    return http.delete(`/users/${id}`);
  }

  annoter(data) {
    return http.post("/annotation", data);
  }
  annotertest() {
    return http.get("/testpython");
  }


  deleteAllUser() {
    return http.delete(`/users`);
  }
}

export default new DataServiceUser();
