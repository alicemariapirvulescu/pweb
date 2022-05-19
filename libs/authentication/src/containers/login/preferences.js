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
import { authSlice, getPreferences } from '../redux/slice';
import { Card } from 'primereact/card';
import AddPreferences from './addReview';
import { Slider } from 'primereact/slider';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider';

import './styles.scss';

const Preferences = () => {
    const dispatch = useDispatch();

    const [city, setCity] = useState('');
    const [dates, setDates] = useState();
    const [numberOfPeople, setNumberOfPeople] = useState();

    // useEffect(() => {
    //     if (id) {
    //         dispatch(getCities());
    //     }

    //     console.log(cities);

    // }, []);

    const cities = ['Bucuresti', 'Ramnicul Valcea', 'Pitesti'];

    const onCityChange = (e) => {
        setCity(e.value);
    }

    const AddPreferences = () =>{
        const BookingRequest = {
                city: city, 
        }
    }

    return (
        <div style={{
            marginLeft: '2rem', marginRight: '2rem',
            justifyContent: 'center'
        }}>

            <h4 style={{ marginTop: '2rem' }}> Select preferences </h4>
            <Divider />
            <h5 style={{ marginTop: '1rem'}}> City:</h5>
            <Dropdown  style={{ width: '16rem'}} value={city} options={cities} onChange={onCityChange} placeholder="Select a City" />

            <h5 style={{ marginTop: '1rem' }}> Booking period:</h5>
            <Calendar style={{ width: '16rem'}} id="range" value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput 
             placeholder={'Staying dates'}/>

            <h5 style={{ marginTop: '1rem' }}> Number of people:</h5>
            <InputNumber  inputId="minmax-buttons" value={numberOfPeople} onValueChange={(e) => setNumberOfPeople(e.value)} mode="decimal" showButtons min={0} max={100}
                placeholder={'Person number'} required />

            <h5 style={{ marginTop: '1rem'}}></h5>
            <Button  style={{marginTop: '1rem',  marginLeft:'4.5rem'}}label="Apply" icon='pi pi-search-plus' onClick={() => onClick()} />

        </div>
    );
}
export default Preferences;