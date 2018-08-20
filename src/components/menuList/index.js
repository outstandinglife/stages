import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import Storage from './../../common/js/storage';
const SubMenu = Menu.SubMenu;

class MenuList extends Component {
    constructor(props) {
        super(props);
        this.rootSubmenuKeys = [];
        this.state = {
            openKeys: ['']
        }
    }
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    componentDidMount() {
        let MenuData = Storage.get('userinfo');
        this.renderKey(MenuData.menuList);
        let renderNode = this.renderMenu(MenuData.menuList);
        this.setState({
            renderNode
        });
    }
    renderKey = (data) => {
        return data.map((item) => {
            this.rootSubmenuKeys.push(item.text);
        });
    }
    renderMenu = (data) => {
        return data.map((item) => {
            if (item.flag !== '1') {
                if (item.menus && item.menus.length) {
                    return (
                        <SubMenu key={item.text} title={<span>{item.text}</span>}>
                            { this.renderMenu(item.menus) }
                        </SubMenu>
                    )
                }
                return <Menu.Item key={item.text}>
                    <Link to={item.url}>{item.text}</Link>
                </Menu.Item>;
            }
        });
    }
    render() {
        return (
            <Menu
                mode="inline"
                theme='dark'
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ width: '100%' }}
            >
                { this.state.renderNode }
            </Menu>
        );
    }
}

export default MenuList;