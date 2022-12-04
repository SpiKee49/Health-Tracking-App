import { Activity, User } from '../../../types'
import React, { useContext, useEffect, useState } from 'react'

import { UserContext } from '../../App'
import { XMarkIcon } from '@heroicons/react/24/solid'

type Props = {
    visible: (value: boolean) => void
    availableActivities: Array<Activity>
    nff: (value: boolean) => void
}

function LogsModal(props: Props) {
    const { user } = useContext(UserContext)
    const [currentDate, setCurrentDate] = useState(
        new Date().toLocaleDateString('en-CA')
    )
    const [hearBeat, setHeartBeat] = useState(0)
    const [steps, setSteps] = useState(0)
    const [weight, setWeight] = useState(0)
    const [activity, setActivity] = useState(0)

    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    function checkStats(): boolean {
        if (hearBeat < 30 || hearBeat > 300) {
            setErrorMsg(
                'Heart rate too high or too low (minimum is 30, maximum is 300)'
            )
            setTimeout(() => {
                setErrorMsg('')
            }, 3000)
            return false
        }
        if (weight < 10) {
            setErrorMsg('Weight is too low, minimum is 10')
            setTimeout(() => {
                setErrorMsg('')
            }, 3000)
            return false
        }
        if (activity === 0) {
            setErrorMsg('Please select activity')
            setTimeout(() => {
                setErrorMsg('')
            }, 3000)
            return false
        }
        if (steps < 0) {
            setErrorMsg("Steps can't be negative")
            setTimeout(() => {
                setErrorMsg('')
            }, 3000)
            return false
        }
        if (user == null) {
            setErrorMsg('Not logged in, please log in and try again')
            setTimeout(() => {
                setErrorMsg('')
            }, 3000)
            return false
        }

        return true
    }

    return (
        <div className="w-screen h-screen backdrop-blur-md absolute top-0 left-0 flex items-center justify-center">
            {/* form */}
            <div className="w-[30%] min-w-[450px] h-auto bg-primary shadow-2xl shadow-secondary py-10 px-20 [&>*]:block rounded-lg relative">
                <a
                    className="w-6 h-6 text-gray-400 absolute top-5 right-5 hover:cursor-pointer"
                    onClick={() => {
                        props.visible(false)
                        props.nff(true)
                    }}
                >
                    <XMarkIcon />
                </a>
                <span className="text-center text-[50px] text-secondary mb-10">
                    Log activity
                </span>
                <input
                    type="date"
                    value={currentDate}
                    onChange={(event) =>
                        setCurrentDate(
                            new Date(event.target.value).toLocaleDateString(
                                'en-CA'
                            )
                        )
                    }
                    className="w-full h-16 border-2 px-10 border-secondary rounded-lg rounded-b-none outline-none"
                />
                <input
                    type="number"
                    value={hearBeat === 0 ? '' : hearBeat}
                    placeholder="Heart rate"
                    onChange={(event) => setHeartBeat(+event.target.value)}
                    className="w-full h-16 border-2 px-10 border-secondary outline-none mt-[-0.25rem]"
                />
                <input
                    type="number"
                    value={steps === 0 ? '' : steps}
                    placeholder="Steps taken"
                    onChange={(event) => setSteps(+event.target.value)}
                    className="w-full h-16 border-2 px-10 border-secondary outline-none mt-[-0.25rem]"
                />
                <input
                    type="number"
                    value={weight === 0 ? '' : weight}
                    placeholder="Weight"
                    onChange={(event) => setWeight(+event.target.value)}
                    className="w-full h-16 border-2 px-10 border-secondary outline-none mt-[-0.25rem]"
                />
                <select
                    name="methods"
                    onChange={(event) => {
                        setActivity(+event.target.value)
                    }}
                    value={activity === 0 ? '' : activity}
                    className={`w-full h-16 border-2 px-10 border-secondary rounded-lg rounded-t-none outline-none mt-[-0.25rem] ${
                        activity === 0 ? 'text-gray-400' : ''
                    }`}
                >
                    <option value="">Choose activity</option>
                    {props.availableActivities.map((activity) => {
                        return (
                            <option value={activity.methodID}>
                                {activity.methodName}
                            </option>
                        )
                    })}
                </select>
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
                        if (!checkStats()) return

                        const response = await fetch(
                            'http://localhost:8080/methods',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    currentDate,
                                    hearBeat,
                                    steps,
                                    weight,
                                    activity,
                                    userID: user?.userID,
                                }),
                            }
                        )
                        const data = await response.text()
                        if (response.status === 200) {
                            setSuccessMsg(data)
                            setTimeout(() => {
                                setSuccessMsg('')
                            }, 3000)
                        } else {
                            setErrorMsg(data)
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

export default LogsModal
