import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../nav';
import Header from '../header';
import { Container, Left, Right } from './style';
import { Redirect } from 'react-router-dom';
import Storage from './../../common/js/storage';

class Home extends Component {
    authLogin() {
        const userinfo = Storage.get('userinfo');
        if (userinfo === undefined) {
            return <Redirect to='/login' />;
        } else {
            return (
                <Container className='container'>
                    <Left>
                        <Nav />
                    </Left>
                    <Right>
                        <Header />
                        {this.props.children}
                    </Right>    
                </Container>
            );
        }
    }   
    render() {
        return (<div>{this.authLogin()}</div>);
    }
}

export default connect(null, null)(Home);