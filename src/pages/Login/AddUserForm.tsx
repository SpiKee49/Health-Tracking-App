import React, { useState } from 'react'

import { XMarkIcon } from '@heroicons/react/20/solid'

type Props = {
    closeModal: (value: boolean) => void
    nff: (value: boolean) => void
}

function AddUserForm(props: Props) {
    const [msg, setMsg] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [name, setName] = useState('')
    const [height, setHeight] = useState(0)
    const [age, setAge] = useState(0)

    async function AddUser() {
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
        if (response.status === 200) {
            setMsg('User successfully added, closing window...')
            props.nff(true)
            setTimeout(() => {
                setMsg('')
                props.closeModal(false)
            }, 3000)
        } else {
            setMsg('Something went wrong, try again later')
            setTimeout(() => {
                setMsg('')
            }, 3000)
        }
    }

    return (
        <div className="w-screen h-screen backdrop-blur-md fixed top-0 left-0 flex items-center justify-center">
            {/* form */}
            <div className="w-[30%] min-w-[450px] h-auto bg-primary shadow-2xl shadow-secondary py-10 px-20 [&>*]:block rounded-lg relative">
                <a
                    className="w-6 h-6 text-gray-400 absolute top-5 right-5 hover:cursor-pointer"
                    onClick={() => {
                        props.closeModal(false)
                        props.nff(true)
                    }}
                >
                    <XMarkIcon />
                </a>

                {msg && <p className="w-full text-center">{msg}</p>}
                <h1 className="text-center text-[50px] text-secondary mb-10">
                    {'Add user'}
                </h1>
                <div className="w-full">
                    <input
                        id="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="w-full h-16 border-2 px-10 border-secondary rounded-lg rounded-b-none outline-none"
                        required
                    />

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
                        value={age === 0 ? '' : age}
                        onChange={(e) => setAge(+e.target.value)}
                        className="w-full h-16 border-2 px-10 border-secondary outline-none mt-[-0.25rem]"
                        required
                    />

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
                        onClick={() => AddUser()}
                        className="w-full bg-secondary rounded-[25px] hover:rounded-md hover:bg-hover mt-5 h-16 text-primary uppercase transition-all duration-300 ease-linear"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddUserForm
