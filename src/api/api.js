import axios from "axios";

// const url=`https://projectmoon.000webhostapp.com/api/`;
const url = `http://127.0.0.1:8000/api/`;
const instance = axios.create({
  baseURL: url,
});
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
    return instance.get("auth/users/me").then((responce) => {
      return responce.data;
    });
  },
  createTask: function (task) {
    return instance
      .post("auth/dreams", { dreams: JSON.stringify(task) })
      .then((responce) => {
        return responce.data[0];
      });
  },
  updateTask: function (task) {
    return instance
      .post("auth/dreams/update", { dreams: JSON.stringify(task) })
      .then((responce) => {});
  },
  deleteTask: function (task) {
    return instance
      .post("auth/dreams/delete", { dreams: JSON.stringify(task) })
      .then((responce) => {});
  },
  createDailyRecord: function (record) {
    return instance
      .post("auth/daily", { daily: JSON.stringify(record) })
      .then((responce) => {
        return responce.data;
      });
  },
};
