import React, { Component } from 'react';
import { LogoWrapp, LogoTitle, UserInfo, Img, UserName } from './style';

class Logo extends Component {
    render() {
        return (
            <LogoWrapp>
                <LogoTitle>大白猫</LogoTitle>
                <UserInfo>
                    <Img src={require('./../../static/userLogo.jpg')} />
                    <UserName>编程浪子</UserName>
                </UserInfo>
            </LogoWrapp>
        );
    }
}

export default Logo;