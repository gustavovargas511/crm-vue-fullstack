import axios from "axios";

const usersAPI = axios.create({
  baseURL: "https://usersapi-tdng.onrender.com/api/",
});

export default usersAPI;
