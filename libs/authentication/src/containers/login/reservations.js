import { Calendar } from 'primereact/calendar';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import ReactDOM from 'react-dom';
import { Rating } from 'primereact/rating';
import { RootState } from "apps/mycontentful/src/app/reducers";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { authSlice, getReservations } from '../redux/slice';
import { Card } from 'primereact/card';
import AddReservations from './addReview';

import warning from './icons/warning.svg';
import './styles.scss';
import Header from './header';

const Reservations = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [enableReservations, setEnableReservations] = useState(true);
    const { reservations } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getReservations());
        console.log(reservations);

    }, []);


    const disableReservationsPopup = (e) => {
        e.preventDefault();
        console.log("Click back Reservations");
        setEnableReservations(false);
    }

    const renderFooter = () => {
        return (
            <div>
                {listItems}
            </div>
        );
    }

    const listItems = reservations.map((r) =>
        <Card style={{ marginBottom: "1rem", background: "rgb(248, 249, 250)" }}>
            <div className='rowC'>
                <Avatar label={r.nameGuest != null ? r.nameGuest.charAt(0) : 'U'} className="mr-2" shape="circle" size="xlarge" />
                <div>
                    <div style={{ textAlign: "left" }}> Request for house: <b> {r.nameHouse}</b> </div>
                    <div style={{ textAlign: "left" }}> Name of guest: <b> {r.nameGuest}</b> </div>
                    <div style={{ textAlign: "left" }}> Number of people: <b> {r.numPeople}</b> </div>
                    <div style={{ textAlign: "left" }}> Period of housing: <b> {r.startPeriod} - {r.endPeriod} </b> </div>
                    <div style={{ textAlign: "left" }}> Phone number of guest: <b> {r.phoneGuest} </b> </div>
                    <div style={{ textAlign: "left" }}> Message for you: <b> {r.message} </b> </div>
                    <div style={{ textAlign: "right", marginBottom: '1rem' }}> <i>{r.nameGuest}</i> </div>
                    <span className="p-buttonset">
                        <Button className="p-button-success" style={{ width: "10rem" }} label="Accept" icon="pi pi-check-circle" />
                        <Button className="p-button-danger" style={{ width: "10rem" }} label="Deny" icon="pi pi-times-circle" />
                    </span>

                </div>
                <div className="small-image-wrapper" style={{ backgroundImage: `url(data:image/jpeg;base64,${r.image})` }}>
                </div>

            </div>
        </Card>);

    const listAcceptedItems = reservations.map((r) =>
        <Card style={{ marginBottom: "1rem" , background: "rgb(248, 249, 250)"}}>
            <div className='rowC'>
                <Avatar label={r.nameGuest != null ? r.nameGuest.charAt(0) : 'U'} className="mr-2" shape="circle" size="xlarge" />
                <div>
                    <div style={{ textAlign: "left" }}> Request for house: <b> {r.nameHouse}</b> </div>
                    <div style={{ textAlign: "left" }}> Name of guest: <b> {r.nameGuest}</b> </div>
                    <div style={{ textAlign: "left" }}> Number of people: <b> {r.numPeople}</b> </div>
                    <div style={{ textAlign: "left" }}> Period of housing: <b> {r.startPeriod} - {r.endPeriod} </b> </div>
                    <div style={{ textAlign: "left" }}> Phone number of guest: <b> {r.phoneGuest} </b> </div>
                    <div style={{ textAlign: "left" }}> Message for you: <b> {r.message} </b> </div>
                    <div style={{ textAlign: "right", marginBottom: '1rem'}}> <i>{r.nameGuest}</i> </div>
                        <Button className="p-button-info" style={{ width: "10rem", left: "20%" }} label={r.phoneGuest} icon="pi pi-phone" />

                </div>
                <div className="small-image-wrapper" style={{ backgroundImage: `url(data:image/jpeg;base64,${r.image})` }}>
                </div>

            </div>
        </Card>);




    return (
        <div>
            <Header />
            <div className='rowC'>

                <Card style={{ width: '35%' }} className='Reservations-card'>
                    <h3>
                        Reservations requests still pending:
                    </h3>
                    <div>
                        {listItems}

                        <div style={{ float: 'right !important' }} className='rowC'>
                            <Button label="Back" className="button-inline p-button-secondary mt" icon="pi pi-times"
                                onClick={disableReservationsPopup} />
                        </div> </div>

                </Card>

                <Card className="warning">

                    <div>

                        <img src={warning} width="30%" height="50 rem" />
                        <h3>  WARNING! </h3>
                        <h5>
                            <div style={{ textAlign: 'left', marginBottom: '1rem' }}>   < b> Remember safety precautions:</b>
                                <br />
                            </div>
                            <li style={{ textAlign: 'left', marginBottom: '0.5rem' }}> Be sure to check the documents of each person you help before taking them in your home. <br />
                            </li>
                            <li style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                                Carrefully accomodate groups larger than one family, especially if they have
                                different surnames. <br />
                            </li>
                            <li style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                                We encourage you to get in contact with your guest before you take the
                                decision of accomodating them and ask about those who travel with.<br /> <br />
                            </li>

                            <div style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                                <i>Our team is not responsible for the people you shelter. </i><br />
                            </div >

                            <div style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                                Let's win together!<br />
                            </div>

                        </h5>
                    </div>
                </Card>

                <Card style={{ width: '35%' }} className='Reservations-card'>
                    <h3>
                        Reservations accepted:
                    </h3>
                    <div>
                        {listAcceptedItems}
                    </div>
                </Card>

            </div >
        </div >

    );
}
export default Reservations;