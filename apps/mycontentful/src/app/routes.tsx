import Login from 'libs/authentication/src/containers/login/login'
import Account from 'libs/authentication/src/containers/login/account'
import Register from 'libs/authentication/src/containers/login/register'
import Restaurant from 'libs/authentication/src/containers/login/restaurant'
import HomeManager from 'libs/authentication/src/containers/login/new-house'
import Reservations from 'libs/authentication/src/containers/login/reservations'

const routes = [
    {
        path: "/",
        component: <Login />,
    },
    
    {
        path: "/restaurants",
        component: <Account />
    },

    {
        path: "/register",
        component: <Register />
    },

    {
        path: "/restaurant/:id",
        component: <Restaurant />
    },

    {
        path: "/manager",
        component: <HomeManager />
    },

    {
        path: "/reservations",
        component: <Reservations />
    }



]

export default routes