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
import fastFoodIcon from './icons/fast-food.svg';

export interface IHeaderProps {
}

export default function Header(props: IHeaderProps) {

    const {isLoggedIn } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    if (!isLoggedIn) {
        console.log("Navigate to login");
        return <Navigate to="/" replace />;
    }

    const handleLogout = (e: any) => {
        e.preventDefault();
        dispatch(authSlice.actions.logout());

    }

    const start =   
        <div className="col-12 grid-nogutter">
            <img src={fastFoodIcon} width="50 rem" height="50 rem" />
            <header className="text-header">Starving? Let us help you!</header>
        </div>;

    const end = 
    <div className="grid grid-nogutter">
            <Button className="account-button" label="Account" icon="pi pi-user" onClick={handleLogout} />
            <Button className="logout-button" label="Logout" icon="pi pi-sign-out" onClick={handleLogout} />
    </div>




    return (
        <div>
            <Menubar start={start} end={end}/>
        </div>

    );
}

