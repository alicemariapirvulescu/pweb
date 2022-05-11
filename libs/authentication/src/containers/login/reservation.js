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

import './styles.scss';

const Reservation = () => {

    const { user } = useSelector((state) => state.auth)
    const [enableReservation, setEnableReservation] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState();
    let navigate = useNavigate();
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    const [date, setdate] = useState(undefined);
    const [showMessage, setShowMessage] = useState(false);

    let minDate = new Date();
    minDate.setMonth(month);
    minDate.setFullYear(year);
    minDate.setHours(null);

    let maxDate = new Date();
    maxDate.setMonth(nextMonth);
    maxDate.setFullYear(nextYear);
    maxDate.setHours(null);

    const renderFooter = (name) => {
        return (
            <div>
                <p style={{ lineHeight: 1.5, textIndent: '1rem', textAlign: '-webkit-center' }}>
                    <i className="pi pi-exclamation-circle"> </i>
                    &nbsp;The reservation will be registered under name <b>{user.username}</b>
                </p>
                <Calendar className='center' id="minmax" showIcon={true} showTime={true} showSeconds={false} stepMinute={15} value={date} onChange={(e) => setdate(e.value)}
                    minDate={minDate} maxDate={maxDate} placeholder={"Select time"} readOnlyInput required/>
                <InputNumber className='center' inputId="minmax-buttons" value={numberOfPeople} onValueChange={(e) => setNumberOfPeople(e.value)} mode="decimal" showButtons min={0} max={100}
                    placeholder={'Person number'} required/>

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

    const onClick = () => {
        setEnableReservation(true);
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
            <Button label="Make a reservation" icon="pi pi-calendar-times" onClick={() => onClick()} />
            <Dialog header="Make a reservation" className='reservation-card' visible={enableReservation}
                position='right'
                onHide={() => onHide()} breakpoints={{ '960px': '75vw' }}
                footer={renderFooter('displayResponsive')} />
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Request for reservation successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your reservation request is registered under name <b>{user.username}</b>. </p> <br/>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        When a manager checks your request, you will receive an email on <b>{user.email}</b> with the status.
                    </p>
                </div>
            </Dialog>
        </div>
    );
}
export default Reservation;