import * as actionTypes from './action-type';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    dataSource: [],
    use: '0',
    disable: '1',
    defaultState: '0',
    addCharacterName: '王茂林',
    addCharacterInfo: '王茂林',
    addVisible: false
});

export default (state = defaultState, action) => {
    const { 
        CHANGE_DEFAULT_VALUE, 
        CHANGE_INPUT_VALUE, 
        CHANGE_TEXTAREA_VALUE, 
        OPEN_ADD_CHARACTER,
        CLOSE_ADD_CHARACTER,
        DATA_SOURCE
    } = actionTypes;
    switch(action.type) {
        case CHANGE_DEFAULT_VALUE:
            return state.set('defaultState', action.value);
        case CHANGE_INPUT_VALUE:
            return state.set('addCharacterName', action.value);
        case CHANGE_TEXTAREA_VALUE:
            return state.set('addCharacterName', action.value);
        case OPEN_ADD_CHARACTER:
            return state.set('addVisible', true);
        case CLOSE_ADD_CHARACTER:
            return state.set('addVisible', false);
        case DATA_SOURCE:
            return state.set('dataSource', action.data);
        default:
            return state;
    }
}