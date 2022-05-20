import React, { FormEvent, memo, ReducerAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from '../redux/slice'
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import './styles.scss';
import 'primeicons/primeicons.css';

import { useState } from 'react';
import { RootState } from "apps/mycontentful/src/app/reducers";
import { Navigate, useNavigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import HeaderLoggedOut from "./header-logged-out";
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import house from './icons/house.svg';
import googleLogo from './icons/google-logo.png';

export const OAUTH2_REDIRECT_URI = 'http://localhost:4200/oauth2/redirect'
export const API_BASE_URL = 'http://localhost:8080';

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export interface LoginProps {

}

const Login = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { isLoggedIn, user } = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch()
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('login user called');
        dispatch(loginUser({ username: username, password: password }));
    }

    if (isLoggedIn) {
        console.log("Navigate to account")
        if (user?.role == 'ROLE_GUEST') {
            return <Navigate to="/account-guest" replace />;
        }
        else return <Navigate to="/account-owner" replace />;
    }

    return (
        <div className="card">
            <HeaderLoggedOut />
            <Card className="card-personalised">
                <div>
                    <img src={house} width="50 rem" height="50 rem" />
                </div>

                <h1 className="space-label">refugee-host</h1>
                <form onSubmit={handleSubmit}>

                    <div className="space-label">
                        <span className="p-float-label" style={{ marginTop: '2rem' }}>
                            <InputText value={username} id="username" className='width-label' onChange={e => setUsername(e.target.value)} required />
                            <label htmlFor="username">Username</label> </span>
                    </div>

                    <div className="space-label">
                        <span className="p-float-label">
                            <Password value={password} onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} required />
                            <label htmlFor="password">Password</label> </span>
                    </div>

                    <div className="social-login">
                        <a className="google" href={GOOGLE_AUTH_URL} >
                            <img width="40rem" height="40rem" src={googleLogo} alt="Google" />
                            <div style={{ fontSize: "medium" }}> Log in with Google </div>
                        </a>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <Button icon="pi pi-sign-in" label="Login" />
                    </div>

                </form>
            </Card>

        </div>)

}

export default Login