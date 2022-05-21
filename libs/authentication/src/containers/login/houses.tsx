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
import { getHouses } from '../redux/slice';
import Booking from "./booking";
import './DataViewDemo.css';
import './styles.scss';

export interface HousesProps {
}


const Houses = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { houses } = useSelector((state: RootState) => state.auth)
    const [layout, setLayout] = useState('grid');

    useEffect(() => {
        dispatch(getHouses());
    }, []);

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
                            <div style={{width : "30%"}}>
                                <div className='rowC'>
                                    <i className="pi pi-map-marker product-category-icon"></i>
                                    <div >{data.city}</div>
                                </div>

                                <div className='rowC' style={{width : "100%"}}>
                                    <i className="pi pi-users product-category-icon"></i>
                                    <div > {data.capacity} people capacity</div>
                                </div>

                                <div className='rowC'style={{width : "100%"}}>
                                    <i className="pi pi-calendar-times product-category-icon"></i>
                                    <div> {data.bookingPeriod} days</div>
                                </div>

                            </div>
                                <div  style={{ width:"65%",height : '5rem', marginRight:'1rem' }}className="medium-writing"> "<i> {data.description} "</i>
                            </div>
                        </div>


                        <Button style={{ float: 'left' }} icon="pi pi-heart" className="p-button-lg p-button-rounded p-button-danger p-button-text" tooltip="Add to favorites" tooltipOptions={{ position: 'bottom' }} aria-label="Bookmark" />
                        <div className="product-grid-item-bottom " style={{ marginTop: '0rem', marginLeft: "11.5rem", alignContent: 'center !important', justifyContent: 'center !important' }}>
                            <Booking/>    
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