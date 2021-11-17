import React, { useState } from 'react';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { Input,Button, Form, notification } from 'antd';
import { poolData } from '../../../Pool';
import { useDispatch } from 'react-redux';
import OtpInput from 'react-otp-input';
import { changeStatusPage } from '../../../features/Store/Store';
import './Register.scss'
import {
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
} from '@ant-design/icons';

const openNotification = (placement) => {
  notification.info({
    description:
      'Ton compte à bien été créé',
    placement,
  });
};

export function Register() {
  const dispatch = useDispatch();
  const [registerStatus, setRegisterStatus] = useState("Register")
  const [verificationCode, setVerificationCode] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = (infos) => {
    setErrorMessage("")
    console.log(infos)
    const password1 = infos.password
    const password2 = infos.confirmPassword
    if (password1 !== password2) {
      setErrorMessage("Les mots de passe ne correspondent pas")
      console.log("les password sont differents")
      return
    }

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    userPool.signUp(infos.username, infos.password, [], null, (err, result) => {
      if (err) {
        console.log(err)
        return
      }
      else {
        setRegisterStatus("putVerificationCode");
        setUsername(infos.username);
        setPassword(infos.password);
        console.log("registred")
      }
    })

  }

  const handleRegistrationFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleChangeVerificationCode = (otp) => {
    setVerificationCode( otp );
    if (otp.length === 6) {
      console.log("validate")
      console.log("userName => ", userName)
      console.log("password => ", password)
      const authenticationData = {
        Username : userName,
        Password : password,
      };
      const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      var userData = {
          Username : userName,
          Pool : userPool,
      };
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      cognitoUser.confirmRegistration(otp, true, function(err, result) {
        if (err) {
            alert(err);
            return;
        }
        console.log('call result: ' + result);
        openNotification('bottomRight')
        dispatch(changeStatusPage("Login"))
    });
    }
  };

  if (registerStatus === "putVerificationCode") {
    return (
      <div className="InputDigit">
        <div style={{ marginBottom: "50px", color: "#5e79d9"}}>Un code de vérification a été envoyé à ton adresse email Ynov. </div>
        <div className="OtpInput">
            <OtpInput
            containerStyle="containerStyle"
            inputStyle="inputStyle"
            value={verificationCode}
            onChange={handleChangeVerificationCode}
            numInputs={6}
          />
        </div>
        <img style={{width: "100%", marginTop: "40px"}} src={"https://media3.giphy.com/media/6wcBC9tsubD5jrDL6g/giphy.gif"}/>
      </div>
    )
  }
  else {
  

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
          <div className="errorMsg"> 
            {errorMessage}
          </div>
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
}

export default Register;