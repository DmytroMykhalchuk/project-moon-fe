import axios from "axios";

// const axios = require("axios").default;

const url = "http://127.0.0.1:8000/api/";
const instance = axios.create({
  baseURL: url,
});
//do something...
instance.interceptors.request.use(
  (config) => {
    if (localStorage.access_token) {
      config.headers.authorization = `Bearer ${localStorage.access_token}`;
    }
    return config;
  },
  (error) => {}
);
instance.interceptors.response.use(
  (config) => {
    if (localStorage.access_token) {
      config.headers.authorization = `Bearer ${localStorage.access_token}`;
    }
    return config;
  },
  (error) => {
    // if (error.response.data.message===401) {

    // }
    if (error.response.data.message === "Token has expired") {
      instance
        .post(
          "auth/refresh",
          {},
          {
            headers: {
              authorization: `Bearer ${localStorage.access_token}`,
            },
          }
        )
        .then((response) => {
          localStorage.access_token = response.data.access_token;
          error.config.headers.authorization = `Bearer ${localStorage.access_token}`;
          return instance.request(error.config);
        });
    }
  }
);

export const api = {
  register: function (formData) {
    return instance.post("users", { ...formData }).then((response) => {
      console.log(response);
      localStorage.access_token = response.data.access_token;
    });
  },
  login: function (formData) {
    return instance.post("auth/login", { ...formData }).then((response) => {
      localStorage.access_token = response.data.access_token;
    });
  },
  logout: function () {
    return instance.post("auth/logout").then(() => {
      localStorage.removeItem("access_token");
    });
  },
  me: function () {
    return instance.get("users/me").then((responce) => {
      return responce.data;
    });
  },
};
