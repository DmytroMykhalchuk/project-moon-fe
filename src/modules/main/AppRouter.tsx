import { Route, Routes } from "react-router-dom";
import { AppLayouts } from "../Layouts/AppLayouts";

const AppRouter: React.FC = () => {
   return (
      <Routes>
         <Route path='/' element={<AppLayouts />} />
      </Routes>
   );
}
export default AppRouter;