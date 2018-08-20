import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './../../header/store';

class SensitiveTerms extends Component {
    componentWillMount() {
        const { updateNavigation } = this.props;
        updateNavigation();
    }
    render() {
        return (
            <div>
                敏感词汇
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNavigation() {
            dispatch(actionCreators.updateNav('系统管理', '敏感词汇'));
        }
    }
}

export default connect(null, mapDispatchToProps)(SensitiveTerms);