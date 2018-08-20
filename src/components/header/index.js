import React, { Component } from 'react';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../breadcrumbCustom';
import Logout from './../logout';
import { HeaderWarp } from './style';

class Header extends Component {
    render() {
        const { first, second } = this.props;
        return (
            <HeaderWarp>
                <BreadcrumbCustom first={first} second={second} />
                <Logout />
            </HeaderWarp>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        first: state.getIn(['header', 'first']),
        second: state.getIn(['header', 'second'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);