import { Field, reduxForm } from 'redux-form';
import { minLength, required } from '../../utils/validators';
import InputField from '../common/InputField';
import styles from './style.module.scss';

const FormLog = (props:any):JSX.Element => {
   const { handleSubmit } = props
   return (
      <form onSubmit={handleSubmit} className={styles.forms}>
         <Field
            className={styles.inputField}
            type='text'
            name='email'
            id='email'
            placeholder='Email'
            component={InputField}
            validate={[required, minLength]}
         />
         <Field
            className={styles.inputField}
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            component={InputField}
            validate={[required, minLength]}
         />
         {props.error ? (<div className={styles.inputErrorMessage}>{props.error}</div>) : null}
         <div>
            <button className={styles.buttonSubmit} type="submit" >Submit</button>
         </div>
      </form>
   )
}
const ReduxLoginForm = reduxForm({
   form: 'login-form'
})(FormLog);
export default ReduxLoginForm;