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
import { authSlice, getReviews } from '../redux/slice';
import { Card } from 'primereact/card';
import AddReviews from './addReview';

import './styles.scss';

const Reviews = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [enableReviews, setEnableReviews] = useState(false);
    const { reviews, restaurant } = useSelector((state) => state.auth)
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getReviews(id));
        }

        console.log(reviews);

    }, []);


    const disableReviewsPopup = (e) => {
        e.preventDefault();
        console.log("Click back Reviews");
        setEnableReviews(false);
    }

    const renderFooter = () => {
        return (
            <div>
                {listItems}
                
                <div style={{ float:'right !important' }} className='rowC'> 
                    <AddReviews/>
                    <Button label="Back" className="button-inline p-button-secondary mt" icon="pi pi-times"
                        onClick={disableReviewsPopup} />
                </div>
            </div>
        );
    }

    const listItems = reviews.map((r) =>
        <Card style={{ marginBottom: "1rem" }}>
            <div style={{ textAlign: 'justify' }} className='rowC'>
                <Avatar label={r.name != null ? r.name.charAt(0) : 'U'} className="mr-2" shape="circle" size="large" />
                <div>
                    <Rating value={r.average} readOnly cancel={false} />
                    <div> <b>{r.average}/5.0</b>  {r.message} </div>
                    <div> <i>{r.name}</i> </div>
                </div>


            </div>
        </Card>);

const renderHeader = () => {
    return (
        <div>
            Reviews for {restaurant.name}
        </div>
    );
}


    const onClick = () => {
        setEnableReviews(true);
    }

    const onHide = () => {
        setEnableReviews(false);
    }


    return (

        <div >
            <Button className='ml' label="See reviews" icon="pi pi-comments" onClick={() => onClick()} />
            <Dialog header={renderHeader()} className='reviews-card' visible={enableReviews}
                position='left'
                onHide={() => onHide()} breakpoints={{ '960px': '75vw' }}
                footer={renderFooter()} />
        </div>
    );
}
export default Reviews;