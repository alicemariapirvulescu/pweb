import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers';


export type AppState = ReturnType<typeof rootReducer>;
const store = createStore( rootReducer, applyMiddleware(thunk ))
export default store;