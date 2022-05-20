import { useState } from 'react';
import { Calendar } from 'primereact/calendar';

import { useDispatch, useSelector } from 'react-redux';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { PrimeIcons } from 'primereact/api';
import { InputTextarea } from "primereact/inputtextarea";


import './styles.scss';

const Booking = () => {

    const { user } = useSelector((state) => state.auth)
    const [enableReservation, setEnableReservation] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState();
    let navigate = useNavigate();
    const [message, setMessage] = useState(undefined);
    const [date, setdate] = useState(undefined);
    const [showMessage, setShowMessage] = useState(false);
    const [dates, setDates] = useState();


    const renderFooter = (name) => {
        return (
            <div>
                <p style={{ lineHeight: 1.5, textIndent: '1rem', textAlign: '-webkit-center' }}>
                    <i className="pi pi-exclamation-circle"> </i>
                    &nbsp;The accomodation request will be registered under name <b>{user.username}</b>
                </p>
                <Calendar className='center' id="minmax" showIcon={true} value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput
                    placeholder={'Staying dates'} />
                <InputNumber className='center' inputId="minmax-buttons" value={numberOfPeople} onValueChange={(e) => setNumberOfPeople(e.value)} mode="decimal" showButtons min={0} max={100}
                    placeholder={'Person number'} required />

                <p style={{ lineHeight: 1.5, textIndent: '1rem', textAlign: '-webkit-center' }}>
                    Add a mesasge for the owner. Who are you travelling with? Do you have pets? Anything useful. </p>
                <InputTextarea style={{ width: '45rem', marginTop: "1rem" }} value={message} onChange={(e) => setMessage(e.target.value)} rows={5} cols={32} />

                <div style={{ display: 'block' }}>
                    <Button label="Confirm" className='mt' icon="pi pi-check" onClick={submitReservation} autoFocus />
                    <Button label="Cancel" className="button-inline p-button-secondary mt" icon="pi pi-times"
                        onClick={disableReservationPopup} style={{ display: 'inline' }} />
                </div>

            </div>
        );
    }

    const disableReservationPopup = (e) => {
        e.preventDefault();
        console.log("Click back reservation");
        setNumberOfPeople(null);
        setdate(null);
        setEnableReservation(false);
        setPosition('right');
    }

    const submitReservation = (e) => {
        e.preventDefault();
        console.log("Call to submit reservation");
        setShowMessage(true);
    }

    const onHide = () => {
        setEnableReservation(false);
        setNumberOfPeople(null);
        setdate(null);
        setShowMessage(false);
    }

    const goToRestaurants = (e) => {
        setShowMessage(false);
        navigate("/restaurants");
    }

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" onClick={goToRestaurants} /></div>;

    return (

        <div >
            <Button icon="pi pi-info-circle" label="Create request" onClick={() => setEnableReservation(true)} ></Button>
            <Dialog header="Ask for accomodation" className='reservation-card' visible={enableReservation}
                position='right'
                onHide={() => onHide()} breakpoints={{ '960px': '75vw' }}
                footer={renderFooter('displayResponsive')} />
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Request for Booking successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your accomodation request is registered under name <b>{user.username}</b>. </p> <br />
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        When the owner checks your request, you will see the status on the reservations tab.
                    </p>
                </div>
            </Dialog>
        </div>
    );
}
export default Booking;