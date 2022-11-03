import "./App.css";
import { connect } from "react-redux";
import { getIsAuthorize, getIsFetching } from "./redux/authSelector";
import { Route, Routes } from "react-router-dom";
import AuthRouter from "./modules/auth/AuthRouter";
import AppRouter from "./modules/main/AppRouter";
import Preloader from "./modules/common/Preloader";

const App = ({ isFetching, isAuthorize }) => {
  if (!isAuthorize) { //!!!jkhfghdgfhfdghfgthfghngcf jchgfj cgf jcfghj hcfhg jcfghj cfhgj hf
    return (
      <>
      <Preloader isFetching={isFetching}  />
        <Routes>
          <Route path="*" element={<AuthRouter />} />
        </Routes>
      </>
    )
  } else {
    return <Routes>
      <Route path="/*" element={<AppRouter />} />
    </Routes>
  }
};

const mapStateToProps = (state) => {
  return {
    isFetching: getIsFetching(state),
    isAuthorize: getIsAuthorize(state),
  }
}
export default connect(mapStateToProps)(App);
