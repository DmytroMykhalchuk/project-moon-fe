import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { AppStateType } from "./store";
import testState from "./testState";

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

const initialState: any = {

   isFetching: false,
   isInitialize: false,
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

type StateType = any;

const appReducer = (state = initialState, action: any): any => {
   switch (action.type) {
      case INIT: {
         // let currentDay: number | string;
         // let recordsSize=Object.keys({...state.daily, ...action.state.daily}).length;

         // if(recordsSize===0){
         //    currentDay='0'
         // }else{
         //    let date = new Date();
         //    let lastDateRecord = Object.keys(state).pop();
         //    if (lastDateRecord) {
         //       let [lastDayRecord, lastMonthRecord, lastYearRecord] = lastDateRecord.split('.')
         //       // console.log(lastDayRecord,lastMonthRecord,lastYearRecord)
         //       console.log(lastDayRecord)
         //    }

         // }
         return {
            ...state,
            ...action.state,
            isInitialize: true
         }
      }
      case SET_CURRENT_DAY: {
         let currentDay = 0;

         let dailySize = Object.keys(state.daily).length;
         if (dailySize === 0) {
            currentDay = 0;
         } else {
            let firstDateRecord = Object.keys(state.daily).shift();
            if (!firstDateRecord) return;
            let currentDate = new Date();
            let [lastDayRecord, lastMonthRecord, lastYearRecord] = firstDateRecord.split('.')
            //@ts-ignore
            const diffDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - new Date(+lastYearRecord, +lastMonthRecord - 1, +lastDayRecord);
            currentDay = ((diffDate / (3600 * 24) / 1000))
         }
         return {
            ...state,
            currentDay
         }
      }
      case FETCHING: {
         return {
            ...state,
            isFetching: !state.isFetching
         }
      }
      case COMPLETE_TASK: {
         let changedTaskList = {
            [action.category]: {
               ...state[action.category], [action.id]: { ...action.object, isFinished: true }
            }
         }

         return {
            ...state,
            ...changedTaskList
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
         let changedTaskList = { [action.category]: { ...state[action.category], [new Date().getTime()]: { aim: action.aim, isFinished: false, isInTrash: false } } };
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
            [action.category]: { ...state[action.category], [action.id]: { aim: action.aim, isFinished: false, isIntTrash: false } }
         }
      }
      case DELETE_TASK: {
         // delete state.{action.category]
         // debugger
         if (action.object.isFinished && !action.object.isInTrash) {
            return {
               ...state,
               [action.category]: {
                  ...state[action.category],
                  [action.id]: {
                     ...action.object,
                     isInTrash: true
                  }
               }
            }
         }
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
         const currentTime = new Date();
         let idNewDaily = ''
         idNewDaily += currentTime.getDate() < 10 ? `0${currentTime.getDate()}` : `${currentTime.getDate()}.`;
         idNewDaily += currentTime.getMonth() + 1 < 10 ? `0${currentTime.getMonth() + 1}` : `${currentTime.getMonth() + 1}.`;
         idNewDaily += currentTime.getFullYear();
         return {
            ...state,
            daily: {
               ...state.daily, [idNewDaily]: {
                  aim: action.aim,
                  day: state.currentDay
               }
            }
         }
      }
      default: return state;
   }
}
//actction creators
type Init = { type: typeof INIT, state: object }
type Fetching = { type: typeof FETCHING }
type CompleteTask = { type: typeof COMPLETE_TASK, id: string | number, object: Object, category: string }
type DeleteTask = { type: typeof DELETE_TASK, category: string, id: string | number, object: Object }
type RestoreTask = { type: typeof RESTORE_TASK, category: string, id: string | number, object: Object }
type RePutType = { type: typeof REPUT_TASK, id: string | number, category: string, object: Object }
type CreateAimType = { type: typeof CREATE_TASK, text: string, category: string }
type EditTaskType = { type: typeof EDIT_TASK, category: string, id: string, text: string }
type SetCurrentDay = { type: typeof SET_CURRENT_DAY }
type SetDaily = { type: typeof SET_DAILY, text: string }


export type ActionsTypes = Init | SetCurrentDay | Fetching | CompleteTask | DeleteTask | RePutType | CreateAimType | EditTaskType | RestoreTask | SetDaily;
export type DispatchType = Dispatch<ActionsTypes>;
export type TaskItemModify = { category: string, id: string | number, object: Object }

const init = (payload: object): ActionsTypes => {
   return {
      type: INIT,
      state: payload
   }
}
const setCurrentDay = (): ActionsTypes => {
   return {
      type: SET_CURRENT_DAY
   }
}
const toggleFetching = (): ActionsTypes => {
   return {
      type: FETCHING
   }
}
export const completeTask = (category: string, id: string | number, object: Object): ActionsTypes => {
   return {
      type: COMPLETE_TASK,
      category,
      object,
      id
   }
}
export const deleteTask = (category: string, id: string | number, object: Object): ActionsTypes => {

   return {
      type: DELETE_TASK,
      category,
      object,
      id
   }
}
export const restoreTask = (category: string, id: string | number, object: Object): ActionsTypes => {
   return {
      type: RESTORE_TASK,
      category,
      id,
      object
   }
}
export const rePut = (category: string, id: string | number, object: Object): ActionsTypes => {
   return {
      type: REPUT_TASK,
      category,
      object,
      id
   }
}
export const createTask = (text: string, category: string): ActionsTypes => {
   return {
      type: CREATE_TASK,
      text,
      category
   }
}
export const editTask = (category: string, id: string, text: string): ActionsTypes => {
   return {
      type: EDIT_TASK,
      id,
      category,
      text,
   }
}
export const setDaily = (text: string): ActionsTypes => {
   return {
      type: SET_DAILY,
      text
   }
}
//thunks

type ThunksTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
export const getInfoUser = (): ThunksTypes => {
   return async (dispatch) => {
      dispatch(toggleFetching())
      // const result1 = new Promise((resolve) =>
      //    setTimeout(() => { resolve(dispatch(init(testState))) }, 1000)
      // );
      api.me().then((response) => {
         console.log(response);
         dispatch(init(response))
         dispatch(setCurrentDay())
         dispatch(toggleFetching())
      })
   }
}
export default appReducer;