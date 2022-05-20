import React, { FormEvent, memo, ReducerAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, saveHouse } from '../redux/slice'
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
import Header from "./header-owner";
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from "primereact/inputtextarea";
import { HouseRequest } from "../redux/payloads";
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import house from './icons/house.svg';
import { FileUpload, FileUploadProps, FileUploadRemoveParams } from 'primereact/fileupload';

export interface HomeManagerProps {
}

const NewHouse = () => {
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
    const [image, setImage] = useState('');
    const [totalSize, setTotalSize] = useState(0);


    const dispatch = useDispatch()

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
            </div>
        )
    };

    const onTemplateSelect = (e: any) => {
        let _totalSize = totalSize;

        Array.prototype.forEach.call(e.files, file => {
            _totalSize += (file.size || 0);
        });
        console.log('here is the issue 3: ' + _totalSize);
        setTotalSize(_totalSize);
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }

    const onTemplateRemove = (file: File, callback: any) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    function round(value: any, decimals: any) {
        return Number(Math.round(value) + 'e-' + decimals).toFixed(decimals);
    }


    const headerTemplate = (options: any) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        let value: number;
        if (totalSize == null) value = 0;
        value = totalSize / 1000;
        console.log("The value size is" + value);
        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${round(value, 2)} KB / 3 MB`} style={{ width: '300px', height: '20px', marginLeft: 'auto' }}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file: any, props: any) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" style={{ marginLeft: '2rem' }} />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }


    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: false, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: false, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: false, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    const invoiceImageHandler = ({ files }: any) => {
        const [file] = files;
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            if (e.target)
                uploadImage(e.target.result);
        };
        fileReader.readAsDataURL(file);
    };

    const uploadImage = async (invoiceFile: any) => {
        let formData = new FormData();
        formData.append('invoiceFile', invoiceFile);
        console.log("uploaded image")
        console.log(invoiceFile);
        setImage(invoiceFile);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const housePayload: HouseRequest = {
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
        dispatch(saveHouse(housePayload))
        console.log('Add house was called');
    }


    return (
        <div className="card">
            <Header />
            <Card className="card-add">
                <div>
                    <img src={house} width="50 rem" height="50 rem" />
                </div>
                <h3 style={{ color: '#6366f1' }}>Add house</h3>
                <form onSubmit={handleSubmit}>

                    <h5 style={{ float: 'left' }}>Your city</h5>
                    <div className="field" >
                        <InputText style={{ width: '32rem' }} id="cityName" aria-describedby="Description-help" onChange={(e: any) => setCity(e.target.value)} />
                        <p className="block add-header" id="Description-help">Enter your city.</p>
                    </div>

                    <h5 className="add-header">Name of house</h5>
                    <div className="field" >
                        <InputText style={{ width: '32rem' }} id="cityName" aria-describedby="Description-help" onChange={(e: any) => setName(e.target.value)} />
                        <p className="block add-header" id="Description-help">This is required for management purposes.</p>
                    </div>

                    <h5 className="add-header">Your address</h5>
                    <div className="field" >
                        <InputText style={{ width: '32rem' }} id="address" aria-describedby="Description-address" onChange={(e: any) => setAddress(e.target.value)} />
                        <p className="block add-header" id="Description-address" >Enter the full address as detailed as possible.</p>
                    </div>

                    <h5 className="add-header">Your phone</h5>
                    <div className="field" >
                        <InputText style={{ width: '32rem' }} id="phone" aria-describedby="phone-help" onChange={(e: any) => setPhone(e.target.value)} />
                        <p className="block add-header" id="phone-help">Contact phone number.</p>
                    </div>

                    <div className='rowC' style={{ width: '32rem', textAlign: 'left' }} >
                        <h5 className="add-header" style={{ width: '15rem' }}>Capacity</h5>
                        <h5 className="add-header" style={{ width: '15rem', marginLeft: '1.5rem' }} >Number of days</h5>
                    </div>

                    <div className='rowC' style={{ width: '32rem' }} >

                        <InputNumber inputId="minmax-buttons" value={capacity} onValueChange={(e: any) => setCapacity(e.value)} mode="decimal" showButtons min={0} max={100} />
                        <InputNumber style={{ marginLeft: '0.5rem' }} inputId="minmax-buttons" value={bookingPeriod} onValueChange={(e: any) => setBookingPeriod(e.value)} mode="decimal" showButtons min={0} max={100} />

                    </div>

                    <div className='rowC' style={{ width: '32rem', textAlign: 'left' }} >
                        <p style={{ width: '16rem' }} className="block add-header" id="phone-help">Number of people</p>
                        <p style={{ width: '16rem', marginLeft: '1.5rem' }} className="block add-header" id="phone-help">Number of days</p>
                    </div>

                    <div className='rowC' style={{ width: '32rem', textAlign: 'left' }} >
                        <h5 className="add-header" style={{ width: '15rem' }}>Longitude</h5>
                        <h5 className="add-header" style={{ width: '15rem', marginLeft: '1.5rem' }} >Latitude</h5>
                    </div>

                    <div className='rowC' style={{ width: '32rem' }} >

                        <InputNumber style={{ width: '16rem' }} inputId="minmaxfraction" value={latitude} onValueChange={(e: any) => setLatitude(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={7}
                            onChange={(e: any) => setLatitude(e.target.value)} />
                        <InputNumber style={{ marginLeft: '0.5rem', width: '16rem' }} inputId="minmaxfraction" value={longitude} mode="decimal" minFractionDigits={2} maxFractionDigits={7}
                            onValueChange={(e: any) => setLongitude(e.value)} />

                    </div>

                    <div className='rowC' style={{ width: '32rem', textAlign: 'left' }} >
                        <p style={{ width: '16rem' }} className="block add-header" id="phone-help">Set exact latitude of house</p>
                        <p style={{ width: '16rem', marginLeft: '1.5rem' }} className="block add-header" id="phone-help">Set exact longitude of house</p>
                    </div>


                    <h5 className="add-header">Description</h5>
                    <InputTextarea style={{ width: '32rem' }} value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={32} />
                    <p className="block add-header" id="help">House? Apartment? Rooms? What are the conditions?
                        Add details about </p>
                    <p className="block add-header" id="help">
                        your place and who are you willing to accomondate.</p>

                    {/* Here is the upload photo part: */}
                    <div className="photo">
                        <FileUpload name="invoice"
                            accept="image/*"
                            customUpload={true}
                            uploadHandler={invoiceImageHandler}
                            mode="advanced"
                            auto={true}
                            onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear} maxFileSize={3000000}
                            headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />

                    </div>

                    <div>
                        <Button style={{ marginTop: '2rem' }} icon="pi pi-home" label="Save"/>
                    </div>

                </form>
            </Card>
        </div >)

}

export default NewHouse