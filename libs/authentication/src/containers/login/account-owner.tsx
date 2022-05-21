import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../apps/mycontentful/src/app/reducers'
import { MouseEvent } from 'react';
import { authSlice } from '../redux/slice'
import { Navigate } from 'react-router-dom';
import Map from './Map';
import HeaderOwner from './header-owner';
import Houses from './houses';
import { Splitter, SplitterPanel } from 'primereact/splitter';

export interface IAccountOwnerProps {
}

export default function AccountOwner(props: IAccountOwnerProps) {

    const { isLoggedIn, user } = useSelector((state: RootState) => state.auth)

    if (!isLoggedIn) {
        console.log("Navigate to login");
        return <Navigate to="/" replace />;
    }
    if(!user) {
        return <></>
    }
    if(user.role == 'MANAGER'){
        console.log("Navigate to login");
        return <Navigate to="/new-house" replace />;
    }

    return (
        <div>
            <HeaderOwner />
            <Houses/>
        </div>
    );
}
