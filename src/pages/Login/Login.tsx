import React, { useContext } from 'react'

import Account from './Account'
import LoginRegisterForm from './LoginRegisterForm'
import { UserContext } from '../../App'

function Login() {
    const { user } = useContext(UserContext)

    return (
        <div className="page-wrapper relative">
            {user == null ? <LoginRegisterForm /> : <Account />}
        </div>
    )
}

export default Login
