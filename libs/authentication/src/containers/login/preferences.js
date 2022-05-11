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

import './styles.scss';

const Preferences = () => {
    const dispatch = useDispatch();
    const [distanceValue, setDistanceValue] = useState(10);
    const [foodValue, setFoodValue] = useState(50);
    const [staffValue, setStaffValue] = useState(50);
    const [placeValue, SetPlaceValue] = useState(50);
    const [priceValue, setPriceValue] = useState(50);


    const { id } = useParams();

    // useEffect(() => {
    //     if (id) {
    //         dispatch(getPreferences(id));
    //     }

    //     console.log(preferences);

    // }, []);


    return (
        <div  style={{ marginLeft: '2rem', marginRight: '2rem' ,
        justifyContent: 'center'}}>

            <h4> Select preferences </h4>

            <h5 style={{marginTop:'5rem'}}> Food: {foodValue}</h5>
            <Slider value={foodValue} className='slider' onChange={(e) => setFoodValue(e.value)} />

            <h5 className=' mt1'> Staff stars: {staffValue } </h5>
            <Slider value={staffValue} className='slider' onChange={(e) => setStaffValue(e.value)} />

            <h5 className=' mt1'> Place stars: {placeValue } </h5>
            <Slider value={placeValue} className='slider' onChange={(e) => SetPlaceValue(e.value)} />

            <h5 className=' mt1'> Price stars: {priceValue } </h5>
            <Slider value={priceValue} className='slider' onChange={(e) => setPriceValue(e.value)} />

            <h5 className=' mt1'> Choose distance: {distanceValue} km</h5>
            <Slider value={distanceValue} className='slider' onChange={(e) => setDistanceValue(e.value)} step={0.5}/>

            <Button label="Apply" icon='pi pi-sort-alt' style={{ marginTop: '60px', alignContent: 'center', justifyContent: 'center',
            position:'relative', left:'25%' }}
             onClick={() => onClick()} />

        </div>
    );
}
export default Preferences;