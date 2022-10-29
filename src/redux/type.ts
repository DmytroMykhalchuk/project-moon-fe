import { ActionTypes } from '@mui/base';
import { Dispatch } from 'redux';

export type FormDataReg={
   name:string
   email:string
   password:string
   password_confirmation:string
}

export type FormDataLog={
   email:string
   password:string
}
// export type DispatchType=Dispatch<Acti