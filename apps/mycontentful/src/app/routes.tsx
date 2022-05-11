import Login from 'libs/authentication/src/containers/login/login'
import Account from 'libs/authentication/src/containers/login/account'
import Register from 'libs/authentication/src/containers/login/register'
import Restaurant from 'libs/authentication/src/containers/login/restaurant'

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
    }
]

export default routes