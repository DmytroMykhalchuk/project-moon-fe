import { Route, Routes } from "react-router-dom"
import FormLogContainer from './FormLogContainer';
import FormRegContainer from './FormRegContainer';

const AuthRouter = ():JSX.Element => {
   return (
      <Routes>
         // @ts-ignore
         <Route path="/login" element={<FormLogContainer />} />
         // @ts-ignore
         <Route path="/register" element={<FormRegContainer />} />
         // @ts-ignore
         <Route path="/*" element={<FormLogContainer />} />
      </Routes>
   )
}
export default AuthRouter;