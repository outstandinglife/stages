import * as actionTypes from './action-type';
import http from './../../../../common/js/http';
import baseURl from './../../../../common/js/baseURL';
import { fromJS } from 'immutable';
export const dfaultStateChange = (value) => ({
    type: actionTypes.CHANGE_DEFAULT_VALUE,
    value: value
});

export const addInputChange = (value) => ({
    type: actionTypes.CHANGE_INPUT_VALUE,
    value: value
});

export const addTextareaChange = (value) => ({
    type: actionTypes.CHANGE_TEXTAREA_VALUE,
    value: value
});

export const openAddCharacter = () => ({
    type: actionTypes.OPEN_ADD_CHARACTER
});

export const closeAddCharacter = () => ({
    type: actionTypes.CLOSE_ADD_CHARACTER
});

export const dataSources = (data) => ({
    type: actionTypes.DATA_SOURCE,
    data: fromJS(data)
});


export const getList = (pageNo, state) => {
    const url = `${baseURl}sys/role/list`;
    return (dispatch) => {
        http(url, 'post', {
            pageNo,
            state
        }).then((res) => {
            if (res.data.code === '0') {
                dispatch(dataSources(res.data.data.result));
            }
        })
    }
}