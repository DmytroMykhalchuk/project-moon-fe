import { Route, Routes } from "react-router-dom";
import AppLayouts from "../layouts/AppLayouts";

const AppRouter = () => {
   return (
      <Routes>
         <Route path='/' element={<AppLayouts />} />
      </Routes>
   );
}
export default AppRouter;