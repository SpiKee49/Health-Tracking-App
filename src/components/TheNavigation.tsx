import { HomeIcon, ListBulletIcon, UserIcon } from '@heroicons/react/24/solid';

import { Link } from 'react-router-dom';
import React from 'react';

function TheNavigation() {
    return (
        <nav className="w-screen h-16 flex justify-center [&>*]:nav-item mt-5">
            <Link className="group" to={'/'}>
                <HomeIcon className="w-6 h-6 stroke-white" />
                <span className="nav-item-description group-hover:opacity-100 group-hover:top-[90px]">
                    Home
                </span>
            </Link>

            <Link className="group" to={'logs'}>
                <ListBulletIcon className="w-6 h-6 stroke-white" />
                <span className="nav-item-description group-hover:opacity-100 group-hover:top-[90px]">
                    Logs
                </span>
            </Link>

            <Link className="group" to={'login'}>
                <UserIcon className="w-6 h-6 stroke-white" />
                <span className="nav-item-description group-hover:opacity-100 group-hover:top-[90px]">
                    Login
                </span>
            </Link>
        </nav>
    );
}

export default TheNavigation;
