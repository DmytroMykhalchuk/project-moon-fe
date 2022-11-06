import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { monthDiff } from "../utils/functions";
import { AppStateType } from "./store";

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
const appReducer = (state = initialState, action: any): any => {
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
               ...state[action.category], [action.id]: { ...action.object, isFinished: true }
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
            achivments:{...action.achivments}
         }
      }
      default: return state;
   }
}
export type TaskType = {
   aim: string
   isFinished: boolean
   isInTrash: boolean
}


type Init = { type: typeof INIT, state: object }
type Fetching = { type: typeof FETCHING }
type CompleteTask = { type: typeof COMPLETE_TASK, category: string, id: string | number, task: TaskType }
type DeleteTask = { type: typeof DELETE_TASK, category: string, id: string | number, object: Object }
type RestoreTask = { type: typeof RESTORE_TASK, category: string, id: string | number, object: Object }
type RePutType = { type: typeof REPUT_TASK, id: string | number, category: string, object: Object }
type CreateAimType = { type: typeof CREATE_TASK, text: string, category: string }
type EditTaskType = { type: typeof EDIT_TASK, category: string, id: string, text: string }
type SetCurrentDay = { type: typeof SET_CURRENT_DAY }
type SetDaily = { type: typeof SET_DAILY, record: Object }
type UpdateTaskType = { type: typeof UPDATE_TASK, category: string, id: string, task: TaskType }
type completeDayTask = { type: typeof COMPLETE_ALL_DAY_TASK }
type GetAchivmentType = { type: typeof GET_ACHIVMENTS, achivments: any }

export type ActionsTypes = Init | SetCurrentDay | Fetching | CompleteTask | DeleteTask | UpdateTaskType |
   RePutType | CreateAimType | EditTaskType | RestoreTask | SetDaily | completeDayTask | GetAchivmentType;

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
const updateTask = (category: string, id: string, task: TaskType): ActionsTypes => {
   return {
      type: UPDATE_TASK,
      category,
      id,
      task
   }
}
const deleteTask = (category: string, id: string | number, object: Object): ActionsTypes => {
   return {
      type: DELETE_TASK,
      category,
      object,
      id
   }
}
export const restoreTask = (category: string, id: string, object: TaskType): ActionsTypes => {
   return {
      type: RESTORE_TASK,
      category,
      id,
      object
   }
}
export const rePutTask = (category: string, id: string | number, object: Object): ActionsTypes => {
   return {
      type: REPUT_TASK,
      category,
      object,
      id
   }
}
export const createTask = (category: string, text: string): ActionsTypes => {
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
export const setDaily = (record: Object): ActionsTypes => {
   return {
      type: SET_DAILY,
      record
   }
}
export const completeAllDayTaskAction = (): ActionsTypes => {
   return {
      type: COMPLETE_ALL_DAY_TASK
   }
}
const completeTask = (category: string, id: string, task: TaskType): ActionsTypes => {
   return {
      type: COMPLETE_TASK,
      id,
      category,
      task
   }
}
const getAchivsAction=(achivments:any): ActionsTypes=>{
   return{
      type: GET_ACHIVMENTS,
      achivments
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
      api.me().then((response: any) => {
         dispatch(init(response))
         dispatch(setCurrentDay())
         dispatch(toggleFetching())
      })
   }
}
export const createTaskThunk = (category: string, text: string,): ThunksTypes => {
   return async (dispatch) => {
      dispatch(toggleFetching());

      const taskSend = {
         [category]: text
      }
      api.createTask(taskSend).then((responce: any) => {
         const aim = JSON.parse(responce)
         const id = Object.keys(aim)[0];
         dispatch(updateTask(category, id, aim[id]));
         dispatch(toggleFetching());
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
         dispatch(completeTask(category, id, newTask));
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
            dispatch(updateTask(category, id, { ...task, isInTrash: true }))
         })
      } else {

         api.deleteTask(taskSend)
         dispatch(deleteTask(category, id, task))
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
      dispatch(rePutTask(category, id, task))
      api.deleteTask(deleteTaskSend).then(() => {
         api.createTask(taskSend).then(() => {
         })
      })
      // .then(() => { dispatch(toggleFetching()) })
   }
}
export const editTaskThunk = (oldCategory: string, category: string, id: string, aim: string, task: TaskType): ThunksTypes => {
   return async (dispatch) => {
      dispatch(toggleFetching());
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
            dispatch(editTask(category, id, aim))
         })
      }).then(() => { dispatch(toggleFetching()) })

   }
}
export const toTrashTask = (category: string, id: string, task: TaskType): ThunksTypes => {
   return async (dispatch) => {
      task.isInTrash = true;
      dispatch(updateTask(category, id, task));
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
      dispatch(updateTask(category, id, task));
      api.updateTask({ [category]: { [id]: { ...task } } });
   }
}
export const setNewDailyRecord = (day: string, text: string): ThunksTypes => {
   return async (dispatch) => {


      api.createDailyRecord({ day, text }).then((responce: any) => {
         dispatch(setDaily(responce[0]));
      })
   }
}

export const completeAllDayTaskThunk = (): ThunksTypes => {
   return async (dispatch) => {
      dispatch(completeAllDayTaskAction())
      api.completeAllDayTasks();

   }
}
export const initAchivments=():ThunksTypes=>{
   return async (dispatch)=>{
    //@ts-ignore
         api.getAchivments().then((responce)=>{
            dispatch(getAchivsAction(responce));
         })
      
   }
}
export default appReducer;