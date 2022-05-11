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

export interface IAccountProps {
}

export default function Account(props: IAccountProps) {

    const { isLoggedIn } = useSelector((state: RootState) => state.auth)

    if (!isLoggedIn) {
        console.log("Navigate to login");
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <Header />
            <Splitter>
                <SplitterPanel size={8} minSize={1}>
                    <Preferences/>
                </SplitterPanel>

                <SplitterPanel size={92}>
                    <Restaurants />
                    
                </SplitterPanel>
            </Splitter>
            <Map/>
        </div>
    );
}
