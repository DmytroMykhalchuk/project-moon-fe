import { ThemeColorType } from "../redux/appReducer"
import { achivmentsObj } from "./achivments"
import { messagesObj } from "./messages"

<<<<<<< HEAD
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
=======
const placeHolderRecords = ['🎒 Навчання', '👟 Тренування', '💰 Фінанси', '📚 Книги', '✨ Сюрприз']
>>>>>>> 5dd9af6 (refactored api)

export const api = {
  hardReset: () => {
    const currTime = new Date();
    const onlineDay = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate())
    localStorage.main = JSON.stringify({})
    localStorage.month = JSON.stringify({})
    localStorage.week = JSON.stringify({})
    localStorage.day = JSON.stringify({})
    localStorage.daily = JSON.stringify({})
    localStorage.createdAt = JSON.stringify(0)
    localStorage.lastOnline = JSON.stringify(onlineDay)
    localStorage.created_at = JSON.stringify(currTime)
    localStorage.statisticday = JSON.stringify(0)
    localStorage.statisticweek = JSON.stringify(0)
    localStorage.statisticmonth = JSON.stringify(0)
    localStorage.records = JSON.stringify(placeHolderRecords)
    localStorage.pomodoroStatistic = JSON.stringify({})
    localStorage.isStarted = false
    let state = {
      main: {},
      month: {},
      week: {},
      day: {},
      daily: "{}",
      createdAt: 0,
      lastOnline: onlineDay,
      created_at: currTime,
      statisticday: 0,
      statisticweek: 0,
      statisticmonth: 0,
      records: [],
      pomodoroStatistic: {},
    }
    return state;
  },
<<<<<<< HEAD
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
=======
>>>>>>> b971801 (injected deleting category)
  me: function () {
<<<<<<< HEAD
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
        records: localStorage.records ? JSON.parse(localStorage.records) : [],
        pomodoroStatistic: localStorage.pomodoroStatistic ? JSON.parse(localStorage.pomodoroStatistic) : {},
        isStarted: localStorage.isStarted ? localStorage.isStarted : false,
      }


      return new Promise((resolve) => { resolve(state) })
>>>>>>> d5b297a (minimal functioanal completed)
=======
    const currTime = new Date();
    const onlineDay = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate())
    localStorage.records = localStorage.records ? localStorage.records : JSON.stringify(placeHolderRecords)

    let state = {
      main: localStorage.main ? JSON.parse(localStorage.main) : {},
      month: localStorage.month ? JSON.parse(localStorage.month) : {},
      week: localStorage.week ? JSON.parse(localStorage.week) : {},
      day: localStorage.day ? JSON.parse(localStorage.day) : {},
      daily: localStorage.daily ? localStorage.daily : "{}",
      createdAt: localStorage.createdAt ? localStorage.createdAt : 0,
      lastOnline: localStorage.lastOnline ? localStorage.lastOnline : onlineDay,
      created_at: localStorage.created_at ? localStorage.created_at : localStorage.created_at = new Date(),
      statisticday: localStorage.statisticday ? localStorage.statisticday : 0,
      statisticweek: localStorage.statisticweek ? localStorage.statisticweek : 0,
      statisticmonth: localStorage.statisticmonth ? localStorage.statisticmonth : 0,
      records: localStorage.records ? JSON.parse(localStorage.records) : placeHolderRecords,
      pomodoroStatistic: localStorage.pomodoroStatistic ? JSON.parse(localStorage.pomodoroStatistic) : {},
      isStarted: localStorage.isStarted ? localStorage.isStarted : false,
>>>>>>> 5dd9af6 (refactored api)
    }


    return new Promise((resolve) => { resolve(state) })
  },
  createTask: function (task: any) {
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
      resolve(newTask)
    })
  },
  updateTask: function (task: any) {
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
  },
  deleteTask: function (task: any) {
    return new Promise(resolve => {
      const category = Object.keys(task)[0];
      const id = Object.keys(task[category])[0];
      let state = JSON.parse(localStorage[category]);
      delete state[id];
      localStorage[category] = JSON.stringify(state);
      resolve('OK');
    })
  },
  createDailyRecord: function (day: string, title: string, text: string, tags: Array<string>, date: Date) {
<<<<<<< HEAD
    if (isConnected) {
      return instance
        .post("auth/daily", { day, title, text, tags, date })
        .then((responce) => {
          return responce.data;
        });
    } else {
      let daily = localStorage.daily ? JSON.parse(localStorage.daily) : {};
<<<<<<< HEAD
      const id = new Date().getTime();
      daily[id]={text:record.text,day:record.day}
      localStorage.daily=JSON.stringify(daily);
      return new Promise(resolve => {
        resolve([{[id]:{text:record.text,day:record.day}}])
=======
      const id = date.getTime();
      daily[id] = { text, day, title, tags }
      localStorage.daily = JSON.stringify(daily);
      return new Promise(resolve => {
        resolve([{ [id]: { text, day, title, tags } }])
>>>>>>> 434780e (updated Daily page)
      })
    }
=======
    let daily = localStorage.daily ? JSON.parse(localStorage.daily) : {};
    const id = date.getTime();
    daily[id] = { text, day, title, tags }
    localStorage.daily = JSON.stringify(daily);
    return new Promise(resolve => {
      resolve([{ [id]: { text, day, title, tags } }])
    })
>>>>>>> 5dd9af6 (refactored api)
  },
  completeAllDayTasks: function () {
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
  },
  getAchivments: function () {
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
  },
  getMessages: function () {
    const localMessages = localStorage.messages ? JSON.parse(localStorage.messages) : {};
    const state = { ...messagesObj, ...localMessages };
    return new Promise(resolve => {
      resolve(state)
    })
  },
  checkMessage: function () {
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
  },
  checkOnline: function () {
    const currTime = new Date();
    const onlineDay = new Date(currTime.getFullYear(), currTime.getMonth(), currTime.getDate())
    localStorage.lastOnline = onlineDay;
    return new Promise(resolve => {
      resolve(onlineDay)
    })
  },
  deleteMessageHistory: function () {
    const newMessages = messagesObj;
    localStorage.removeItem('messages')
    localStorage.messages = JSON.stringify(newMessages);
    return new Promise(resolve => {
      resolve(newMessages)
    })
  },
  setCurrentDay: function (day: number) {
    let currTime = new Date().getTime();
    let pastDate = new Date(currTime - 24 * 3600 * 1000 * day)
    localStorage.created_at = pastDate
    return new Promise(resolve => {
      resolve(pastDate)
    })
  },
  setNewMessage: function (text: string) {
    const prevMsg = JSON.parse(localStorage.messages)
    let lastIdMsg = Object.keys(prevMsg).pop();
    let IdMsg = lastIdMsg === undefined ? 1000 : +lastIdMsg + 1000;
    let newMsg = { [IdMsg]: { text, isChecked: true } }
    let state = { ...prevMsg, ...newMsg }
    localStorage.messages = JSON.stringify(state)
    return new Promise(resolve => {
      resolve(state)
    })
  },
  setThemeColor: function (color: ThemeColorType) {
    localStorage.themeColor = color
  },
  createNewTag: (tag: string) => {
    const storageRecords = localStorage.records ? JSON.parse(localStorage.records) : []
    if (!storageRecords.includes(tag)) {
      const rec = [...storageRecords, tag];
      localStorage.records = JSON.stringify(rec)
      return rec
    }
    return storageRecords
  },
  deleteTag: (tag: string) => {
    const storageRecords = localStorage.records ? JSON.parse(localStorage.records).filter((item: string) => item !== tag) : []
    let daily = localStorage.records ? JSON.parse(localStorage.daily) : {}
    for (const records in daily) {
      if (Object.prototype.hasOwnProperty.call(daily, records)) {
        const element = daily[records];
        if (element.tags) {
          if (element.tags.includes(tag)) {
            element.tags = element.tags.filter((item: string) => item !== tag)
          }
        } else {
          element.tags = []
        }

      }
    }
    const pomodoroStatistic = localStorage.pomodoroStatistic ? JSON.parse(localStorage.pomodoroStatistic) : {}
    delete pomodoroStatistic[tag]

    localStorage.pomodoroStatistic = JSON.stringify(pomodoroStatistic)
    localStorage.daily = JSON.stringify(daily);
    localStorage.records = JSON.stringify(storageRecords)
    return [storageRecords, daily, pomodoroStatistic]
  },
  updateTag: (oldTag: string, newTag: string) => {
    const storageRecords = localStorage.records
      ? JSON.parse(localStorage.records).map((item: string) => { if (item === oldTag) { return newTag } return item })
      : []
    let daily = localStorage.records ? JSON.parse(localStorage.daily) : {}
    for (const records in daily) {
      if (Object.prototype.hasOwnProperty.call(daily, records)) {
        const element = daily[records];
        if (element.tags.includes(oldTag)) {
          element.tags = element.tags.map((item: string) => { if (item === oldTag) { return newTag } return item })
        }

      }
    }
    const pomodoroStatistic = localStorage.pomodoroStatistic ? JSON.parse(localStorage.pomodoroStatistic) : {}
    pomodoroStatistic[newTag] = pomodoroStatistic[oldTag]
    delete pomodoroStatistic[oldTag]

    localStorage.pomodoroStatistic = JSON.stringify(pomodoroStatistic)
    localStorage.daily = JSON.stringify(daily);
    localStorage.records = JSON.stringify(storageRecords)
    return [storageRecords, daily, pomodoroStatistic]
  },
  deleteDailyRecord: (id: string) => {
    let daily = localStorage.records ? JSON.parse(localStorage.daily) : {}
    delete daily[id]
    localStorage.daily = JSON.stringify(daily)
    return daily
  },
  filterDailyRecords: (tags?: string[]) => {
    let daily = localStorage.daily ? JSON.parse(localStorage.daily) : {}
    if (tags) {
      for (const key in daily) {
        let isFilteredConditions = false
        if (Object.prototype.hasOwnProperty.call(daily, key)) {
          const element = daily[key]
          if (element.tags) {
            for (const tag of tags) {
              isFilteredConditions = element.tags.includes(tag)
              if (!isFilteredConditions) {
                delete daily[key]
                break
              }
            }
            isFilteredConditions = false
          } else { //support tags
            injectingTagsToRecords()
            break
          }
        }
      }

    }
    return daily
  },
  savePomodoro: (tag: string, time: number) => {
    tag = tag ? tag : 'Інше'
    const pomodoroStatistic = localStorage.pomodoroStatistic ? JSON.parse(localStorage.pomodoroStatistic) : {}

    pomodoroStatistic[tag] = pomodoroStatistic[tag]
      ? pomodoroStatistic[tag] + Math.trunc(time / 60)
      : Math.trunc(time / 60)
    localStorage.pomodoroStatistic = JSON.stringify(pomodoroStatistic)
    return pomodoroStatistic
  },
  deleteStatisticSection: (section: string) => {
    localStorage.setItem('statistic' + section, '0')
    return 0
  },
  removedPomodoroStatistic: (tag: string) => {
    let statistic = JSON.parse(localStorage.pomodoroStatistic)
    delete statistic[tag]
    localStorage.pomodoroStatistic = JSON.stringify(statistic)
    return statistic
  },
  initStart: () => {
    localStorage.isStarted = true
  }
};

const injectingTagsToRecords = () => {
  let daily = localStorage.daily ? JSON.parse(localStorage.daily) : {}
  for (const key in daily) {
    if (Object.prototype.hasOwnProperty.call(daily, key)) {
      const element = daily[key]
      if (!element.tags)
        element.tags = []
    }
  }
  localStorage.daily = JSON.stringify(daily)
} 