import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../apps/mycontentful/src/app/reducers'
import { MouseEvent } from 'react';
import { authSlice } from '../redux/slice'
import Map from './Map';
import Restaurants from './restaurants';
import fastFoodIcon from './icons/fast-food.svg';
import { Navigate, useNavigate } from "react-router-dom";
import house from './icons/house.svg';


export interface IHeaderLoggedOutProps {
}

export default function HeaderLoggedOut(props: IHeaderLoggedOutProps) {

    let navigate = useNavigate();

    const handleLogin = (e: any) => {
        e.preventDefault();
        console.log("Navigate to login");
        navigate("/");
    }

    const handleRegister = (e: any) => {
        e.preventDefault();
        console.log("Navigate to register");
        navigate("/register");
    }

    const start =
        <div className="col-12 grid-nogutter">
            <img src={house} width="50 rem" height="50 rem" />
            <div className='rowC text-header'>
                <h3 >Needing a home? &nbsp; </h3>
                <h3 style={{"color": "darkgrey"}}> Do you want to help the refugees?</h3>
            </div>
        </div>;

    const end =
        <div className="grid grid-nogutter">
            <Button className="account-button" label="Login" icon="pi pi-sign-in" onClick={handleLogin} />
            <Button className="logout-button" label="Register" icon="pi pi-user-plus" onClick={handleRegister} />
        </div>


    return (
        <div>
            <Menubar start={start} end={end} />
        </div>

    );
}

