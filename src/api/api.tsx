import axios from "axios";
import { ThemeColorType } from "../redux/appReducer";
import { achivmentsObj } from "./achivments";
import { messagesObj } from "./messages";
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
      const currTime = new Date();
      const onlineDay = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate())
      let state = {
        main: localStorage.main ? JSON.parse(localStorage.main) : {},
        month: localStorage.month ? JSON.parse(localStorage.month) : {},
        week: localStorage.week ? JSON.parse(localStorage.week) : {},
        day: localStorage.day ? JSON.parse(localStorage.day) : {},
<<<<<<< HEAD
        daily: localStorage.daily ? localStorage.daily : '{}',
        finishedMonth: localStorage.finishedMonth ? localStorage.finishedMonth : 0,
        finishedWeek: localStorage.finishedWeek ? localStorage.finishedWeek : 0,
        finishedDay: localStorage.finishedDay ? localStorage.finishedDay : 0,
        createdAt: localStorage.createdAt ? localStorage.createdAt : 0,
        lastOnline: localStorage.lastOnline ? localStorage.lastOnline : 0,
        created_at: localStorage.created_at ? localStorage.created_at : localStorage.created_at= new Date()
      };
      return new Promise((resolve, reject) => { resolve(state) })
=======
        daily: localStorage.daily ? localStorage.daily : "{}",
        createdAt: localStorage.createdAt ? localStorage.createdAt : 0,
        lastOnline: localStorage.lastOnline ? localStorage.lastOnline : onlineDay,
        created_at: localStorage.created_at ? localStorage.created_at : localStorage.created_at = new Date(),
        statisticday: localStorage.statisticday ? localStorage.statisticday : 0,
        statisticweek: localStorage.statisticweek ? localStorage.statisticweek : 0,
        statisticmonth: localStorage.statisticmonth ? localStorage.statisticmonth : 0,
      };

      return new Promise((resolve) => { resolve(state) })
>>>>>>> d5b297a (minimal functioanal completed)
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

        const isFinished = (state[id].isFinished === false && task[category][id].isFinished === true)
        state[id] = task[category][id];
        localStorage[category] = JSON.stringify(state);
        let statisticCategory = `statistic${category}`
        if (isFinished) {
          localStorage[statisticCategory] = localStorage[statisticCategory] ? +localStorage[statisticCategory] + 1 : 1;
        }
        let ret = { category: localStorage[statisticCategory] };
        resolve(ret);
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
  completeAllDayTasks: function () {
    if (isConnected) {
      console.warn('This functon is not writed');
    } else {
      const state = JSON.parse(localStorage.day);
      const dayTasks: any = {};
      let count = 0;
      for (const key in state) {
        if (!state[key].isFinished) {
          count++;
        }
        dayTasks[key] = { ...state[key], isFinished: true }

      }
      localStorage.day = JSON.stringify(dayTasks);
      if (localStorage.statisticday) {

        localStorage.statisticday = +localStorage.statisticday + count;
      } else {
        localStorage.statisticday = count;
      }
      count = 0;
    }
  },
  getAchivments: function () {
    if (isConnected) {
      console.warn('This functon is not writed');
    } else {
      return new Promise(resolve => {
        let responce = [];
        // let achivs = [];
        let stateAchivs = localStorage.achivments ? new Set(JSON.parse(localStorage.achivments)) : new Set();
        let currentDay = 0;
        let createdDate = new Date(localStorage.created_at)
        let currentDate = new Date();

        let day = createdDate.getDate();
        let month = createdDate.getMonth();
        let year = createdDate.getFullYear();

        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        createdDate = new Date(new Date(year, month, day));

        let diffDate = +currentDate - +createdDate;
        currentDay = Math.round((diffDate / (3600 * 24) / 1000));

        if ((localStorage.main && localStorage.month && localStorage.week && localStorage.day) || (stateAchivs.has('1'))) {
          responce.push(achivmentsObj['1'])
          stateAchivs.add('1')
        }
        if (currentDay >= 7 || stateAchivs.has('2')) {
          stateAchivs.add('2')
          responce.push(achivmentsObj['2'])
        }
        if (currentDay >= 21) {
          stateAchivs.add('3')
          responce.push(achivmentsObj['3'])
        }
        if (currentDay >= 30) {
          stateAchivs.add('4')
          responce.push(achivmentsObj['4'])
        }
        if (currentDay >= 66) {
          stateAchivs.add('5')
          responce.push(achivmentsObj['5'])
        }

        localStorage.achivments = JSON.stringify(Array.from(stateAchivs))
        resolve(responce)
      })
    }
  },
  getMessages: function () {
    if (isConnected) {
      console.warn('This functon is not writed');
    } else {
      const localMessages = localStorage.messages ? JSON.parse(localStorage.messages) : {};
      const state = { ...messagesObj, ...localMessages };
      return new Promise(resolve => {
        resolve(state)
      })
    }
  },
  checkMessage: function () {
    if (isConnected) {
      console.warn('This functon is not writed');
    } else {
      let localMessages = localStorage.messages ? JSON.parse(localStorage.messages) : { ...messagesObj };
      for (const key in localMessages) {
        if (Object.prototype.hasOwnProperty.call(localMessages, key)) {
          //@ts-ignore
          const element = localMessages[key];
          if (!element.isChecked) {
            element.isChecked = true;
            break;
          }
        }
      }
      const state = { ...messagesObj, ...localMessages };
      localStorage.messages = JSON.stringify(state);
      return new Promise(resolve => {
        resolve(state)
      })
    }
  },
  checkOnline: function () {
    if (isConnected) {
      console.warn('This functon is not writed');
    } else {
      const currTime = new Date();
      const onlineDay = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate())
      localStorage.lastOnline = onlineDay;
      return new Promise(resolve => {
        resolve(onlineDay)
      })
    }
  },
  deleteMessageHistory: function () {
    if (isConnected) {
      console.warn('This functon is not writed');
    } else {
      const newMessages = messagesObj;
      localStorage.removeItem('messages')
      localStorage.messages = JSON.stringify(newMessages);
      return new Promise(resolve => {
        resolve(newMessages)
      })

    }
  },
  setCurrentDay: function (day: number) {
    if (isConnected) {
      console.warn('This functon is not writed');
    } else {
      let currTime = new Date().getTime();
      let pastDate = new Date(currTime - 24 * 3600 * 1000 * day)
      localStorage.created_at = pastDate
      return new Promise(resolve => {
        resolve(pastDate)
      })
    }
  },
  setNewMessage: function (text: string) {
    if (isConnected) {
      console.warn('This functon is not writed');
    } else {
      const prevMsg=JSON.parse(localStorage.messages)
      let lastIdMsg = Object.keys(prevMsg).pop();
      let IdMsg = lastIdMsg === undefined ? 1000 : +lastIdMsg + 1000;
      let newMsg = { [IdMsg]: { text, isChecked: true } }
      let state = { ...prevMsg, ...newMsg }
      localStorage.messages=JSON.stringify(state)
      return new Promise(resolve => {
        resolve(state)
      })
    }
  },
  setThemeColor:function(color:ThemeColorType){
    localStorage.themeColor=color;
  }

};