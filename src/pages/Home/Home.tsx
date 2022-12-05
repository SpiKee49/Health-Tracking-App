import React, { useEffect, useState } from 'react'

function Home() {
    return (
        <div className="page-wrapper">
            <h1 className="text-[50px] text-secondary mb-5">
                About application
            </h1>
            <p className="text-xl">
                App was made by me for me from me, use credentials email:{' '}
                <b>admin@admin.sk</b> password: <b>admin</b> to access
                administration
            </p>
        </div>
    )
}

export default Home
