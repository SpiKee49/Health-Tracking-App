import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useState } from 'react'
import { User, UserContextType } from '../types'

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Logs from './pages/Logs/Logs'
import TheNavigation from './components/TheNavigation'

export const UserContext = React.createContext<UserContextType>(
    {} as UserContextType
)

function App() {
    const [user, setUser] = useState<User | null>()
    return (
        <>
            <BrowserRouter>
                <UserContext.Provider value={{ user, setUser }}>
                    <TheNavigation />;
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/logs" element={<Logs />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default App
