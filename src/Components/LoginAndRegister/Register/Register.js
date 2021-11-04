import React from 'react';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { Input,Button, Form,  } from 'antd';
import { poolData } from '../../../Pool';
import { useDispatch } from 'react-redux';
import { changeStatusPage } from '../../../features/Store/Store';
import './Register.scss'

export function Register() {
  const dispatch = useDispatch();

  const handleRegistration = (infos) => {
    console.log(infos)
    console.log(poolData)

  
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    userPool.signUp(infos.username, infos.password, [], null, (err, result) => {
      if (err) {
        console.log(err)
        return
      }
    })
    console.log("registred")
  }

  const handleRegistrationFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="registerPage">
      <div className="formLogin">
        <div className="RegisterWrapper" >S'inscrire</div>
        <Form name="basic" onFinish={(e) => handleRegistration(e)} onFinishFailed={() => handleRegistrationFailed()}>
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
            <Button style={{width: "100%", height: "40px", borderRadius: "5px"}} htmlType="submit">S'INSCRIRE</Button>
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