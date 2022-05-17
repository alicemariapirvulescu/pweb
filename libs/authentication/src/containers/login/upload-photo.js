import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../apps/mycontentful/src/app/reducers'
import { MouseEvent } from 'react';
import { authSlice } from '../redux/slice'
import { Navigate } from 'react-router-dom';
import Map from './Map';
import Restaurants from './restaurants';
import Header from './header';
import Preferences from './preferences';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';

export default function UploadPhoto(props) {
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const toast = useRef < Toast > (null);
    const fileUploadRef = useRef(null);
    const [totalSize, setTotalSize] = useState(0);

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
            </div>
        )
    };

    const onTemplateSelect = (e) => {
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

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    function round(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals);
    }


    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        if (totalSize == null) value = 0;
        const value = totalSize / 1000;
        console.log("The value size is" + value);
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';
        console.log("Formated value" + formatedValue);
        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${round(value, 2)} KB / 3 MB`} style={{ width: '300px', height: '20px', marginLeft: 'auto' }}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file, props) => {
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

    const invoiceImageHandler = ({ files }) => {
        const [file] = files;
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            uploadImage(e.target.result);
        };
        fileReader.readAsDataURL(file);
    };

    const uploadImage = async (invoiceFile) => {
        let formData = new FormData();
        formData.append('invoiceFile', invoiceFile);

        console.log(invoiceFile);
    };
    return (
        <div className="photo">
            <FileUpload name="invoice"
                accept="image/*"
                customUpload={true}
                uploadHandler={invoiceImageHandler}
                mode="advanced"
                auto={true}
                onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear} onRemove={onTemplateRemove} maxFileSize={3000000}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />

        </div>
    );
}
