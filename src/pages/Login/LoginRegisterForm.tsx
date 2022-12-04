import React, { useContext, useState } from 'react'

import { UserContext } from '../../App'

function LoginRegisterForm() {
    const { user, setUser } = useContext(UserContext)
    const [isLogin, setForm] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [name, setName] = useState('')
    const [height, setHeight] = useState(0)
    const [age, setAge] = useState(0)

    async function Login() {
        if (isLogin) {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            const user = await response.json()
            setUser(user[0])
        }
    }
    async function Register() {
        if (isLogin) {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    password,
                    email,
                    age,
                    height,
                }),
            })
        }
    }
    return (
        <>
            <h1 className="text-center text-[50px] text-secondary mb-10">
                {isLogin ? 'Login' : 'Register'}
            </h1>
            <div className="w-[50%] mx-auto">
                <input
                    id="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full h-16 border-2 px-10 border-secondary rounded-lg rounded-b-none outline-none"
                    required
                />
                {!isLogin && (
                    <>
                        <input
                            id="name"
                            placeholder="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-16 border-2 px-10 border-secondary outline-none mt-[-0.25rem]"
                            required
                        />
                        <input
                            id="height"
                            placeholder="height (in cm)"
                            type="number"
                            value={height === 0 ? '' : height}
                            onChange={(e) => setHeight(+e.target.value)}
                            className="w-full h-16 border-2 px-10 border-secondary outline-none mt-[-0.25rem]"
                            required
                        />
                        <input
                            id="age"
                            placeholder="age in days"
                            type="number"
                            value={age === 0 ? '' : height}
                            onChange={(e) => setAge(+e.target.value)}
                            className="w-full h-16 border-2 px-10 border-secondary outline-none mt-[-0.25rem]"
                            required
                        />
                    </>
                )}
                <input
                    id="password"
                    placeholder="password"
                    type="password"
                    value={[password]}
                    onChange={(e) => setPass(e.target.value)}
                    className="w-full h-16 border-2 px-10 border-secondary rounded-lg rounded-t-none outline-none mt-[-0.25rem]"
                    required
                />
                <button
                    onClick={Login}
                    className="w-full bg-secondary rounded-[25px] hover:rounded-md hover:bg-hover mt-5 h-16 text-primary uppercase transition-all duration-300 ease-linear"
                >
                    Submit
                </button>
                <p className="text-center mt-5">
                    {isLogin
                        ? "Don't have account yet? "
                        : 'Already have account? '}
                    <span
                        className="text-secondary underline font-bold hover:cursor-pointer"
                        onClick={() => {
                            setForm(!isLogin)
                        }}
                    >
                        {isLogin ? 'Sign in' : 'Login'}
                    </span>
                </p>
            </div>
        </>
    )
}

export default LoginRegisterForm
