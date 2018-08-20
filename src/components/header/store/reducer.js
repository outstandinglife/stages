import * as actionTypes from './action-type';
// immutable保证不会修改state的对象
import { fromJS } from 'immutable';
// 控制输入框动画的数据
const defaultState = fromJS({
    first: '',
    second: ''
});

export default (state = defaultState, action) => {
    const { UPDATE_NAV } = actionTypes;
    switch(action.type) {
        case UPDATE_NAV:
            return state.set('first', action.first).set('second', action.second);
        default:
            return state;
    }
}