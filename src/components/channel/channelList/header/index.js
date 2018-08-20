import React, { Component } from 'react';
import BreadcrumbCustom from '../../../breadcrumbCustom';
import { HeaderWarp} from './style';

class Header extends Component {
    render() {
        return (
            <HeaderWarp className='header'>
                <BreadcrumbCustom first='渠道管理' second='新增渠道' />
            </HeaderWarp>
        );
    }
}

export default Header;