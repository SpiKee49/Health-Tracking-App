import React, { useEffect, useState } from 'react';

import { User } from '../../../types';

function Home() {
    const [data, setData] = useState<Array<User>>([]);
    useEffect(() => {
        fetch('http://localhost:8080/')
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);

    return (
        <div className="page-wrapper">
            <h1 className="text-[50px] text-secondary mb-5">
                About application
            </h1>
            <p className="text-xl">{JSON.stringify(data)}</p>
        </div>
    );
}

export default Home;
