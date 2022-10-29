import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { AppStateType } from "../../redux/store";
import {  FormDataLog } from "../../redux/type";
import FormLoyauts from "../layouts/FormLayouts";
import ReduxLoginForm from "./FormLog";

type MapStatePropsType=null;
type MapDispatchPropsType={
   login:(formData:any)=>void
}
type OwnPropsType=null
type ContainerType=MapDispatchPropsType//&OwnPropsType& MapStatePropsType 
const FormLogContainer=({login}:ContainerType):JSX.Element=>{
   const onSubmit=(formData:any)=>{
      if( login===null){
         return;
      }
      login(formData);
   }
   return <FormLoyauts
   title="Вхід"
   text="Не маєте аккаунта?"
   link='/register'
   textLink='Зареєструйся тут'
   >
      <ReduxLoginForm onSubmit={onSubmit}/>
   </FormLoyauts> 
}

const mapDispatchToProps=(dispatch:any):any=>{
   return {
      login:(formData:FormDataLog):void=>{
         dispatch(login(formData));
      }
   }
}

export default connect<any,MapDispatchPropsType,any,AppStateType>(null,mapDispatchToProps)(FormLogContainer);
