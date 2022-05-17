import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Card } from 'primereact/card';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getRestaurant } from '../redux/slice';
import CustomizedMap from './customized-map';
import './DataViewDemo.css';
import Header from './header';
import Reservation from './reservation';
import Reviews from './reviews';
import './restaurants.css';
import './styles.scss';
import { InputNumber } from 'primereact/inputnumber';
import { ScrollTop } from 'primereact/scrolltop';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Rating } from 'primereact/rating';
import { Tooltip } from 'primereact/tooltip';



const Restaurant = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { id } = useParams();
    const { restaurant } = useSelector((state) => state.auth)
    const { review } = useSelector((state) => state.auth)

    useEffect(() => {
        if (id) {
            dispatch(getRestaurant(id));
        }

    }, []);

    const handleBack = (e) => {
        e.preventDefault();
        console.log("Navigate to restaurants");
        navigate("/restaurants");
    }

    const handleReservation = (e) => {
        e.preventDefault();
        console.log("Click reservation");
        setReservationDisabled(false);
    }

    const handleBackReservation = (e) => {
        e.preventDefault();
        console.log("Click back reservation");
        setNumberOfPeople(null);
        setdate(null);
        setReservationDisabled(true);
    }

    const header = (
        <div className="image-wrapper" style={{ backgroundImage: `url(data:image/jpeg;base64,${restaurant.image})` }}>
        </div>
    );
    const footer = (
        <div style={{ display: 'block' }} className='col-md-6'>
            <div className='rowC'>
                <Reservation />
                <Reviews /> </div>
            <Button className='mt button-inline p-button-secondary' label="Back" icon="pi pi-times" onClick={handleBack} />
        </div>
    );

    const top = (
        <div className='rowC'>
            <div style={{ paddingRight: '8rem' }} > {restaurant.name} </div>
            <Button icon="pi pi-book" className="p-button-rounded p-button-secondary" tooltip="Check the menu" tooltipOptions={{position: 'bottom'}} aria-label="Bookmark" />
            <Button icon="pi pi-map-marker" className="ml p-button-rounded p-button-success" tooltip="Go to location on maps" tooltipOptions={{position: 'bottom'}} aria-label="Search" />
            <Button icon="pi pi-clock" className="ml p-button-rounded p-button-info" tooltip="Check working hours" tooltipOptions={{position: 'bottom'}} aria-label="User" />

        </div>
    );

    function round(value, decimals) {
        return Number(Math.round(value +'e'+ decimals) +'e-'+ decimals).toFixed(decimals);
    }
    

    return (

        <div className="card">
            <Header />
            <CustomizedMap />

            <Card className="restaurant-card" title={top} subTitle={restaurant.category} footer={footer} header={header}>
                <p className="m-0" style={{ lineHeight: '1.5' }}> {restaurant.description}</p> <br />

                <div className='rowC'>
                    <div>  Food <b>{round(review.food,2)}/5 &nbsp;</b>  </div>
                    <Rating value={review.food} readOnly cancel={false} />

                    <div className='ml2'>  Staff <b>{round(review.staff,2)}/5 &nbsp;</b>  </div>
                    <Rating value={review.staff} readOnly cancel={false} />
                </div>

                <div className='rowC'>
                    <div>  Place <b>{round(review.location,2)}/5 &nbsp;</b>  </div>
                    <Rating value={review.location} readOnly cancel={false} />

                    <div className='ml2'>  Price <b>{round(review.price,2)}/5 &nbsp;</b>  </div>
                    <Rating value={review.price} readOnly cancel={false} />

                </div>

            </Card>

        </div>
    )
}

export default Restaurant;
