import { Dispatch } from 'redux';
import { AppStateType } from './store';
import { FormDataReg, FormDataLog } from './type';
import { api } from "../api/api";
import { ThunkAction } from 'redux-thunk';


const AUTHORIZE = 'AUTHORIZE';
const UNAUTHORIZE = 'UNAUTHORIZE';
const TOGGLE_FATCHING = "TOGGLE_FATCHING";

const initialState = {
   isAuthorize: localStorage.access_token ? true : true as boolean, //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   isFetching: false as boolean,
}
type InitialState = typeof initialState;

const authReducer = (state = initialState, action: any): InitialState => {
   switch (action.type) {
      case AUTHORIZE:
         return {
            ...state,
            isAuthorize: true
         }
      case TOGGLE_FATCHING:
         return {
            ...state,
            isFetching: !state.isFetching
         }
      case UNAUTHORIZE:
         return {
            ...state,
            isAuthorize: false
         }
      default:
         return state;
   }
}
export default authReducer;

//action creators

type Authorize = {
   type: typeof AUTHORIZE
}
type ToggleFetching = {
   type: typeof TOGGLE_FATCHING
}
type UnAuth = {
   type: typeof UNAUTHORIZE
}
export type ActionsTypes = Authorize | ToggleFetching | UnAuth;
export type DispatchType = Dispatch<ActionsTypes>;
const authorize = (): ActionsTypes => {
   return {
      type: AUTHORIZE
   }
}
export const toggleFetching = (): ActionsTypes => {
   return {
      type: TOGGLE_FATCHING
   }
}

const unAuth = (): ActionsTypes => {
   return {
      type: UNAUTHORIZE
   }
}
//thunks
export type ThunkTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const register = (formData: FormDataReg): ThunkTypes => {
   return async (dispatch, AppStateType) => {
      api.register(formData).then(res => {
         console.log(res);
      }).then(() => {
         dispatch(authorize());
      })
   }
}

export const login = (formData: FormDataLog): ThunkTypes => {
   return async (dispatch) => {
      dispatch(toggleFetching());
      api.login(formData).then(() => {
         dispatch(authorize());
      }).then(() => {
         dispatch(toggleFetching());
      })
   }
}

export const logout = (): ThunkTypes => {
   return async (dispatch) => {
      api.logout().then(res => {
         console.log(res);
      }).then(() => {
         dispatch(unAuth());
      });
   }
} 

