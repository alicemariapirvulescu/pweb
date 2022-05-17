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
    const [distanceValue, setDistanceValue] = useState(10);
    const [foodValue, setFoodValue] = useState(50);
    const [staffValue, setStaffValue] = useState(50);
    const [placeValue, SetPlaceValue] = useState(50);
    const [priceValue, setPriceValue] = useState(50);
    const [cityValue, setCityValue] = useState('');


    const { id } = useParams();

    // useEffect(() => {
    //     if (id) {
    //         dispatch(getPreferences(id));
    //     }

    //     console.log(preferences);

    // }, []);

    const cities = [
        { name: 'Bucuresti' },
        { name: 'Ramnicul Valcea' },
        { name: 'Pitesti' }
    ];

    const onCityChange = (e) => {
        setCityValue(e.value);
    }

    return (
        <div style={{
            marginLeft: '2rem', marginRight: '2rem',
            justifyContent: 'center'
        }}>

            <h4  style={{ marginTop: '2rem' }}> Select preferences </h4>
            <Divider/>
            <h5 style={{ marginTop: '3rem' }}> City:</h5>
            <div className="field-radiobutton">
                        <RadioButton inputId="city1" name="city" value="Bucuresti" onChange={(e) => setCityValue(e.value)} checked={cityValue === 'Bucuresti'} />
                        <label htmlFor="city1">Bucuresti</label>
                    </div>
                    <div className="field-radiobutton">
                        <RadioButton inputId="city2" name="city" value="Ramnicul Valcea" onChange={(e) => setCityValue(e.value)} checked={cityValue === 'Ramnicul Valcea'} />
                        <label htmlFor="city2">Ramnicul Valcea</label>
                    </div>
            <h5 style={{ marginTop: '1rem' }}> Food: {foodValue/20}</h5>
            <Slider value={foodValue} className='slider' onChange={(e) => setFoodValue(e.value)} />

            <h5 className=' mt1'> Staff stars: {staffValue/20} </h5>
            <Slider value={staffValue} className='slider' onChange={(e) => setStaffValue(e.value)} />

            <h5 className=' mt1'> Place stars: {placeValue/20} </h5>
            <Slider value={placeValue} className='slider' onChange={(e) => SetPlaceValue(e.value)} />

            <h5 className=' mt1'> Price stars: {priceValue/20} </h5>
            <Slider value={priceValue} className='slider' onChange={(e) => setPriceValue(e.value)} />

            <h5 className=' mt1'> Choose distance: {distanceValue} km</h5>
            <Slider value={distanceValue} className='slider' onChange={(e) => setDistanceValue(e.value)} step={0.5} />

            <Button label="Apply" icon='pi pi-sort-alt' style={{
                marginTop: '60px', alignContent: 'center', justifyContent: 'center',
                position: 'relative', left: '25%'
            }}
                onClick={() => onClick()} />

        </div>
    );
}
export default Preferences;