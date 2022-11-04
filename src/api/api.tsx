import axios from "axios";
const isConnected = false;
// const url=`https://projectmoon.000webhostapp.com/api/`;
const url = `http://127.0.0.1:8000/api/`;
const instance = axios.create({
  baseURL: url,
});
instance.interceptors.request.use(
  (config) => {
    if (localStorage.access_token) {
      //@ts-ignore
      config.headers.authorization = `Bearer ${localStorage.access_token}`;
    }
    return config;
  },
  (error) => { }
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
  register: function (formData: Object) {
    return instance.post("users", { ...formData }).then((response) => {
      localStorage.access_token = response.data.access_token;
    });
  },
  login: function (formData: Object) {
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
    if (isConnected) {
      return instance.get("auth/users/me").then((responce) => {
        return responce.data;
      });
    } else {
      let state = {
        main: localStorage.main ? JSON.parse(localStorage.main) : {},
        month: localStorage.month ? JSON.parse(localStorage.month) : {},
        week: localStorage.week ? JSON.parse(localStorage.week) : {},
        day: localStorage.day ? JSON.parse(localStorage.day) : {},
        daily: localStorage.daily ? localStorage.daily : '{}',
        finishedMonth: localStorage.finishedMonth ? localStorage.finishedMonth : 0,
        finishedWeek: localStorage.finishedWeek ? localStorage.finishedWeek : 0,
        finishedDay: localStorage.finishedDay ? localStorage.finishedDay : 0,
        createdAt: localStorage.createdAt ? localStorage.createdAt : 0,
        lastOnline: localStorage.lastOnline ? localStorage.lastOnline : 0,
        created_at: localStorage.created_at ? localStorage.created_at : localStorage.created_at= new Date()
      };
      return new Promise((resolve, reject) => { resolve(state) })
    }
  },
  createTask: function (task: any) {
    if (isConnected) {
      return instance
        .post("auth/dreams", { dreams: JSON.stringify(task) })
        .then((responce) => {
          return responce.data[0];
        });
    } else {
      return new Promise(resolve => {
        const key = Object.keys(task)[0];
        const value = task[key];
        let state = localStorage[key] ? JSON.parse(localStorage[key]) : {};
        const currentTime = new Date().getTime();
        const newTask = {
          [currentTime]: { aim: value, isFinished: false, isInTrash: false }

        };
        state = { ...state, ...newTask };
        localStorage[key] = JSON.stringify(state);
        resolve(JSON.stringify(newTask));
      })
    }
  },
  updateTask: function (task: any) {
    if (isConnected) {
      return instance
        .post("auth/dreams/update", { dreams: JSON.stringify(task) })
        .then((responce) => { });
    } else {
      return new Promise(resolve => {
        const category = Object.keys(task)[0];
        const id = Object.keys(task[category])[0];

        let state = JSON.parse(localStorage[category]);

        state[id] = task[category][id];
        localStorage[category] = JSON.stringify(state);
        resolve('OK');
      })
    }
  },
  deleteTask: function (task: any) {
    if (isConnected) {
      return instance
        .post("auth/dreams/delete", { dreams: JSON.stringify(task) })
        .then((responce) => { });
    } else {
      return new Promise(resolve => {
        const category = Object.keys(task)[0];
        const id = Object.keys(task[category])[0];
        let state = JSON.parse(localStorage[category]);
        delete state[id];
        localStorage[category] = JSON.stringify(state);
        resolve('OK');
      })
    }
  },
  createDailyRecord: function (record: any) {
    if (isConnected) {

      return instance
        .post("auth/daily", { daily: JSON.stringify(record) })
        .then((responce) => {
          return responce.data;
        });
    } else {
      let daily = localStorage.daily ? JSON.parse(localStorage.daily) : {};
      const id = new Date().getTime();
      daily[id]={text:record.text,day:record.day}
      localStorage.daily=JSON.stringify(daily);
      return new Promise(resolve => {
        resolve([{[id]:{text:record.text,day:record.day}}])
      })
    }
  },
};
