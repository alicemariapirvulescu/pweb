import React, { FormEvent, memo, ReducerAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../redux/slice'
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
import Header from "./header";
import UploadPhoto from "./upload-photo";
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from "primereact/inputtextarea";
import { HouseRequest } from "../redux/payloads";

export interface HomeManagerProps {
}

const HomeManager = () => {
    let navigate = useNavigate();
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [phone, setPhone] = useState("");
    const [bookingPeriod, setBookingPeriod] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const { isLoggedIn, image } = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch()
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const housePayload : HouseRequest =  {
            description: description,
            phone: phone,
            latitude: latitude,
            longitude: longitude,
            capacity: capacity,
            bookingPeriod: bookingPeriod,
            image: image,
            name: name, 
            address: address,
            city: city
        }
        console.log('Add house was called');
        console.log(housePayload);
    }

    return (
        <div className="card">
            <Header />
            <Card className="card-add">
                <h3 style={{ color: '#6366f1'}}>Add house</h3>
                <form onSubmit={handleSubmit}>

                    <h5 style={{ float: 'left'}}>Your city</h5>
                    <div className="field" >
                        <InputText style={{ width: '32rem' }} id="cityName" aria-describedby="Description-help" onChange={(e : any) => setCity(e.target.value) }/>
                        <p className="block add-header" id="Description-help">Enter your city.</p>
                    </div>

                    <h5 className="add-header">Name of house</h5>
                    <div className="field" >
                        <InputText style={{ width: '32rem' }} id="cityName" aria-describedby="Description-help" onChange={(e : any) => setName(e.target.value)}/>
                        <p className="block add-header" id="Description-help">This is required for management purposes.</p>
                    </div>

                    <h5 className="add-header">Your address</h5>
                    <div className="field" >
                        <InputText style={{ width: '32rem' }} id="address" aria-describedby="Description-address" onChange={(e : any) => setAddress(e.target.value)}/>
                        <p className="block add-header" id="Description-address" >Enter the full address as detailed as possible.</p>
                    </div>

                    <h5 className="add-header">Your phone</h5>
                    <div className="field" >
                        <InputText style={{ width: '32rem' }} id="phone" aria-describedby="phone-help" onChange={(e : any) => setPhone(e.target.value)}/>
                        <p className="block add-header" id="phone-help">Contact phone number.</p>
                    </div>

                    <div className='rowC' style={{ width: '32rem', textAlign: 'left' }} >
                        <h5 className="add-header" style={{ width: '15rem' }}>Capacity</h5>
                        <h5 className="add-header" style={{ width: '15rem', marginLeft:'1.5rem' }} >Number of days</h5>
                    </div>

                    <div className='rowC' style={{ width: '32rem' }} >

                        <InputNumber inputId="minmax-buttons" value={capacity} onValueChange={(e: any) => setCapacity(e.value)} mode="decimal" showButtons min={0} max={100} />
                        <InputNumber style={{ marginLeft: '0.5rem' }} inputId="minmax-buttons" value={bookingPeriod} onValueChange={(e: any) => setBookingPeriod(e.value)} mode="decimal" showButtons min={0} max={100} />

                    </div>

                    <div className='rowC' style={{ width: '32rem', textAlign: 'left' }} >
                        <p style={{ width: '16rem' }} className="block add-header" id="phone-help">Number of people</p>
                        <p style={{ width: '16rem' , marginLeft:'1.5rem' }} className="block add-header" id="phone-help">Number of days</p>
                    </div>

                    <div className='rowC' style={{ width: '32rem', textAlign: 'left' }} >
                        <h5 className="add-header" style={{ width: '15rem' }}>Longitude</h5>
                        <h5 className="add-header" style={{ width: '15rem' , marginLeft:'1.5rem' }} >Latitude</h5>
                    </div>

                    <div className='rowC' style={{ width: '32rem' }} >

                        <InputNumber style={{ width: '16rem' }} inputId="minmaxfraction" value={latitude} onValueChange={(e: any) => setLatitude(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={7} 
                        onChange={(e : any) => setLatitude(e.target.value)}/>
                        <InputNumber style={{marginLeft: '0.5rem', width: '16rem' }} inputId="minmaxfraction" value={longitude}  mode="decimal" minFractionDigits={2} maxFractionDigits={7} 
                        onValueChange={(e : any) => setLongitude(e.value)}/>

                    </div>

                    <div className='rowC' style={{ width: '32rem', textAlign: 'left' }} >
                        <p style={{ width: '16rem' }} className="block add-header" id="phone-help">Set exact latitude of house</p>
                        <p style={{ width: '16rem' , marginLeft:'1.5rem' }} className="block add-header" id="phone-help">Set exact longitude of house</p>
                    </div>


                    <h5 className="add-header">Description</h5>
                    <InputTextarea style={{ width: '32rem' }} value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={32} />
                    <p className="block add-header" id="help">House? Apartment? Rooms? What are the conditions?
                        Add details about </p>
                    <p className="block add-header" id="help">
                    your place and who are you willing to accomondate.</p>

                    <UploadPhoto />

                    <div>
                        <Button style={{ marginTop: '2rem' }} icon="pi pi-home" label="Save" />
                    </div>

                </form>
            </Card>
        </div >)

}

export default HomeManager