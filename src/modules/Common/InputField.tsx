import styles from './style.module.scss';
type InputFieldType={
   input:any
   meta:any
   props:any
}

const InputField = ({ input, meta, ...props }:InputFieldType) => {

   const hasError = meta.touched && meta.error;
   const clazz = hasError ? styles.inputErrorMessage : '';
   return (
      <div>
         <div className={clazz}>
            <input
               {...input} {...props} />
         </div>
         <div className={hasError ? styles.inputErrorMessage:''}>
            {hasError && <span>{meta.error}</span>}
         </div>
      </div>
   )
}
export default InputField;