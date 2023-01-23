import { NavLink } from 'react-router-dom';
import styles from './style.module.scss';

type FormHeaderType = {
   title: string
   textLink: string
   text: string
   link: string
}

const FormHeader:React.FC<FormHeaderType> = ({ title, textLink, text, link } ) => {
   return (
      <div className={styles.headerForm}>
         <h3 className={styles.headerForm__title}>{title}</h3>
         <p>{text} <NavLink to={link}>{textLink}</NavLink></p>
      </div>
   )
}
export default FormHeader;