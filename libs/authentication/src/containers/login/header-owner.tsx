import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../apps/mycontentful/src/app/reducers'
import { MouseEvent } from 'react';
import { authSlice } from '../redux/slice'
import { Navigate, useNavigate } from 'react-router-dom';
import Map from './Map';
import house from './icons/house.svg';

export interface IHeaderProps {
}

export default function Header(props: IHeaderProps) {

    const { isLoggedIn, user } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch();
    let navigate = useNavigate();

    if (!isLoggedIn) {
        console.log("Navigate to login");
        return <Navigate to="/" replace />;
    }

    const handleLogout = (e: any) => {
        e.preventDefault();
        dispatch(authSlice.actions.logout());

    }

    const checkRequests = (e: any) => {
        e.preventDefault();
        navigate("/reservations");
    }

    const addHouseRedirect = (e: any) => {
        e.preventDefault();
        navigate("/new-house");
    }


    const start =
        <div className="col-12 grid-nogutter">
            <img src={house} width="50 rem" height="50 rem" />
            <div className='rowC text-header' >
                <h3 style={{ display: "flex" }} >Needing a home? &nbsp;
                    <div style={{ "color": "darkgrey" }}> Do you want to help the refugees?</div> </h3>
            </div>
        </div>;

    const end =
        <div>
            <div className='rowC'>
                <Button style={{ marginRight: "0.5rem" }} type="button" label="Add house" icon="pi pi-home" className="p-button-help" badgeClassName="p-badge-danger" onClick={addHouseRedirect} />
                <Button style={{ marginRight: "0.5rem" }} type="button" label="Requests" icon="pi pi-users" className="p-button-warning" badge="8" badgeClassName="p-badge-danger" onClick={checkRequests} />
                <Button style={{ marginRight: "0.5rem" }} className="account-button" label="Account" icon="pi pi-user" onClick={handleLogout} />
                <Button style={{ marginRight: "0.5rem" }} className="logout-button" label="Logout" icon="pi pi-sign-out" onClick={handleLogout} />
            </div>
        </div>

    return (
        <div>
            <Menubar start={start} end={end} />
        </div>

    );
}

