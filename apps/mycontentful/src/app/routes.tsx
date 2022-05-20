import Login from 'libs/authentication/src/containers/login/login'
import AccountGuest from 'libs/authentication/src/containers/login/account-guest'
import AccountOwner from 'libs/authentication/src/containers/login/account-owner'
import Register from 'libs/authentication/src/containers/login/register'
import Restaurant from 'libs/authentication/src/containers/login/restaurant'
import NewHouse from 'libs/authentication/src/containers/login/new-house'
import Bookings from 'libs/authentication/src/containers/login/reservations'
import SelectRole from 'libs/authentication/src/containers/login/select-role'
import OAuth2RedirectHandler from 'libs/authentication/src/containers/oauth2/OauthRedirect'
const routes = [
    {
        path: "/",
        component: <Login />,
    },

    {
        path: "/register",
        component: <Register />
    },

    {
        path: "/new-house",
        component: <NewHouse />
    },

    {
        path: "/bookings",
        component: <Bookings />
    },

    {
        path: "/account-guest",
        component: <AccountGuest />
    },

    {
        path: "/account-owner",
        component: <AccountOwner />
    },

    {
        path: "/oauth2/redirect",
        component: <OAuth2RedirectHandler />
    },
    {
        path: "/select-role",
        component: <SelectRole />
    }


]

export default routes