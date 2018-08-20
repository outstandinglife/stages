import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb } from 'antd';
import { BreadcrumbCustomWarp } from './style';

class breadcrumbCustom extends Component {
    render() {
        return (
            <BreadcrumbCustomWarp>
                <Breadcrumb className='breadcrumb'>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    { <Breadcrumb.Item>{this.props.first}</Breadcrumb.Item> || '' }
                    { <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || '' }
                </Breadcrumb>
            </BreadcrumbCustomWarp>
        );
    }
}

export default connect(null, null)(breadcrumbCustom);