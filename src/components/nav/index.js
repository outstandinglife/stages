import React, { Component } from 'react';
import MenuList from './../menuList/index';
import Logo from './../logo';

class Nav extends Component {
    render() {
        return (
            <div style={{minWidth: '180px'}}>
                <Logo />
                <MenuList />
            </div>
        );
    }
}

export default Nav;