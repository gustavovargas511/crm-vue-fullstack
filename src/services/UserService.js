import usersAPI from "../api/users";

export default {
  getUsers() {
    return usersAPI.get("/users");
  },
  getUser(id) {
    return usersAPI.get("/users/" + id);
  },
  addUser(data) {
    return usersAPI.post("/users", data);
  },
  updUser(id, data) {
    return usersAPI.patch("/users/" + id, data);
    // console.log(id);
  },
  updUserActive(id, data) {
    return usersAPI.patch("/users/" + id, data);
    // console.log(id);
  },
  delUser(id) {
    return usersAPI.delete("/users/" + id);
  },
};
