import React, { useState } from 'react';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import './Login.scss';
import { poolData } from '../../../Pool';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import OtpInput from 'react-otp-input';
import { LoadingOutlined } from '@ant-design/icons';
import { changeStatusPage } from '../../../features/Store/Store';

export function Login() {

      const dispatch = useDispatch();
      const [loginStatus, setLoginStatus] = useState("Login");
      const [userName, setUsername] = useState("Login");
      const [otpValue, setOtpValue] = useState("");
      const [newPassword1, setNewPassword1] = useState("");
      const [newPassword2, setNewPassword2] = useState("");
      const [passSame, setPassSame] = useState(true);
      const [stateLastButton, setStateLastButton] = useState("Save my changes");
      const [isLoggingIn, setIsLoggingIn] = useState(false);
      const [isErrorOnLogin, setErrorOnLogin] = useState(false);

      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      function resetPassword() {
        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        const userData = {
            Username : userName,
            Pool : userPool,
        };
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
        cognitoUser.forgotPassword({
            onSuccess: function(result) {
                console.log('call result: ' + result);
            },
            onFailure: function(err) {
                alert(err);
            },
        });
        setLoginStatus("InputDigit")
    }

    const handleChangeOtp = (otp) => {
      setOtpValue( otp )
    };
    
    function inputVerificationCode() {
      if (stateLastButton !== "Save my changes") {
        return
      }
      setStateLastButton("Loading")
      const authenticationData = {
        Username : userName,
        Password : newPassword1,
      };
      const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
      const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      var userData = {
          Username : userName,
          Pool : userPool,
      };
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      cognitoUser.confirmPassword(otpValue, newPassword1, {
        onSuccess: data => {
          cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
              setStateLastButton("You have successfully changed your password");
            }
          });
        },
        onFailure: err => {
          console.error("onFailure:", err);
        }
      });
      // setLoginStatus("Login")
    }

    const loginFromRecover = () => {
      if (newPassword1 !== newPassword2) {
        setPassSame(false);
        return;
      }
      inputVerificationCode();
    }

      const login = (values) => {
        // setIsLoggingIn(true)
        //   console.log(values)
        // localStorage.setItem("User", values.username)
        // const authenticationData = {
        //   Username : values.username,
        //   Password : values.password,
        // };
        // const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        // const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        // const userData = {
        //     Username : values.username,
        //     Pool : userPool,
        // };
        // const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        // cognitoUser.authenticateUser(authenticationDetails, {
        //   onSuccess: function (result) {
        //     localStorage.setItem('Token', result.idToken.jwtToken);
        //     setErrorOnLogin(false);
        //     if (result.accessToken.payload['cognito:groups']) {
        //         if (result.accessToken.payload['cognito:groups'].includes("Admin") === true) {
        //             localStorage.setItem('Token', result.idToken.jwtToken);
        //             dispatch(changeStatusPage("AdminPage"));
        //             dispatch(changeUserName(values.username));
        //             dispatch(changeToken(result.idToken.jwtToken));
        //             localStorage.setItem("Admin", "true")

        //         }
        //         else {
        //             localStorage.setItem('Token', result.idToken.jwtToken);
        //             dispatch(changeStatusPage("UserPage"));
        //             dispatch(changeUserName(values.username));
        //             dispatch(changeToken(result.idToken.jwtToken));
        //             localStorage.setItem("Admin", "false")
        //         }
        //     }
        //     else {
        //         localStorage.setItem('Token', result.idToken.jwtToken);
        //         dispatch(changeStatusPage("UserPage"));
        //         dispatch(changeUserName(values.username));
        //         dispatch(changeToken(result.idToken.jwtToken));
        //         localStorage.setItem("Admin", "false")
        //     }

        //   },
        //   onFailure: function(err) {
        //     setErrorOnLogin(true)
        //     console.log(err)
        //   }
        // });
      }
    
    if (loginStatus === "Forgot") {
      return (
        <div className="loginPage">
            <div style={{width: "30%", marginLeft: "35%"}}>
            </div>
            <div>
            <Input style={{width: "90%", padding: "10px", borderRadius: "5px", marginLeft: "5%"}} placeholder="ENTRE TON EMAIL YNOV" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
              </div>
              <div style={{width: "90%", marginLeft: "5%", marginTop: "20px"}}>
                <Button style={{width: "100%", borderRadius: "5px", height: "40px"}} onClick={() => resetPassword()}>Envoyer le code de récupération</Button>
              </div>
            <div style={{textAlign: "center", marginTop: "20px"}} onClick={() => setLoginStatus("Login")}>Retour au Login</div>
          </div>
        )
    }
    if (loginStatus === "InputDigit") {
      if (otpValue.length !== 6) {
      return (
        <div className="InputDigit">
          <div style={{ marginBottom: "50px", color: "#5e79d9"}}>Un code de vérification a été envoyé à ton adresse email Ynov. </div>
          <div className="OtpInput">
              <OtpInput
              containerStyle="containerStyle"
              inputStyle="inputStyle"
              value={otpValue}
              onChange={handleChangeOtp}
              numInputs={6}
            />
          </div>
          <img style={{width: "100%", marginTop: "40px"}} src={"https://media3.giphy.com/media/6wcBC9tsubD5jrDL6g/giphy.gif"}/>
        </div>

      )
      }
      else {
        return (
          <div className="loginPage">
          <div style={{width: "30%", marginLeft: "35%"}}>
            </div>
            <div style={{fontSize: 22, color: "#236192", marginTop: "-50px", marginBottom: "50px"}}>Back office</div>
            <div style={{fontSize: 22, color: "#236192", marginTop: "-50px", marginBottom: "50px"}}>- Recover your password -</div>
          <div style={{color: "white"}}>Create a new password (must have at least 8 characters, a capital letter and a special character : @#?...) </div>
            <div>
            <Input.Password style={{width: "30%", padding: "10px", borderRadius: "10px", marginTop: "50px"}} onChange={(e) => setNewPassword1(e.target.value)} placeholder="NEW PASSWORD" />
            </div>
            <div>
            <Input.Password style={{width: "30%", padding: "10px", borderRadius: "10px", marginTop: "30px"}}  onChange={(e) => setNewPassword2(e.target.value)} placeholder="CONFIRM NEW PASSWORD" />
            </div>

            {
              passSame === true ? <div></div> : <div style={{textAlign:"center", color: "#ff0001", marginTop: "10px", fontSize: 18}}>Passwords are different</div>
            }
            {
              stateLastButton === "Loading"? 
              <div className="btnForgot" onClick={() => loginFromRecover()}><LoadingOutlined /></div> : 
              <div className="btnForgot" onClick={() => loginFromRecover()}>{stateLastButton}</div>
            }
            <div className="ForgotLogin" onClick={() => setLoginStatus("Login")}>Back to login</div>


          </div>
        )
      }
    }

    return (
      <div className="loginPage">
        <div   className="formLogin">
        <div style={{fontSize: 22, color: "#236192", marginTop: "-50px", marginBottom: "50px", color: "#42ab9e", borderBottom: "1px solid #42ab9e"}}>Se connecter</div>
      <Form
          name="basic"
          onFinish={login}
          onFinishFailed={onFinishFailed}
        >
          <div>
          </div>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Il manque l\'adresse mail',
              },
            ]}
          >
            <Input placeholder="EMAIL YNOV" style={{padding: "10px", borderRadius: "5px"}}/>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Il manque le mot de passe',
              },
            ]}
          >
          <Input.Password placeholder="MOT DE PASSE" style={{padding: "10px", borderRadius: "5px"}} />
          </Form.Item>

          <div style={{width: "100%"}}>
            {
              (isLoggingIn === true && isErrorOnLogin === false)  ?
              <Button style={{width: "100%", backgroundColor: "white", padding: "10px", borderRadius: "5px", height: "100%", marginLeft: "0%"}} type="primary" htmlType="submit">
              <LoadingOutlined style={{color: "#236192"}}/>
            </Button>
              :
              <div>
              <div style={{width: "100%"}}>
                <Button style={{width: "100%", height: "40px", borderRadius: "5px"}}>SE CONNECTER</Button>
              </div>
              <div className="noAccountButton" onClick={() => dispatch(changeStatusPage("Register"))}> 
                Tu n'as pas encore de compte ? Inscrit-toi
                </div>
                </div>
            }

              </div>
              {
                isErrorOnLogin === true? <div style={{color:"red", marginTop: "20px"}}>Wrong Email or password </div> : null
              }
        <div style={{textAlign: "center", cursor: "pointer"}} onClick={() => setLoginStatus("Forgot")}>Mot de passe oublié ?</div>

        </Form>
        </div>

      </div>

      );
  
}

export default Login;

  