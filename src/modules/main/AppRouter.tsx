import { Route, Routes } from "react-router-dom";
import AppLayouts from "../layouts/AppLayouts";
import FrontPageContainer from "./FrontPage/FrontPageContainer";

const AppRouter = () => {
   return (
      <Routes>
         <Route path='/' element={<AppLayouts />} />
      </Routes>
   );
}
export default AppRouter;