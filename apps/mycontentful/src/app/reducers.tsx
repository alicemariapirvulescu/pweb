import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from 'libs/authentication/src/containers/redux/slice' 
const rootReducer = combineReducers( {
    auth: authSlice.reducer
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;