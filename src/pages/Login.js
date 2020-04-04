import React, { Component } from 'react';
import {MDBBtn, MDBInput} from 'mdbreact'
import Axios from 'axios';
import { API_URL } from '../helpers/API_URL';
import { Redirect } from 'react-router-dom';
import '../css/loginregister.css'
class Login  extends Component {
    state ={
        role : '',
        redirect : false
    }

    loginUser = () => {
        let username = this.username.value
        let password = this.password.value

        if(username && password) {
            Axios.post(API_URL + 'login', {
                username,
                password
            })
            .then((res) => {
                console.log(res.data)
                alert(' Login Success,\n Hello! ' + res.data[0].username)
                localStorage.setItem('role', res.data[0].role)
                this.setState({role : res.data[0].role, redirect: true})
            })
            .catch((err) => {
                alert('username or password invalid')
            })
        } else {
            alert('please fill all this form')
        }
    }

    render() {         
        console.log(this.state.role)
        if(this.state.role === 'admin') {
            return <Redirect to="/admin" />
        }
        else if(this.state.role === 'user') {
            return <Redirect to="/allproducts" />
        }
        return ( 
            <div id="background">
                <h2 style={{textAlign: 'center',paddingTop: 10}}>Login</h2>
                <div id="info">
                    <p>For Access Simple Crud, Please Insert Username: admin & Password: admin</p>
                    <p>For Access User Page, Please Register First</p>
                </div>

                <div id="styleForm"> 
                    <MDBInput type='text' label="Username" outline inputRef={(username) => this.username = username}/>
                    <MDBInput type="password" label="Password" outline inputRef={(password) => this.password = password} />
                </div>
                
                <div className="text-center">
                    <MDBBtn onClick={this.loginUser}>Login</MDBBtn>
                </div>

                <div id="donthaveaccount">
                    <a href="/register" style={{color:'black'}}>Don't have an account? Sign up here</a>
                </div>     
            </div>
         );
    }
}
 
export default Login;