import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { getInfoUser } from "../../../redux/appReducer";
import {  getIsFetchingApp, getiSInitApp} from "../../../redux/appStateSelector";
import { AppStateType } from "../../../redux/store";
import FrontPage from "./FrontPage";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const FrontPageContainer = ({ initApp, isFetching, isInit}: HeaderProps) => {
   useEffect(() => {
      isInit || initApp()
   }, [])
   return (<>
      <Backdrop
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
         open={isFetching}
      >
         <CircularProgress color="inherit" />
      </Backdrop>
      <FrontPage />
   </>
   )
}

const mapStateToProps = (state: AppStateType) => {
   return {
      isFetching: getIsFetchingApp(state),
      isInit: getiSInitApp(state),

   }
}
const mapDispatchToProps = (dispatch: any) => {
   return {
      initApp: () => {
         dispatch(getInfoUser())
      }
   }
}
const connector = connect(mapStateToProps, mapDispatchToProps);
type HeaderProps = ConnectedProps<typeof connector>;
export default connector(FrontPageContainer);
