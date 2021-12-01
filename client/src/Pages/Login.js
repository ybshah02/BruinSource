import React, { useState } from 'react';
import './Login.css';
import history from '../history';
import mainLogo from '../Files/bruinsource_logo.png'
import axios from 'axios';
import { useAuth } from '../Shared/ProvideAuth'

function Login(props) {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [responseText, setReponseText] = useState(null)

    const auth = useAuth()

    const onLogin = () => {

        if (username === '') {
            setReponseText('Please enter a username.')
            return
        }

        if (password === '') {
            setReponseText('Please enter a password.')
            return
        }


        console.log('called')

        axios.post('/api/login', { username: username, password: password })
            .then(res => {
                if (res.data.msg === 'success') {
                    auth.signin(username, password);
                    history.push('/dashboard')
                }
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <div className="Login">
            <img src={mainLogo} className="MainLogo" alt="mainLogo" />
            <form className="Inputs">
                <div className="Username">
                    <input
                        type="text"
                        placeholder="Username..."
                        required
                        onChange={input => {
                            setUsername(input.target.value)
                        }}
                    />
                </div>
                <div className="Password">
                    <input
                        type="password"
                        placeholder="Password..."
                        required
                        onChange={input => {
                            setPassword(input.target.value);
                        }}
                    />
                </div>
                <div>
                    <p>
                        {responseText}
                    </p>
                </div>
                <div className ="Buttons">
                    <button type="button" className="NewAccount" onClick={() => history.push('/register')}>New? Create an account.</button>
                    {/* <button type="button" className="ForgotPassword">Forgot your password?</button> */}
                    <button type="button" onClick={onLogin} className="SignIn" >Sign In</button>
                </div>
            </form>
        </div>
    );
}

export default Login;