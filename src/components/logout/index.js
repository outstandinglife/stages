import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { LogoutWarp, ImgWarp, Userpic, LogutText } from './style';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from './../../history';
import Storage from '../../common/js/storage';
import http from './../../common/js/http';
import baseURl from './../../common/js/baseURL';

class Logout extends Component {
    updatePassword = () => {
        const state = Storage.get('userinfo');
        history.push('/common/updatePassword', state);
    }
    logout = () => {
        Storage.clear();
        history.push('/login');
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item key='0'>
                    <div onClick={this.updatePassword}>修改密码</div>
                </Menu.Item>
                <Menu.Item key='1'>
                    <div onClick={this.logout}>退出登录</div>
                </Menu.Item>
            </Menu>
        );
        return (
            <LogoutWarp>
                <div>
                    <ImgWarp>
                        <Userpic src={require('../../static/userLogo.jpg')} />
                    </ImgWarp>
                    <LogutText>
                    </LogutText>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <span>
                            欢迎登录 <Icon type='down' />
                        </span>
                    </Dropdown>
                </div>
            </LogoutWarp>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

Logout.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);