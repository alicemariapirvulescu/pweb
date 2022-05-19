import React, { FormEvent, memo, ReducerAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, getRestaurants } from '../redux/slice'
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

export const OAUTH2_REDIRECT_URI = 'http://localhost:4200/oauth2/redirect'
export const API_BASE_URL = 'http://localhost:8080';

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export interface LoginProps {

}

const Login = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { isLoggedIn } = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch()
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('login user called');
        dispatch(loginUser({ username: username, password: password }));
    }

    if (isLoggedIn) {
        console.log("Navigate to account")
        return <Navigate to="/houses-guest" replace />;
    }

    return (
        <div className="card">
            <HeaderLoggedOut />
            <Card className="card-personalised">
                <h1 className="space-label">food-picker</h1>
                <form onSubmit={handleSubmit}>

                    <div className="space-label">
                        <span className="p-float-label">
                            <InputText value={username} id="username" className='width-label' onChange={e => setUsername(e.target.value)} required />
                            <label htmlFor="username">Username</label> </span>
                    </div>

                    <div className="space-label">
                        <span className="p-float-label">
                            <Password value={password} onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} required />
                            <label htmlFor="password">Password</label> </span>
                    </div>
                    <div>
                        <Button icon="pi pi-sign-in" label="Login" />
                    </div>

                </form>
            </Card>
            <div className="social-login">
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                   Log in with Google </a>
            </div>
        </div>)

}

export default Login