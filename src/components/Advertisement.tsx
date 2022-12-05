import React, { useContext } from 'react'

import { AdContext } from '../App'
import { AdvertisementType } from '../../types'
import { XMarkIcon } from '@heroicons/react/20/solid'

type Props = {
    showAd: (value: boolean) => void
    ad: AdvertisementType
}

function Advertisement(props: Props) {
    const { nff } = useContext(AdContext)

    return (
        <div className="w-screen h-screen backdrop-blur-md absolute top-0 left-0 flex items-center justify-center">
            {/* modal */}
            <div className="w-[50%] min-w-[450px] h-auto bg-primary shadow-2xl shadow-secondary py-10 px-20 [&>*]:block rounded-lg relative">
                <a
                    className="w-6 h-6 text-gray-400 absolute top-5 right-5 hover:cursor-pointer"
                    onClick={() => {
                        props.showAd(false)
                        setTimeout(() => {
                            props.showAd(true)
                        }, 60000)
                    }}
                >
                    <XMarkIcon />
                </a>
                <a
                    href={props.ad.linkTo}
                    onClick={async () => {
                        const response = await fetch(
                            'http://localhost:8080/advertisement',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    imageSrc: props.ad.imageSrc,
                                    linkTo: props.ad.linkTo,
                                    clickCounter: props.ad.clickCounter + 1,
                                }),
                            }
                        )
                        const data = await response.json()
                        if (response.status === 200) {
                            nff(true)
                        }
                    }}
                    className="w-full h-auto text-center"
                >
                    <img src={props.ad.imageSrc} alt="Advertisement" />
                </a>
            </div>
        </div>
    )
}

export default Advertisement
