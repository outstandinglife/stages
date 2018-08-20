import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from './../components/header/store';
import { reducer as commonReducer } from './../components/login/store';
// 整合reducer合并成一个大的reducer
export default combineReducers({
    header: headerReducer,
    login: commonReducer
});