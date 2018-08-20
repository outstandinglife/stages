import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './../../header/store';

class InformationTemplate extends Component {
    componentWillMount() {
        const { updateNavigation } = this.props;
        updateNavigation();
    }
    render() {
        return (
            <div>
                短信模板
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNavigation() {
            dispatch(actionCreators.updateNav('系统管理', '短信模板'));
        }
    }
}

export default connect(null, mapDispatchToProps)(InformationTemplate);