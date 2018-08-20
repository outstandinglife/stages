import * as actionTypes from './action-type';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    auth: {},
    inputValue: '',
    loginPassword: '',
});

export default (state = defaultState, action) => {
    const { CHANGE_LOGIN_NAME, CHANGE_LOGIN_PASSWORD, LOGIN_USER_INFO } = actionTypes;
    switch(action.type) {
        case CHANGE_LOGIN_NAME:
            return state.set('inputValue', action.value);
        case CHANGE_LOGIN_PASSWORD:
            return state.set('loginPassword', action.value);
        case LOGIN_USER_INFO:
            return state.set('auth', action.data);
        default:
            return state;
    }
}