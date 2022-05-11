import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './app/routes';
import store from './app/store';
import { Provider } from 'react-redux'
import GlobalErrorHandler from '../../../libs/authentication/src/containers/global-error-handler/global-error-handler'

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <Routes>
            {routes.map( (route, i) =>  
                <Route path={route.path} element={route.component} key={i}/> 
            )}
          </Routes>
          <GlobalErrorHandler />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
    rootElement
  );
