import React, { FormEvent, memo, ReducerAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, registerUser, updateRoleOfUser } from '../redux/slice';
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
import { RadioButton } from "primereact/radiobutton";
import { RefugeeState } from "../redux/reponses";
import { RootState } from "apps/mycontentful/src/app/reducers";
import house from './icons/house.svg';

export interface SelectRoleProps {

}

const SelectRole = () => {
    let navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth)
    const [disabled, setDisabled] = useState(false);
    const [accept, setAccept] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [role, setRole] = useState<any>(null);

    const dispatch = useDispatch()
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('SelectRole clicked');
        newFunction();
        dispatch(getUser());
        setShowMessage(true);

        async function newFunction() {
            await dispatch(updateRoleOfUser(role));
        }
    }

    const navigateToPath = (e: React.MouseEvent<HTMLButtonElement>) => {
        setShowMessage(false);
        if (role == 'ROLE_GUEST') {
            navigate("/account-guest")
        }
        if (role == 'ROLE_HOST') {
            navigate("/new-house")
        }
    }

    const onAcceptChanged = (e: CheckboxChangeParams) => {
        setAccept(e.checked);
    }

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" onClick={navigateToPath} /></div>;

    if(!user) {
        return <></>
    }
    return (
        <div className="card">
            <HeaderLoggedOut />
            <Card className="card-personalised-register">
                <div> <img src={house} width="50 rem" height="50 rem" /></div>
                <h1 className="space-label">refugee-host</h1>
                <form onSubmit={handleSubmit}>

                    <div style={{ color: "black", fontSize: "medium", marginTop: "1rem" , marginLeft:"2rem"}}>
                        Hi {user.username}, please select what do you plan to use this app for:
                    </div>
                    <div className="field-radiobutton" style={{ color: "black", fontSize: "medium", marginTop: "1.5rem", marginLeft: "2rem" }}>
                        <RadioButton inputId="city1" name="city" value="ROLE_HOST" onChange={(e) => setRole(e.value)} checked={role === 'ROLE_HOST'} />
                        <label htmlFor="city1">I want to host refugees</label>
                    </div>
                    <div className="field-radiobutton" style={{ color: "black", fontSize: "medium", marginTop: "0.75rem", marginLeft: "2rem" }}>
                        <RadioButton inputId="city2" name="city" value="ROLE_GUEST" onChange={(e) => setRole(e.value)} checked={role === 'ROLE_GUEST'} />
                        <label htmlFor="city2">I want to get shelter</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox inputId="accept" name="accept" checked={accept} onChange={onAcceptChanged} style={{ marginTop: "1.5rem" }} required/>
                        <label htmlFor="accept">I agree to the terms and conditions*</label>
                    </div>

                    <div>
                        <Button style={{ marginTop: "1rem" }} label="Submit" icon="pi pi-user-plus" />
                    </div>

                    <div className="mt">
                        <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                            <div className="flex align-items-center flex-column pt-6 px-3">
                                <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                                <h5>Registration Successful!</h5>
                                <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                                    Your account is registered under name <b>{user.username}</b>.<br /> <br />
                                </p>
                            </div>
                        </Dialog>
                    </div>

                </form>
            </Card>
        </div>)

}

export default SelectRole;