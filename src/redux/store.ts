import { applyMiddleware, combineReducers,compose, legacy_createStore as createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import authReducer from "./authReducer";
import appReducer from "./appReducer";

let rootReducer=combineReducers({
   form:formReducer,
   auth:authReducer,
   app:appReducer
 
});
type RootReducerType=typeof rootReducer;
export type AppStateType=ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.store=store.getState();
export default store;

export type AppDispatch = typeof store.dispatch
// export const UseAppDispatch: () => AppDispatch = useDispatch
