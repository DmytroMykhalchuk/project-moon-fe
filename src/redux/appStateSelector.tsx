import { AppStateType } from "./store";

export const getiSInitApp = (state: AppStateType) => {
   return state.app.isInitialize;
}
export const getIsFetchingApp = (state: AppStateType) => {
   return state.app.isFetching
}
export const getMain = (state: AppStateType) => {
   return state.app.main;
}

export const getMonth = (state: AppStateType) => {
   return state.app.month;
}
export const getWeek = (state: AppStateType) => {
   return state.app.week;
}
export const getDay = (state: AppStateType) => {
   return state.app.day;
}
export const getDaily = (state: AppStateType) => {
   return state.app.daily;
}
export const getCurrentDay = (state: AppStateType) => {
   return state.app.currentDay
}
export const getMaxDays = (state: AppStateType) => {
   return state.app.maxDays;
}
export const getCurrentMonth = (state: AppStateType) => {
   return state.app.currentMonth;
}
export const getStatDayFinished = (state: AppStateType) => {
   return state.app.statisticday;
}
export const getStatWeekFinished = (state: AppStateType) => {
   return state.app.statisticweek;
}
export const getStatMonthFinished = (state: AppStateType) => {
   return state.app.statisticmonth;
}
export const getAchivments=(state:AppStateType)=>{
   return state.app.achivments;
}
export const getMessagesState=(state:AppStateType)=>{
   return state.app.messages;
}
export const getIsBadge=(state:AppStateType)=>{
   return state.app.isBadge;
}
