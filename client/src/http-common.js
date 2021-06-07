import axios from "axios";

export default axios.create({
  //baseURL: "http://195.154.52.58:3000",
  baseURL: "http://localhost:8081",
  headers: {
    "Content-type": "application/json"
  }
});



