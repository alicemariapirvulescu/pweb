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
import { authSlice, getHouses } from '../redux/slice';
import './DataViewDemo.css';
import fastFoodIcon from './icons/fast-food.svg';
import './Houses.css';
import './styles.scss';
import Header from './header';

export interface HousesProps {
}


const Houses = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { Houses } = useSelector((state: RootState) => state.auth)
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(1);
    const [sortField, setSortField] = useState(null);
    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' },
    ];

    useEffect(() => {
        dispatch(getHouses());
    }, []);

    const handleMoreDetails = (e: React.MouseEvent<HTMLButtonElement>, data: HouseResponse) => {
        e.preventDefault();
        console.log(e.target);
        navigate("/House/" + data.id);
    }


    const renderListItem = (data: HouseResponse) => {
        return (
            <div className="col-12">
                <div className="product-list-item">
                    <div className="product-list-detail">
                        <div className="product-name">{data.name}</div>
                        <div className="product-description" >{data.description}</div>
                        <Rating value={data.review.average} readOnly cancel={false}></Rating>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">${data.review.average}</span>
                        <Button icon="pi pi-info-circle" label="More details" disabled={data.status === 'OUTOFSTOCK'}></Button>
                        <span className={`product-badge status-${data.status.toLowerCase()}`}>{data.status}</span>
                    </div>
                </div>
            </div>
        );
    }

    const renderGridItem = (data: HouseResponse) => {
        return (
            <div className="col-12 md:col-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.category}</span>
                        </div>
                        <span className={`product-badge status-${data.status.toLowerCase()}`}>{data.status}</span>
                    </div>
                    <div className="product-grid-item-content">
                        <div className="image-wrapper" style={{ backgroundImage: `url(data:image/jpeg;base64,${data.image})` }}>
                        </div>
                        <div className="product-description">{data.name}</div>

                        <div >  Average review: <b>{data.review.average.toPrecision(3)}/5.0 &nbsp;</b>  </div>
                        <Rating value={data.review.average} readOnly cancel={false} />
                    </div>
                    <div>
                    
                        <Button style={{ float: 'left'}} icon="pi pi-heart" className="p-button-lg p-button-rounded p-button-danger p-button-text" tooltip="Add to favorites" tooltipOptions={{ position: 'bottom' }} aria-label="Bookmark" />
                        <div className="product-grid-item-bottom " style={{ marginTop: '10px', marginLeft: "11.5rem", alignContent: 'center !important', justifyContent: 'center !important' }}>
                            <Button icon="pi pi-info-circle" label="More details" onClick={(e) => handleMoreDetails(e, data)} ></Button>
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

        if (layout === 'list')
            return renderListItem(product);
        else if (layout === 'grid')
            return renderGridItem(product);

        else return;
    }

    return (
        <div className="dataview-demo">
            <div className="card">
                <DataView value={Houses} layout={layout}
                    itemTemplate={itemTemplate} />
            </div>
        </div>
    );
}

export default Houses;