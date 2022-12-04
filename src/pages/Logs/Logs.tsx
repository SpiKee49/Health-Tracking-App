import { Activity, LogType } from '../../../types'
import React, { useContext, useEffect, useState } from 'react'

import LogsModal from './LogsModal'
import { PencilSquareIcon } from '@heroicons/react/20/solid'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import Stats from './Stats'
import { UserContext } from '../../App'

function Logs() {
    const { user } = useContext(UserContext)
    const [modalVisible, setModal] = useState(false)
    const [methodsModal, setMethodsModal] = useState(false)
    const [logs, setLogs] = useState<Array<LogType>>([])
    const [needForFetch, setFetch] = useState(false)

    const [availableActivities, setAvailableActivitie] = useState<
        Array<Activity>
    >([])
    const GetData = () => {
        fetch('http://localhost:8080/methods')
            .then((res) => res.json())
            .then((data) => setAvailableActivitie(data))

        fetch('http://localhost:8080/getlogs')
            .then((res) => res.json())
            .then((data: Array<LogType>) => {
                const logs = data
                    .filter((item) => item.userID == user?.userID)
                    .map((item) => {
                        return {
                            ...item,
                            added_date: item.added_date.substring(0, 10),
                        }
                    })
                setLogs(logs)
            })
    }

    useEffect(() => {
        GetData()
    }, [])

    if (needForFetch) {
        GetData()
        setFetch(false)
    }

    return (
        <div className="page-wrapper">
            <div className="flex flex-row justify-right items-center gap-5">
                <h1 className="text-[50px] text-secondary mb-5 mr-auto">
                    Logs
                </h1>
                <button
                    disabled={user == null}
                    onClick={() => setMethodsModal(true)}
                    className="flex flex-row float-right rounded-2xl justify-center items-center text-white bg-secondary hover:bg-hover transition-all duration-300  p-5 h-10 hover:rounded-md disabled:opacity-50"
                >
                    <PencilSquareIcon className=" w-5 h-5 mr-2" />
                    Manage Methods
                </button>
                <button
                    disabled={user == null}
                    onClick={() => setModal(true)}
                    className="flex flex-row float-right rounded-2xl justify-center items-center text-white bg-secondary hover:bg-hover transition-all duration-300  p-5 h-10 hover:rounded-md disabled:opacity-50"
                >
                    <PlusCircleIcon className=" w-5 h-5 mr-2" />
                    Add log
                </button>
            </div>
            {/* Content */}
            <div className="w-full mt-5">
                {user == null ? (
                    <div className="text-center">
                        <p className="mx-auto text-black text-xl">
                            Please login in order to access your logged data
                        </p>
                        <img
                            className="block mx-auto mt-3"
                            src="https://i.imgflip.com/73509d.jpg"
                            alt="secret"
                        />
                    </div>
                ) : (
                    <Stats
                        logs={logs}
                        availableActivities={availableActivities}
                    />
                )}
            </div>
            {modalVisible && (
                <LogsModal
                    nff={setFetch}
                    availableActivities={availableActivities}
                    visible={setModal}
                />
            )}
        </div>
    )
}

export default Logs
