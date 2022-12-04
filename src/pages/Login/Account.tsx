import React, { useContext } from 'react'

import { UserContext } from '../../App'
import { UserMinusIcon } from '@heroicons/react/20/solid'

function Account() {
    const { user, setUser } = useContext(UserContext)

    return (
        <div className="w-full h-full">
            <a
                className="absolute top-0 right-0 m-5 w-6 h-6 group hover:cursor-pointer"
                onClick={() => setUser(null)}
            >
                <UserMinusIcon className="fill-secondary group-hover:fill-hover" />
            </a>
            <h1 className="text-center text-[50px] text-secondary mb-10">
                My Accout
            </h1>

            <table className="w-[50%] mx-auto">
                <tbody className="[&>*>*]:p-2 [&>*:nth-child(even)]:bg-gray-300 [&>*>*:nth-child(even)]:font-bold">
                    <tr>
                        <td>id:</td>
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
        </div>
    )
}

export default Account
