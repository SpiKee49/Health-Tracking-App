import {
    AdContextType,
    AdvertisementType,
    User,
    UserContextType,
} from '../types'
import { HashRouter, Route, Routes } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Advertisement from './components/Advertisement'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Logs from './pages/Logs/Logs'
import TheNavigation from './components/TheNavigation'

export const UserContext = React.createContext<UserContextType>(
    {} as UserContextType
)

export const AdContext = React.createContext<AdContextType>({} as AdContextType)

function App() {
    const [user, setUser] = useState<User | null>()
    const [showAd, setShowAd] = useState(false)
    const [needToFetch, setNeedToFetch] = useState(false)
    const [ad, setAd] = useState<AdvertisementType>()

    async function GetAd() {
        const response = await fetch('http://localhost:8080/advertisement')
        const data = await response.json()
        if (response.status === 200) {
            setAd(data[0])
            setTimeout(() => {
                setShowAd(true)
            }, 60000)
        }
    }

    useEffect(() => {
        GetAd()
    }, [])

    if (needToFetch) {
        GetAd()
        setNeedToFetch(false)
    }

    return (
        <>
            <HashRouter>
                <UserContext.Provider value={{ user, setUser }}>
                    <AdContext.Provider
                        value={{ ad, setAd, nff: setNeedToFetch }}
                    >
                        <TheNavigation />;
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/logs" element={<Logs />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                        {showAd && ad && (
                            <Advertisement showAd={setShowAd} ad={ad} />
                        )}
                    </AdContext.Provider>
                </UserContext.Provider>
            </HashRouter>
        </>
    )
}

export default App
