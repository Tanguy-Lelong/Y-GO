import React, { Component } from 'react';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { Select, Input,Button, Form,  } from 'antd';
import { poolData } from '../Pool';
import './LoginAndRegisterWrapper.scss'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  changeUserName,
  changeStatusPage,
  changeToken,
  storeStatusPage,
  changeUserMenuSelected
} from '../features/Store/Store';


const { Option } = Select;



export function Register() {
  const dispatch = useDispatch();
    //   onChangeScreen() {
    //     this.props.changeScreen(this.state.isLoginScreen)
    //   }
    //   onChangeUserStatus() {
    //     this.props.changeUserStatus(this.state.isLogged)
    //   }
    //   onChangeUserName() {
    //     this.props.changeUsername(this.state.username)
    //   }

    //   handleUsername = (event) => {
    //     this.setState({username: event.target.value});
    //   }

    //   handleSecondName = (event) => {
    //     this.setState({secondName: event.target.value});
    //   }

    //   handleName = (event) => {
    //     this.setState({name: event.target.value});
    //   }
    
    //   handlePassword = (event) => {
    //     this.setState({password: event.target.value});
    //   }

    //   handleChange = (value) => {
    //     this.setState({gender: value})
    //   }
      
    const register = () => {
      return

      const username = this.state.username;
      const password =  this.state.password;
      var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

      
      var attributeList = [];

      var email = {
        Name : 'email',
        Value : this.state.username
      };
      new AmazonCognitoIdentity.CognitoUserAttribute(email);

  
      attributeList.push(email);

      userPool.signUp(username, password, attributeList, null, function(
        err,
        result
      ) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        var cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
      });

      }

      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      return (
        <div className="loginPage">
          <div className="formLogin">
            <div style={{fontSize: 22, color: "#236192", marginTop: "-50px", marginBottom: "50px", color: "#42ab9e", borderBottom: "1px solid #42ab9e"}}>S'inscrire</div>
            <Form name="basic" onFinish={register} onFinishFailed={onFinishFailed}>
              <Form.Item name="username" rules={[{ required: true, message: 'Il manque l\'adresse mail',},]}>
                <Input placeholder="EMAIL YNOV" style={{padding: "10px", borderRadius: "5px"}}/>
              </Form.Item>
              <Form.Item name="password" rules={[{required: true,message: 'Il manque le mot de passe',},]}>
                <Input.Password placeholder="MOT DE PASSE" style={{padding: "10px", borderRadius: "5px"}} />
              </Form.Item>
              <Form.Item name="confirmPassword" rules={[{required: true,message: 'Merci de confirmer le mot de passe',},]}>
                <Input.Password placeholder="CONFIRMER LE MOT DE PASSE" style={{padding: "10px", borderRadius: "5px"}} />
              </Form.Item>
              <div style={{width: "100%"}}>
                <Button style={{width: "100%", height: "40px", borderRadius: "5px"}}>S'INSCRIRE</Button>
              </div>
              <div style={{padding: "10px", textAlign: "center", marginTop: "10px", cursor: "pointer"}} onClick={() => dispatch(changeStatusPage("Login"))}> 
                Tu as deja un compte ? Connecte toi
              </div>
            </Form>
          </div>
        </div>
      )
}

export default Register;