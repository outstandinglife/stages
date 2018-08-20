import * as actionTypes from './action-type';
import { fromJS } from 'immutable';
import { message } from 'antd';
import http from './../../../common/js/http';
import Storage from './../../../common/js/storage';
import baseURL from './../../../common/js/baseURL';

export const login = (user, history) => {
    return (dispatch) => {
        const url = `${baseURL}account/login`;
        http(url, 'post', user).then((res) => {
            if (res.status === 200) {
                const data = res.data;
                if (data.code === '0') {
                    try {
                        dispatch(loginUserInfo(data.data));
                        Storage.set('userinfo', data.data);
                        Storage.set('token', data.data.token);
                        history.push('/home');
                    } catch (e) {
                        console.log(e);
                    }
                } else if (data.code === '10') {
                    try {
                        const state = data.data;
                        Storage.set('token', data.data.token);
                        history.push('/common/updatePassword', state);
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    message.warning(data.msg);
                }
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}

export const loginName = (e) => ({
    type: actionTypes.CHANGE_LOGIN_NAME,
    value: e.target.value
});

export const loginPassword = (e) => ({
    type: actionTypes.CHANGE_LOGIN_PASSWORD,
    value: e.target.value
});

export const loginUserInfo = (data) => ({
    type: actionTypes.LOGIN_USER_INFO,
    data: fromJS(data)
})