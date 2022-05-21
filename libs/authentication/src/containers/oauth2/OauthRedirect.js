import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { authSlice } from '../redux/slice'
import { getUser } from '../redux/slice';
import {
    useLocation,
    useParams
} from "react-router-dom";

import axios from 'axios';


const OAuth2RedirectHandler = () => {
    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();

    const [returnPath, setReturnPath] = useState(<></>)

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

     useEffect( async () => {
        let pathToNavigate = <></>
        const token = getUrlParameter('token');
        if (token) {
            localStorage.setItem("token", token);
            dispatch(authSlice.actions.setIsLoggedIn())
            dispatch(getUser())
            try {
                console.log('Started logging with google')
                const authToken = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/user/me',
                  {
                    headers: {
                      Authorization: 'Bearer ' + authToken //the token is a variable which holds the token
                    }
                  });
                const user = response.data;
                const role = user.role;
                console.log(" the user is " + role);

                if (role == "ROLE_USER") {
                    pathToNavigate = <Navigate to={{ pathname: "/select-role" }} />;
                }
                else {
                    if (role === 'ROLE_GUEST') {
                        pathToNavigate = <Navigate to={{ pathname: "/account-guest" }} />;
                    }
                    else {
                        pathToNavigate = <Navigate to={{ pathname: "/account-owner" }} />;
                    }
    
                }
              }
              catch (err) {
                console.log('am ajuns aici');
              }
         
        }
        console.log(pathToNavigate)
        setReturnPath(pathToNavigate)
    },[]);


    return returnPath;


}


export default OAuth2RedirectHandler;