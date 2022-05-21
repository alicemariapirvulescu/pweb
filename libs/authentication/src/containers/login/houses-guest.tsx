import { height } from "@mui/system";
import { RootState } from "apps/mycontentful/src/app/reducers";
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HouseResponse } from "../redux/reponses";
import { getHouses, createNewBooking } from '../redux/slice';
import Booking from "./booking";
import './DataViewDemo.css';
import './styles.scss';
import './refugees.css';
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

export interface HousesProps {
}


const Houses = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { houses, user } = useSelector((state: RootState) => state.auth)
    const [layout, setLayout] = useState('grid');
    const [id, setId] = useState(0);
    const [enableReservation, setEnableReservation] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [dates, setDates] = useState<Date[] | undefined>(undefined);
    const [phone, setPhone] = useState('');
    const [houseId, setHouseId] = useState(0);


    useEffect(() => {
        dispatch(getHouses());
    }, []);


    const renderFooter = (name: any) => {
        return (
            <div>
                <p style={{ lineHeight: 1.5, textIndent: '1rem', textAlign: 'center' }}>
                    <i className="pi pi-exclamation-circle"> </i>
                    &nbsp;The accomodation request will be registered under name <b>{user.username}</b>
                </p>
                <Calendar className='center' id="minmax" showIcon={true} value={dates} onChange={(e: any) => setDates(e.value)} selectionMode="range" readOnlyInput
                    placeholder={'Staying dates'} />
                <InputNumber className='center' inputId="minmax-buttons" value={numberOfPeople} onValueChange={(e: any) => setNumberOfPeople(e.value)} mode="decimal" showButtons min={0} max={100}
                    placeholder={'Person number'} required />

                <div style={{ width: '45rem', marginTop: "1rem" }}  >
                    <InputText style={{ width: '49.5rem', marginLeft: '1rem' }} id="phone" aria-describedby="Description-help" onChange={(e: any) => setPhone(e.target.value)}
                        placeholder={'Your phone'} required value={phone} />
                </div>

                <div style={{ marginTop: '1rem', lineHeight: 1.5, textIndent: '1rem', textAlign: 'center' }}>
                    <p> Add a message for the owner. Who are you travelling with? Do you have pets? Anything useful. </p>
                </div>
                <InputTextarea style={{ width: '49.5rem', marginTop: "1rem" }} value={message} onChange={(e: any) => setMessage(e.target.value)} rows={5} cols={32} />

                <div style={{ display: 'block' }}>
                    <Button label="Confirm" className='mt' icon="pi pi-check" onClick={submitReservation} autoFocus />
                    <Button label="Cancel" className="button-inline p-button-secondary mt" icon="pi pi-times"
                        onClick={disableReservationPopup} style={{ display: 'inline' }} />
                </div>

            </div>
        );
    }

    const disableReservationPopup = (e: any) => {
        e.preventDefault();
        console.log("Click back reservation");
        setNumberOfPeople(0);
        setDates([]);
        setEnableReservation(false);
    }

    const submitReservation = (e: any) => {
        e.preventDefault();
        setShowMessage(true);
        console.log(" those are the dates: " + dates);
        if (dates != undefined) {
            dispatch(createNewBooking({
                startDate: dates[0], endDate: dates[1],
                phone: phone, message: message, peopleNo: numberOfPeople.toString(), houseId: houseId}));
            navigate('/bookings-guest');
        }
    }

    const onHide = () => {
        setEnableReservation(false);
        setNumberOfPeople(0);
        setDates([]);
        setShowMessage(false);
    }

    const goToRequests = (e: any) => {
        setShowMessage(false);
        navigate("/bookings-guest");
    }

    const setReservationClicked = (id: number) => {
        setEnableReservation(true);
        setHouseId(id);
    }

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" onClick={goToRequests} /></div>;

    const renderGridItem = (data: HouseResponse) => {
        return (
            <div className="col-12 md:col-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.city}</span>
                        </div>
                    </div>
                    <div className="product-grid-item-content">
                        <div className="image-wrapper" style={{ backgroundImage: `url(${data.image})` }}>

                        </div>
                        <div className="product-description">{data.name}</div>

                        <div className='rowC'>
                            <div style={{ width: "30%" }}>
                                <div className='rowC' style={{ width: "100%" }}>
                                    <i className="pi pi-map-marker product-category-icon"></i>
                                    <div >{data.city}</div>
                                </div>

                                <div className='rowC' style={{ width: "100%" }}>
                                    <i className="pi pi-users product-category-icon"></i>
                                    <div > {data.capacity} people capacity</div>
                                </div>

                                <div className='rowC' style={{ width: "100%" }}>
                                    <i className="pi pi-calendar-times product-category-icon"></i>
                                    <div> {data.bookingPeriod} days</div>
                                </div>

                            </div>
                            <div style={{ width: "65%", height: '5rem', marginRight: '1rem' }} className="medium-writing"> "<i> {data.description} "</i>
                            </div>
                        </div>

                        <div className="product-grid-item-bottom " style={{ marginTop: '0rem', marginLeft: "11.5rem", alignContent: 'center !important', justifyContent: 'center !important' }}>
                            <div >
                                <Button icon="pi pi-info-circle" label="Create request" onClick={() => setReservationClicked(data.id)} ></Button>
                                <Dialog header="Ask for accomodation" className='reservation-card' visible={enableReservation}
                                    position='right'
                                    onHide={() => onHide()} breakpoints={{ '960px': '75vw' }}
                                    footer={renderFooter('displayResponsive')} />
                                <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                                    <div className="flex align-items-center flex-column pt-6 px-3">
                                        <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                                        <h5>Request for Booking successful!</h5>
                                        <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                                            Your accomodation request is registered under name <b> {user.username}</b>. </p> <br />
                                        <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                                            When the owner checks your request, you will see the status on the reservations tab.
                                        </p>
                                    </div>
                                </Dialog>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    const itemTemplate = (product: HouseResponse, layout: string) => {
        if (!product) {
            return;
        }
        else return renderGridItem(product);

    }

    return (
        <div className="dataview-demo">
            <div className="card">
                <DataView value={houses} layout={layout}
                    itemTemplate={itemTemplate} />
            </div>
        </div>
    );
}

export default Houses;