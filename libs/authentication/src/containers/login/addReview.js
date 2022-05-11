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
import { authSlice, getAddReviews } from '../redux/slice';
import { Card } from 'primereact/card';
import { saveReview } from '../redux/slice'
import { InputTextarea } from 'primereact/inputtextarea';


import './styles.scss';

const AddReviews = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [enableAddReviews, setEnableAddReviews] = useState(false);
    const [food, setfood] = useState(0);
    const [staff, setstaff] = useState(0);
    const [place, setplace] = useState(0);
    const [price, setprice] = useState(0);
    const [message, setMessage] = useState("");
    const { AddReviews, restaurant, user } = useSelector((state) => state.auth)
    const { id } = useParams();

    const disableAddReviewsPopup = (e) => {
        e.preventDefault();
        console.log("Click back AddReviews");
        setEnableAddReviews(false);
    }

    const renderFooter = () => {
        return (
            <div>
                <div className='rowC'>
                    How was the food? &nbsp;
                    <Rating className='rat' value={food} cancel={false} onChange={(e) => setfood(e.value)} required />
                </div>

                <div className='rowC' style={{ paddingTop: '1rem' }}>
                    Was the staff friendly? &nbsp;
                    <Rating className='rat' value={staff} cancel={false} onChange={(e) => setstaff(e.value)} required />
                </div>

                <div className='rowC' style={{ paddingTop: '1rem' }}>
                    Did you find it affordable? &nbsp;
                    <Rating className='rat' value={price} cancel={false} onChange={(e) => setprice(e.value)} required />
                </div>

                <div className='rowC' style={{ paddingTop: '1rem' }} >
                    Was the place nice? &nbsp;
                    <Rating className='rat' value={place} cancel={false} onChange={(e) => setplace(e.value)} required />
                </div>

                <div className="rowC" />
                <div style={{ paddingTop: '1rem', textAlign: 'left' }} >
                    Let others know about your experience with a comment! <icon className='pi pi-pencil'></icon> <br />
                </div>
                <InputTextarea id="message" style={{ width: '100%', marginTop: "1rem" }} value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />

                <div style={{ float: 'right !important' }} className='rowC'>
                    <Button label="Submit" className='mt' icon="pi pi-comment" onClick={handleSubmit} autoFocus />
                    <Button label="Back" className="button-inline p-button-secondary mt" icon="pi pi-times"
                        onClick={disableAddReviewsPopup} style={{ display: 'inline' }} />
                </div>
            </div>
        );
    }

    const renderHeader = () => {
        return (<div> Add review for <b> {restaurant.name}</b></div>)
    }

    const handleSubmit = () => {
        setEnableAddReviews(false);
        const reviewPayload = {
            restaurantId: restaurant.id, food: food, price: price,
            staff: staff, place: place, message: message, username: user.username
        }
        dispatch(saveReview(reviewPayload));

    }

    const onClick = () => {
        setEnableAddReviews(true);
    }

    const onHide = () => {
        setEnableAddReviews(false);
    }


    return (
        <div >
            <Button label="Add review" className='mt' icon="pi pi-comment" onClick={() => onClick()} autoFocus />
            <Dialog header={renderHeader()} className='add-reviews-card' visible={enableAddReviews}
                position='left'
                onHide={() => onHide()} breakpoints={{ '960px': '75vw' }}
                footer={renderFooter()} />
        </div>
    );
}
export default AddReviews;