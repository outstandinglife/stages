import React from 'react'
export default class Common extends React.Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}