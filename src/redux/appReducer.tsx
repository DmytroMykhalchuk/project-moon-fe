import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { monthDiff } from "../utils/functions";
import { AppStateType, InferActionsTypes } from "./store";

const INIT = "INIT";
const FETCHING = 'FETCHING';
const COMPLETE_TASK = 'COMPLETE_TASK';
const DELETE_TASK = 'DELETE_TASK'
const REPUT_TASK = 'REPUT_TASK';
const CREATE_TASK = 'CREATE_TASK';
const EDIT_TASK = 'EDIT_TASK';
const RESTORE_TASK = 'RESTORE_TASK';
const SET_CURRENT_DAY = 'SET_CURRENT_DAY'
const SET_DAILY = 'SET_DAILY'
const UPDATE_TASK = 'UPDATE_TASK'
const COMPLETE_ALL_DAY_TASK = "COMPLETE_ALL_DAY_TASK";
const GET_ACHIVMENTS = "GET_ACHIVMENTS";
const SET_MESSAGES = 'SET_MESSAGES';
const CHECK_MESSAGE = 'CHECK_MESSAGE';
const CHECK_ONLINE = 'CHECK_ONLINE';
const DELETE_MESAGE_HISTORY = "DELETE_MESAGE_HISTORY"
const SET_DAY = 'SET_DAY'
const SET_DATE_CREATE = 'SET_DATE_CREATE'
const CHANGE_THEME_COLOR = 'CHANGE_THEME_COLOR'
const CREATE_TAG = 'CREATE_TAG'

export const RED = 'RED'
export const BLACK = 'BLACK'
export const WHITE = 'WHITE'
export const BLUE = 'BLUE'
export const YELLOW = 'YELLOW'
export const PURPLE = 'PURPLE'
export const GREEN = 'GREEN'
export const themeValues = [
   {
      value: RED,
      labelUa: 'червоний',
      labelEng: 'red'
   },
   {
      value: GREEN,
      labelUa: 'зелений',
      labelEng: 'green'
   },
   {
      value: YELLOW,
      labelUa: 'жовтий',
      labelEng: 'yellow'
   },
   {
      value: BLUE,
      labelUa: 'синій',
      labelEng: 'blue'
   },
   {
      value: PURPLE,
      labelUa: 'фіолетовий',
      labelEng: 'purple'
   },
]

export type ThemeColorType = typeof RED | typeof BLACK | typeof WHITE | typeof BLUE | typeof YELLOW | typeof PURPLE;

const initialState: any = {
   isFetching: false,
   isInitialize: false,
   themeColor: localStorage.getItem('themeColor') ? localStorage.getItem('themeColor') : "RED",
   main: {
   },
   month: {
   },
   week: {
   },
   day: {
   },
   daily: {
   }
}
const appReducer = (state = initialState, action: ActionsTypes): any => {
   switch (action.type) {
      case INIT: {
         return {
            ...state,
            ...action.state,
            isInitialize: true,
            daily: JSON.parse(action.state.daily)
         }
      }
      case SET_CURRENT_DAY: {
         let currentDay = 0;
         let createdDate = new Date(state.created_at)
         let currentDate = new Date();

         let day = createdDate.getDate();
         let month = createdDate.getMonth();
         let year = createdDate.getFullYear();

         currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
         createdDate = new Date(new Date(year, month, day));

         let diffDate = +currentDate - +createdDate;
         currentDay = Math.round((diffDate / (3600 * 24) / 1000))

         let cuurTime = new Date(year, month, day).getTime();

         let endPointDate = new Date(year + 1, month + 6, day).getTime();
         const maxDays = Math.round((endPointDate - cuurTime) / (3600 * 24 * 1000))

         let currMonth = monthDiff(new Date(createdDate), new Date(currentDate));
         currMonth++;
         // let currMonth = monthDiff(new Date(2022, 11, 2), new Date(2025, 5, 1));
         currMonth = currMonth >= 19 ? 18 : currMonth;
         return {
            ...state,
            currentDay,
            currentMonth: currMonth,
            maxDays: maxDays
         }
      }
      case FETCHING: {
         return {
            ...state,
            isFetching: !state.isFetching
         }
      }
      case UPDATE_TASK: {
         return {
            ...state,
            [action.category]: { ...state[action.category], [action.id]: { ...action.task } }
         }
      }
      case COMPLETE_TASK: {
         let changedTaskList = {
            [action.category]: {
               ...state[action.category], [action.id]: { ...action.task, isFinished: true }
            }
         }
         return {
            ...state,
            ...changedTaskList,
            [`statistic${action.category}`]: +state[`statistic${action.category}`] + 1
         }
      }
      case REPUT_TASK: {
         let changedTaskList = { [action.category]: { ...state[action.category], [new Date().getTime()]: { ...action.object } } };
         delete changedTaskList[action.category][action.id]
         return {
            ...state,
            ...changedTaskList
         }
      }
      case CREATE_TASK: {

         let changedTaskList = { [action.category]: { ...state[action.category], [new Date().getTime()]: { aim: action.text, isFinished: false, isInTrash: false } } };
         return {

            ...state,
            ...changedTaskList
         }
      }
      case EDIT_TASK: {
         let changedTaskList: any;
         if (action.id in state.day) {
            changedTaskList = { day: state.day };
            delete changedTaskList.day[action.id];
         } else if (action.id in state.week) {
            changedTaskList = { week: state.week };
            delete changedTaskList.week[action.id];
         } else if (action.id in state.month) {
            changedTaskList = { month: state.month };
            delete changedTaskList.month[action.id];
         } else if (action.id in state.main) {
            changedTaskList = { main: state.main };
            delete changedTaskList.main[action.id];
         }
         return {
            ...state,
            ...changedTaskList,
            [action.category]: { ...state[action.category], [action.id]: { aim: action.text, isFinished: false, isIntTrash: false } }
         }
      }
      case DELETE_TASK: {
         delete state[action.category][action.id];
         return {
            ...state
         }
      }
      case RESTORE_TASK: {
         if (action.object.isInTrash) {
            action.object.isInTrash = false
         } else {
            action.object.isFinished = false
         }
         return {
            ...state,
            [action.category]: {
               ...state[action.category],
               [action.id]: { ...action.object }

            }
         }
      }
      case SET_DAILY: {
         return {
            ...state,
            daily: {
               ...state.daily,
               ...action.record
            }
         }
      }
      case COMPLETE_ALL_DAY_TASK: {
         const dayTasks: any = {};
         let count = 0;
         for (const key in state.day) {
            if (!state.day[key].isFinished) {
               count++;
            }
            dayTasks[key] = { ...state.day[key], isFinished: true }
         }

         return {
            ...state,
            day: dayTasks,
            statisticDay: +state.statisticDay + count
         }
      }
      case GET_ACHIVMENTS: {
         return {
            ...state,
            achivments: { ...action.achivments }
         }
      }
      case SET_MESSAGES: {
         let isBadge = false;
         if (action.messages) {

            for (const item in action.messages) {
               if (Object.prototype.hasOwnProperty.call(action.messages, item)) {
                  const element = action.messages[item];
                  if (!element.isChecked) {
                     isBadge = true;
                     break;
                  }

               }
            }
         }

         return {
            ...state,
            messages: { ...action.messages },
            isBadge
         }
      }
      case CHECK_MESSAGE: {
         let isBadge = false;

         if (action.messages) {
            for (const item in action.messages) {
               if (Object.prototype.hasOwnProperty.call(action.messages, item)) {
                  const element = action.messages[item];
                  if (!element.isChecked) {
                     isBadge = true;
                  }

               }
            }
         }
         return {
            ...state,
            messages: action.messages,
            isBadge
         }
      }
      case CHECK_ONLINE: {
         return {
            ...state,
            lastOnline: action.online
         }
      }
      case DELETE_MESAGE_HISTORY: {
         return {
            ...state,
            message: { ...action.message }
         }
      }
      case SET_DAY: {
         return {
            ...state,
            currentDay: action.day
         }
      }
      case SET_DATE_CREATE: {
         return {
            ...state,
            createdAt: action.date
         }
      }
      case CHANGE_THEME_COLOR: {
         return {
            ...state,
            themeColor: action.color
         }
      }
      case CREATE_TAG: {
         return {
            ...state,
            records: action.records
         }
      }
      default: return state;
   }
}

export type ActionsTypes = InferActionsTypes<typeof actions>;
export type DispatchType = Dispatch<ActionsTypes>;


export const actions = {
   init: (payload: any) => {
      return {
         type: INIT,
         state: payload
      } as const

   },
   setCurrentDay: () => {
      return {
         type: SET_CURRENT_DAY
      } as const

   },
   toggleFetching: () => {
      return {
         type: FETCHING
      } as const

   },
   updateTask: (category: string, id: string, task: TaskType) => {
      return {
         type: UPDATE_TASK,
         category,
         id,
         task
      } as const

   },
   deleteTask: (category: string, id: string | number, object: TaskType) => {
      return {
         type: DELETE_TASK,
         category,
         object,
         id
      } as const

   },
   restoreTask: (category: string, id: string, object: TaskType) => {
      return {
         type: RESTORE_TASK,
         category,
         id,
         object
      } as const

   },
   rePutTask: (category: string, id: string | number, object: TaskType) => {
      return {
         type: REPUT_TASK,
         category,
         object,
         id
      } as const

   },
   createTask: (category: string, text: string) => {
      return {
         type: CREATE_TASK,
         text,
         category
      } as const

   },
   editTask: (category: string, id: string, text: string) => {
      return {
         type: EDIT_TASK,
         id,
         category,
         text,
      } as const

   },
   setDaily: (record: any) => {
      return {
         type: SET_DAILY,
         record
      } as const

   },
   completeAllDayTaskAction: () => {
      return {
         type: COMPLETE_ALL_DAY_TASK
      } as const

   },
   completeTask: (category: string, id: string, task: any) => {
      return {
         type: COMPLETE_TASK,
         id,
         category,
         task
      } as const

   },
   getAchivsAction: (achivments: any) => {
      return {
         type: GET_ACHIVMENTS,
         achivments
      } as const

   },
   setMessagesAction: (messages: any) => {
      return {
         type: SET_MESSAGES,
         messages
      } as const

   },
   checkMessageAction: (messages: any) => {
      return {
         type: CHECK_MESSAGE,
         messages
      } as const

   },
   checkOnline: (date: any) => {
      return {
         type: CHECK_ONLINE,
         online: date
      } as const
   },
   deleteMessageHistory: (message: any) => {
      return {
         type: DELETE_MESAGE_HISTORY,
         message
      } as const
   },
   setDay: (day: number) => {
      return {
         type: SET_DAY,
         day
      } as const
   },
   setCreateDate: (date: any) => {
      return {
         type: SET_DATE_CREATE,
         date
      } as const
   },
   changeThemeColor: (color: ThemeColorType) => { return { type: CHANGE_THEME_COLOR, color } as const },
   updateRecords: (records: any) => { return { type: CREATE_TAG, records } as const }
}

type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getInfoUser = (): ThunksTypes => {
   return async (dispatch) => {
      dispatch(actions.toggleFetching())
      // const result1 = new Promise((resolve) =>
      //    setTimeout(() => { resolve(dispatch(init(testState))) }, 1000)
      // );
      api.me().then((response: any) => {
         dispatch(actions.init(response))
         dispatch(actions.setCurrentDay())
         dispatch(actions.toggleFetching())
      })
   }
}
export const createTaskThunk = (category: string, text: string,): ThunksTypes => {
   return async (dispatch) => {
      dispatch(actions.toggleFetching());

      const taskSend = {
         [category]: text
      }
      api.createTask(taskSend).then((responce: any) => {
         const aim = JSON.parse(responce)
         const id = Object.keys(aim)[0];
         dispatch(actions.updateTask(category, id, aim[id]));
         dispatch(actions.toggleFetching());
      });
   }
}
export const finishTaskThunk = (category: string, id: string, task: TaskType): ThunksTypes => {

   return async (dispatch) => {
      // dispatch(toggleFetching());
      const newTask = { ...task, isFinished: true };
      const taskSend = {
         [category]: {
            [id]: newTask
         }
      }

      // dispatch(updateTask(category, id, newTask));
      api.updateTask(taskSend).then(() => {
      }).then(() => {
         dispatch(actions.completeTask(category, id, newTask));
      })
   }
}
export const deleteTaskThunk = (category: string, id: string, task: TaskType): ThunksTypes => {
   return async (dispatch) => {
      let taskSend: Object;
      taskSend = {
         [category]: {
            [id]: { ...task, isInTrash: true }
         }
      }
      if (task.isFinished && !task.isInTrash) {
         api.updateTask(taskSend).then(() => {
            dispatch(actions.updateTask(category, id, { ...task, isInTrash: true }))
         })
      } else {

         api.deleteTask(taskSend)
         dispatch(actions.deleteTask(category, id, task))
      }
   }
}
export const rePutTaskThunk = (category: string, id: string, task: TaskType): ThunksTypes => {
   return async (dispatch) => {
      // dispatch(toggleFetching());
      const deleteTaskSend = {
         [category]: {
            [id]: { ...task }
         }
      }
      let taskSend = {
         [category]: task.aim
      }
      dispatch(actions.rePutTask(category, id, task))
      api.deleteTask(deleteTaskSend).then(() => {
         api.createTask(taskSend).then(() => {
         })
      })
      // .then(() => { dispatch(toggleFetching()) })
   }
}
export const editTaskThunk = (oldCategory: string, category: string, id: string, aim: string, task: TaskType): ThunksTypes => {
   return async (dispatch) => {
      dispatch(actions.toggleFetching());
      const deleteTaskSend = {
         [oldCategory]: {
            [id]: { aim }
         }
      }
      let taskSend = {
         [category]: aim
      }
      api.deleteTask(deleteTaskSend).then(() => {
         api.createTask(taskSend).then(() => {
            dispatch(actions.editTask(category, id, aim))
         })
      }).then(() => { dispatch(actions.toggleFetching()) })

   }
}
export const toTrashTask = (category: string, id: string, task: TaskType): ThunksTypes => {
   return async (dispatch) => {
      task.isInTrash = true;
      dispatch(actions.updateTask(category, id, task));
      api.updateTask(task);
   }
}
export const restoreTaskThunk = (category: string, id: string, task: TaskType): ThunksTypes => {
   return async (dispatch) => {
      if (task.isInTrash) {
         task.isInTrash = false;
      } else {
         task.isFinished = false;
      }
      dispatch(actions.updateTask(category, id, task));
      api.updateTask({ [category]: { [id]: { ...task } } });
   }
}
export const setNewDailyRecord = (day: string, text: string): ThunksTypes => {
   return async (dispatch) => {


      api.createDailyRecord({ day, text }).then((responce: any) => {
         dispatch(actions.setDaily(responce[0]));
      })
   }
}

export const completeAllDayTaskThunk = (): ThunksTypes => {
   return async (dispatch) => {
      dispatch(actions.completeAllDayTaskAction())
      api.completeAllDayTasks();

   }
}
export const initAchivments = (): ThunksTypes => {
   return async (dispatch) => {
      //@ts-ignore
      api.getAchivments().then((responce) => {
         dispatch(actions.getAchivsAction(responce));
      })

   }
}
export const setMessages = (): ThunksTypes => {
   return async (dispatch) => {
      api.getMessages()?.then((responce: any) => {
         // console.log('')
         dispatch(actions.setMessagesAction(responce))
      })
   }
}
export const checkMessageThunk = (): ThunksTypes => {
   return async (dispatch) => {
      api.checkMessage()?.then((responce: any) => {
         dispatch(actions.checkMessageAction(responce));
      });

   }
}
export const checkOnline = (): ThunksTypes => {
   return async (dispatch) => {
      api.checkOnline()?.then((responce: any) => {
         dispatch(actions.checkOnline(responce));
      })
   }
}

export const deleteMessageHistory = (): ThunksTypes => {
   return async (dispatch) => {
      api.deleteMessageHistory()?.then(responce => {
         dispatch(actions.setMessagesAction(responce))
      })
   }
}
export const setCurrentDay = (day: number): ThunksTypes => {
   return async (dispatch) => {
      dispatch(actions.setDay(day));
      api.setCurrentDay(day)?.then(responce => {
         dispatch(actions.setCreateDate(responce));
      })
      api.setNewMessage("Встановлено день: " + day)?.then(responce => {
         dispatch(actions.setMessagesAction(responce))
      })
   }
}
export const changeLangCites = (lang: string): ThunksTypes => {
   return async (dispatch) => {
      localStorage.langCites = lang
      api.setNewMessage("Мова цитат: " + lang)?.then(responce => {
         dispatch(actions.setMessagesAction(responce))
      })
   }

}
export const setNewMessage = (text: string): ThunksTypes => {
   return async (dispatch) => {
      api.setNewMessage(text)?.then(responce => {
         dispatch(actions.setMessagesAction(responce))
      })
   }
}
export const changeThemeColor = (color: ThemeColorType): ThunksTypes => {
   return async (dispatch) => {
      api.setThemeColor(color)
      dispatch(actions.changeThemeColor(color))
   }
}
export const createTag = (tag: string): ThunksTypes => {
   return async (dispatch) => {
      dispatch(actions.updateRecords(api.createNewTag(tag)))
   }
}
export default appReducer;
export type TaskType = {
   aim: string
   isFinished: boolean
   isInTrash: boolean
}