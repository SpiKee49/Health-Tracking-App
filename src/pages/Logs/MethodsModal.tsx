import React, { useState } from 'react'

import { Activity } from '../../../types'
import { XMarkIcon } from '@heroicons/react/20/solid'

type Props = {
    nff: (yesnt: boolean) => void
    visible: (yesnt: boolean) => void
    activities: Array<Activity>
}

function MethodsModal(props: Props) {
    const [addMethod, setAddMethod] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    return (
        <div className="w-screen h-screen backdrop-blur-md absolute top-0 left-0 flex items-center justify-center">
            {/* form */}
            <div className="w-[60%] min-w-[450px] h-auto bg-primary shadow-2xl shadow-secondary py-10 px-20 [&>*]:block rounded-lg relative">
                <a
                    className="w-6 h-6 text-gray-400 absolute top-5 right-5 hover:cursor-pointer"
                    onClick={() => {
                        props.nff(true)
                        props.visible(false)
                    }}
                >
                    <XMarkIcon />
                </a>
                <span className="text-center text-[50px] text-secondary mb-10">
                    {addMethod ? 'Add activity' : 'Manage Activities'}
                </span>

                <input
                    type="text"
                    value={name}
                    placeholder="Name of activity"
                    onChange={(event) => setName(event.target.value)}
                    className="w-full h-16 border-2 px-10 border-secondary outline-none mt-[-0.25rem]"
                />
                <input
                    type="text"
                    value={description}
                    placeholder="Weight"
                    onChange={(event) => setDescription(event.target.value)}
                    className="w-full h-16 border-2 px-10 border-secondary outline-none mt-[-0.25rem]"
                />
                {errorMsg && (
                    <p className="w-full text-red-600 text-center font-bold">
                        {errorMsg}
                    </p>
                )}
                {successMsg && (
                    <p className="w-full text-secondary text-center font-bold">
                        {successMsg}
                    </p>
                )}
                <button
                    onClick={async () => {
                        if (name) return

                        const response = await fetch(
                            'http://localhost:8080/methods',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    name,
                                    description,
                                }),
                            }
                        )
                        const data = await response.json()
                        if (response.status === 200) {
                            setSuccessMsg(data.msg)
                            setTimeout(() => {
                                setSuccessMsg('')
                            }, 3000)
                        } else {
                            setErrorMsg(data.msg)
                            setTimeout(() => {
                                setErrorMsg('')
                            }, 3000)
                        }
                    }}
                    className="w-full bg-secondary rounded-[25px] hover:rounded-md hover:bg-hover mt-5 h-16 text-primary uppercase transition-all duration-300 ease-linear"
                >
                    Log Activity
                </button>
            </div>
        </div>
    )
}

export default MethodsModal
