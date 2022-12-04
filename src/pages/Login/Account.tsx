import React, { useContext, useEffect, useState } from 'react'
import {
    TrashIcon,
    UserMinusIcon,
    UserPlusIcon,
} from '@heroicons/react/20/solid'

import { User } from '../../../types'
import { UserContext } from '../../App'

function Account() {
    const { user, setUser } = useContext(UserContext)

    const [users, setUsers] = useState<Array<User>>([])

    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [showAddUser, setShowAddUser] = useState(false)

    function GetUsers() {
        fetch('http://localhost:8080/')
            .then((res) => res.json())
            .then((data) => setUsers(data))
    }

    useEffect(() => {
        GetUsers()
    }, [])

    return (
        <div className="w-full h-full">
            {user?.email == 'admin@admin.sk' && (
                <a
                    className="absolute top-0 right-11 m-5 w-6 h-6 group hover:cursor-pointer"
                    onClick={() => setShowAddUser(true)}
                >
                    <UserPlusIcon className="fill-secondary group-hover:fill-hover" />
                </a>
            )}
            <a
                className="absolute top-0 right-0 m-5 w-6 h-6 group hover:cursor-pointer"
                onClick={() => setUser(null)}
            >
                <UserMinusIcon className="fill-secondary group-hover:fill-hover" />
            </a>

            {!(user?.email == 'admin@admin.sk') ? (
                <>
                    <h1 className="text-center text-[50px] text-secondary mb-10">
                        My Accout
                    </h1>
                    <table className="w-[50%] mx-auto">
                        <tbody className="[&>*>*]:p-2 [&>*:nth-child(even)]:bg-gray-300 [&>*>*:nth-child(even)]:font-bold">
                            <tr>
                                <td>ID:</td>
                                <td> {user?.userID}</td>
                            </tr>
                            <tr>
                                <td>Name:</td>
                                <td> {user?.username}</td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td> {user?.userpassword}</td>
                            </tr>
                            <tr>
                                <td>email:</td>
                                <td> {user?.email}</td>
                            </tr>
                            <tr>
                                <td>Age:</td>
                                <td> {user?.age}</td>
                            </tr>
                            <tr>
                                <td>Height:</td>
                                <td> {user?.height}</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            ) : (
                <>
                    <h1 className="text-center text-[50px] text-secondary mb-10">
                        Hello Mr. Admin
                    </h1>
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
                        <tbody>
                            <tr className="text-left">
                                <th>userID</th>
                                <th>username</th>
                                <th>email</th>
                                <th>height</th>
                                <th>age</th>
                                <th></th>
                            </tr>
                            {users.map((user) => (
                                <tr
                                    key={user.userID}
                                    className="border-secondary border-b-2 "
                                >
                                    <td>{user.userID}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.height}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <button
                                            onClick={async () => {
                                                const response = await fetch(
                                                    'http://localhost:8080/remove-user',
                                                    {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type':
                                                                'application/json',
                                                        },
                                                        body: JSON.stringify({
                                                            userID: user.userID,
                                                        }),
                                                    }
                                                )
                                                const data =
                                                    await response.json()
                                                if (response.status === 200) {
                                                    setSuccessMsg(data.msg)
                                                    setTimeout(() => {
                                                        setSuccessMsg('')
                                                        GetUsers()
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
    )
}

export default Account
