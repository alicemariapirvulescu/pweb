import React, { FormEvent, memo, ReducerAction } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from '../redux/slice';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import './styles.scss';
import { useState } from 'react';
import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox';

import { Navigate, useNavigate } from "react-router-dom";
import { Divider } from 'primereact/divider';
import { Dialog } from "primereact/dialog";
import HeaderloggedOut from "./header-logged-out";
import { Dropdown } from 'primereact/dropdown';
import HeaderLoggedOut from "./header-logged-out";
import { RegisterPayload } from "../redux/payloads";

export interface RegisterProps {

}

const Register = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [accept, setAccept] = useState(false);
    const [role, setRole] = useState<any>(null);

    const dispatch = useDispatch()
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('register clicked');
        const regPayload: RegisterPayload = { username: username, password: password, email: email, fullName: fullName, role: role.code as string }
        dispatch(registerUser(regPayload));
        setShowMessage(true);
    }

    const roles = [
        { name: 'Customer', code: 'CUSTOMER' },
        { name: 'Manager', code: 'MANAGER' }
    ];

    const header = <h6>Pick a password</h6>;
    const footer = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    const onPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        if (e.target.value === confirmPassword) {
            setDisabled(false);
        }
        else setDisabled(true);
    }

    const onConfirmPass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
        if (password === e.target.value) {
            setDisabled(false);
        }
        else setDisabled(true);
    }

    const onAcceptChanged = (e: CheckboxChangeParams) => {
        setAccept(e.checked);
    }

    const goToLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        setShowMessage(false);
        navigate("/");
    }

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" onClick={goToLogin} /></div>;

    return (
        <div className="card">
            <HeaderLoggedOut />
            <Card className="card-personalised-register">
                <h1 className="space-label">refugee-host</h1>
                <form onSubmit={handleSubmit}>

                    <div className="space-label">
                        <span className="p-float-label">
                            <InputText name='username' value={username} id="username" className='width-label' onChange={e => setUsername(e.target.value)} required />
                            <label htmlFor="username">Username</label> </span>
                    </div>

                    <div className="space-label">
                        <span className="p-float-label">
                            <InputText name='email' value={email} id="email" className='width-label' pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" title='Example: user@gmail.com'
                                onChange={e => setEmail(e.target.value)} required />
                            <label htmlFor="email">Email</label> </span>
                    </div>

                    <div className="space-label">
                        <span className="p-float-label">
                            <InputText name='fullName' value={fullName} id="fullName" className='width-label' onChange={e => setFullName(e.target.value)} required />
                            <label htmlFor="fullName">Full name</label> </span>
                    </div>

                    <div className="space-label">
                        <span className="p-float-label">
                            <Password name='password' value={password} className='width-label' onChange={onPassChange} header={header} footer={footer} required />
                            <label htmlFor="password">Password</label> </span>
                    </div>

                    <div className="space-label">
                        <span className="p-float-label">
                            <Password name='confirmPassword' value={confirmPassword} onChange={onConfirmPass} toggleMask feedback={false} required />
                            <label htmlFor="confirmPassword">Confirm password</label> </span>
                    </div>

                    <div className="role">
                        <Dropdown value={role} options={roles} onChange={(e: { value: any }) => setRole(e.value)} optionLabel="name" placeholder="Select role" />
                    </div>

                    <div className="field-checkbox">
                        <Checkbox inputId="accept" name="accept" checked={accept} onChange={onAcceptChanged} />
                        <label htmlFor="accept">I agree to the terms and conditions*</label>
                    </div>

                    <div>
                        <Button label="Register" icon="pi pi-user-plus" disabled={disabled} title='The passwords must match!' />
                    </div>

                    <div className="mt">
                        <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                            <div className="flex align-items-center flex-column pt-6 px-3">
                                <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                                <h5>Registration Successful!</h5>
                                <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                                    Your account is registered under name <b>{username}</b>.<br /> <br />

                                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                                        It will be valid next 30 days without activation.
                                        Please check <b>{email}</b> for activation instructions.</p>
                                </p>
                            </div>
                        </Dialog>
                    </div>

                </form>
            </Card>
        </div>)

}

export default Register;