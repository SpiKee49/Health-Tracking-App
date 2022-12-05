import React, { useState } from 'react'
import { TrashIcon, XMarkIcon } from '@heroicons/react/20/solid'

import { Activity } from '../../../types'

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
                <p className="w-full text-center mb-3">
                    Want to{' '}
                    <a
                        onClick={() => {
                            setAddMethod(!addMethod)
                        }}
                        className="font-bold text-secondary  hover:cursor-pointer hover:text-hover transition-all duration-300 ease-linear"
                    >
                        {!addMethod ? 'Add activity' : 'Manage Activities'}?
                    </a>
                </p>
                {addMethod ? (
                    <>
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
                            placeholder="Description"
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
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
                                if (!name) {
                                    setErrorMsg('Name is required')
                                    setTimeout(() => {
                                        setErrorMsg('')
                                    }, 3000)
                                    return
                                }

                                const response = await fetch(
                                    'http://localhost:8080/add-method',
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
                                    props.nff(true)
                                    setSuccessMsg(data.msg)
                                    setTimeout(() => {
                                        setSuccessMsg('')
                                    }, 3000)
                                } else {
                                    props.nff(true)
                                    setErrorMsg(data.msg)
                                    setTimeout(() => {
                                        setErrorMsg('')
                                    }, 3000)
                                }
                            }}
                            className="w-full bg-secondary rounded-[25px] hover:rounded-md hover:bg-hover mt-5 h-16 text-primary uppercase transition-all duration-300 ease-linear"
                        >
                            Add Activity
                        </button>
                    </>
                ) : (
                    <>
                        {successMsg && (
                            <p className="w-full text-center text-secondary">
                                {successMsg}
                            </p>
                        )}
                        {errorMsg && (
                            <p className="w-full text-center text-red-500">
                                {errorMsg}
                            </p>
                        )}
                        <table className="w-full rounded-2xl border-secondary border-2 border-solid p-10 border-separate">
                            <tbody className="w-full table">
                                <tr className="text-left">
                                    <th>methodID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th></th>
                                </tr>
                                {props.activities.map((method) => (
                                    <tr
                                        key={method.methodID}
                                        className="border-secondary border-b-2 "
                                    >
                                        <td>{method.methodID}</td>
                                        <td>{method.methodName}</td>
                                        <td>{method.methodDesc}</td>

                                        <td>
                                            <button
                                                onClick={async () => {
                                                    const response =
                                                        await fetch(
                                                            'http://localhost:8080/remove-method',
                                                            {
                                                                method: 'POST',
                                                                headers: {
                                                                    'Content-Type':
                                                                        'application/json',
                                                                },
                                                                body: JSON.stringify(
                                                                    {
                                                                        methodID:
                                                                            method.methodID,
                                                                    }
                                                                ),
                                                            }
                                                        )
                                                    const data =
                                                        await response.json()
                                                    if (
                                                        response.status === 200
                                                    ) {
                                                        setSuccessMsg(data.msg)
                                                        setTimeout(() => {
                                                            setSuccessMsg('')
                                                            props.nff(true)
                                                        }, 3000)
                                                    } else {
                                                        setErrorMsg(data.msg)
                                                        setTimeout(() => {
                                                            setErrorMsg('')
                                                        }, 3000)
                                                    }
                                                }}
                                                className="w-10 h-10 bg-primary text-primary uppercase "
                                            >
                                                <TrashIcon className="w-6 h-6 mx-auto fill-secondary hover:fill-hover transition-all duration-300 ease-linear" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    )
}

export default MethodsModal
