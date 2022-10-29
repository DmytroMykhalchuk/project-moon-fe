import { AppStateType } from "./store";

export const getIsAuthorize=(state: AppStateType)=>{
   return state.auth.isAuthorize;
}
export const getIsFetching=(state:AppStateType)=>{
   return state.auth.isFetching;
}