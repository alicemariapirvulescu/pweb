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
import { authSlice, getBookings, updateReservationRequest } from '../redux/slice';
import { Card } from 'primereact/card';

import warning from './icons/warning.svg';
import './styles.scss';
import HeaderGuest from './header-guest';

const Bookings = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [enableReservations, setEnableReservations] = useState(true);
    const { acceptedReservations, pendingReservations } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getBookings());
    }, []);

    const setReservationAsDenied = (id) => {
        rejectReservationRequest(id);
        dispatch(getBookings());

        async function rejectReservationRequest(id) {
            await (dispatch(updateReservationRequest({ bookingId: id, bookingStatus: 'REJECTED' })));
        }
    }

    const listItems = pendingReservations.map((r) =>
        <Card style={{ marginBottom: "1rem", background: "rgb(248, 249, 250)" }}>
            <div className='rowC'>
                <Avatar label={r.ownerName != null ? r.ownerName.charAt(0) : 'U'} className="mr-2" shape="circle" size="xlarge" />
                <div>
                    <div className="mb" style={{ textAlign: "left" }}> Request for house: <b> {r.houseName}</b> </div>
                    <div className="mb" style={{ textAlign: "left" }}> Name of owner: <b> {r.ownerName}</b> </div>
                    <div className="mb" style={{ textAlign: "left" }}> Number of people: <b> {r.guestNo}</b> </div>
                    <div className="mb" style={{ textAlign: "left" }}> Period of housing: <b> {r.startDate} / {r.endDate} </b> </div>
                    <div className="mb" style={{ textAlign: "left" }}> Phone number of owner: <b> {r.ownerPhone} </b> </div>
                    <span className="mb">
                        <Button className="p-button-secondary" style={{ width: "10rem" }} label="Cancel" icon="pi pi-minus-circle"
                            onClick={() => { setReservationAsDenied(r.id) }} />
                    </span>

                </div>
                <div className="small-image-wrapper" style={{ backgroundImage: `url(${r.image})` }}>
                </div>

            </div>
        </Card>);

    const listAcceptedItems = acceptedReservations.map((r) =>
        <Card style={{ marginBottom: "1rem", background: "rgb(248, 249, 250)" }}>
            <div className='rowC'>
                <Avatar label={r.ownerName != null ? r.ownerName.charAt(0) : 'U'} className="mr-2" shape="circle" size="xlarge" />
                <div>
                    <div className="mb" style={{ textAlign: "left" }}> Request for house: <b> {r.houseName}</b> </div>
                    <div className="mb" style={{ textAlign: "left" }}> Name of owner: <b> {r.ownerName}</b> </div>
                    <div className="mb" style={{ textAlign: "left" }}> Number of people: <b> {r.guestNo}</b> </div>
                    <div className="mb" style={{ textAlign: "left" }}> Period of housing: <b> {r.startDate} / {r.endDate} </b> </div>
                    <div className="mb" style={{ textAlign: "left" }}> Phone number of owner: <b> {r.ownerPhone} </b> </div>
                    <div className="mb" style={{ textAlign: "left" }}> Address of house: <b> {r.address} </b> </div>
                    <div className='rowC'>
                        <Button className="p-button-info" style={{ width: "10rem" }} label={r.guestPhone} icon="pi pi-phone" />
                        <Button className="p-button-secondary" style={{ width: "10rem", marginLeft: '1rem' }} label="Cancel" icon="pi pi-minus-circle"
                            onClick={() => { setReservationAsDenied(r.id) }} />
                    </div>

                </div>
                <div className="small-image-wrapper" style={{ backgroundImage: `url(${r.image})` }}>
                </div>

            </div>
        </Card >);




    return (
        <div>
            <HeaderGuest />
            <div className='rowC'>

                <Card style={{ width: '35%' }} className='Reservations-card'>
                    <h4>
                        Reservations requests still pending:
                    </h4>
                    <div>
                        {listItems}

                    </div>

                </Card>

                <Card className="warning">

                    <div>

                        <img src={warning} width="30%" height="50 rem" />
                        <h3>  WARNING! </h3>
                        <h5>
                            <div style={{ textAlign: 'left', marginBottom: '1rem' }}>   < b> Remember safety precautions:</b>
                                <br />
                            </div>
                            <li style={{ textAlign: 'left', marginBottom: '0.5rem' }}> Be sure to get to know the person that accomodates you before going to their home<br />
                            </li>
                            <li style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                                We encourage you to get in contact with the person that accomodates before you take the
                                decision of going there.
                                <li style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                                    Contact them and have a chat first. <br />
                                </li>.<br /> <br />
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
                    <h4>
                        Reservations accepted:
                    </h4>
                    <div>
                        {listAcceptedItems}
                    </div>
                </Card>

            </div >
        </div >

    );
}
export default Bookings;