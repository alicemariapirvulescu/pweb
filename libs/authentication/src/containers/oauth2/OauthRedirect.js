import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { authSlice } from '../redux/slice'
import {
    useLocation,
    useParams
  } from "react-router-dom";

  export const withRouter = (Component) =>  {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, params }}
        />
      );
    }
    return ComponentWithRouterProp;
  }
class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        console.log(this.props)
        var results = regex.exec(this.props.router.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    
    

    render() {        
        const token = this.getUrlParameter('token');

        if(token) {
            localStorage.setItem("token", token);
            this.props.setIsLoggedIn();
            return <Navigate to={{
                pathname: "/restaurants",
            }}/>; 
        } else {
            return <Navigate to={{
                pathname: "/login",
            }}/>; 
        }
    }
}

function mapStateToProps(state, ownProps) {
    console.log(ownProps)
    const { auth } = state
    return { ...ownProps, isLoggedIn: auth.isLoggedIn }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setIsLoggedIn: () => dispatch(authSlice.actions.setIsLoggedIn()),
      dispatch,
    }
  }
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(OAuth2RedirectHandler))