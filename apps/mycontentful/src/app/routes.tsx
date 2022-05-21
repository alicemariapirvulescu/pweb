import Login from 'libs/authentication/src/containers/login/login'
import AccountGuest from 'libs/authentication/src/containers/login/account-guest'
import AccountOwner from 'libs/authentication/src/containers/login/account-owner'
import Register from 'libs/authentication/src/containers/login/register'
import NewHouse from 'libs/authentication/src/containers/login/new-house'
import BookingsOwner from 'libs/authentication/src/containers/login/bookings-owner'
import BookingsGuest from 'libs/authentication/src/containers/login/bookings-guest'
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
        path: "/bookings-owner",
        component: <BookingsOwner />
    },

    {
        path: "/bookings-guest",
        component: <BookingsGuest />
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