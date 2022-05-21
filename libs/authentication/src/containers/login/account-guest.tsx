import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../apps/mycontentful/src/app/reducers'
import { MouseEvent } from 'react';
import { authSlice } from '../redux/slice'
import { Navigate } from 'react-router-dom';
import Map from './Map';
import HeaderGuest from './header-guest';
import Preferences from './preferences';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import Houses from './houses';
import './refugees.css';

export interface IAccountGuestProps {
}

export default function AccountGuest(props: IAccountGuestProps) {

    const { isLoggedIn, user } = useSelector((state: RootState) => state.auth)

    if (!isLoggedIn) {
        console.log("Navigate to login");
        return <Navigate to="/" replace />;
    }
    
    return (
        <div>
            <HeaderGuest />
            <Splitter>
                <SplitterPanel size={15} minSize={10}>
                    <Preferences/>
                </SplitterPanel>

                <SplitterPanel size={85}>
                    <Houses />
                    
                </SplitterPanel>
            </Splitter>
        </div>
    );
}
