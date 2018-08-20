import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { actionCreators } from './store';
import history from './../../history';
import { LoginWarp, LoginBox, LoginTitle, LoginInput, InputItem, LoginIncon, Submit, Button } from './style';

class Login extends Component {
    componentWillMount() {
        const token = window.sessionStorage.getItem('token');
        if (token) {
            history.push('/');
        }
    }
    render() {
        const { changeInputName, changeInputPassword, inputValue, loginPassword, hendleLogin, history } = this.props;
        return (
            <LoginWarp>
                <LoginBox>
                    <LoginTitle>欢迎登录大白猫管理系统</LoginTitle>
                    <div>
                        <LoginInput>
                            <LoginIncon className='u_user'></LoginIncon>
                            <InputItem placeholder='请输入账户' value={inputValue} onChange={changeInputName}></InputItem>
                        </LoginInput>
                        <LoginInput>
                            <LoginIncon className='us_uer'></LoginIncon>
                            <InputItem placeholder='请输入密码' type='password' value={loginPassword} onChange={changeInputPassword}></InputItem>
                        </LoginInput>
                        <Submit>
                            <Button onClick={() => {hendleLogin(inputValue, loginPassword, history)}}>登录</Button>
                        </Submit>
                    </div>
                </LoginBox>
            </LoginWarp>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.getIn(['login', 'auth']),
        inputValue: state.getIn(['login', 'inputValue']),
        loginPassword: state.getIn(['login', 'loginPassword']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeInputName(e) {
            dispatch(actionCreators.loginName(e));
        },
        changeInputPassword(e) {
            dispatch(actionCreators.loginPassword(e));
        },
        hendleLogin(inputValue = '', loginPassword = '', history = null) {
            if (inputValue !== '' && loginPassword !== '') {
                dispatch(actionCreators.login({
                    username: inputValue,
                    password: loginPassword,
                }, history));
            } else {
                message.config({
                    top: 100
                });
                message.warning('请输入姓名或密码');
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);