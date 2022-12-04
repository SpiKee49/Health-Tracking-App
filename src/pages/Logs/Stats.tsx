import { Activity, LogType } from '../../../types'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineController,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
} from 'chart.js'
import { ChartBarSquareIcon, QueueListIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'
import { linearRegression, linearRegressionLine } from 'simple-statistics'

import { Chart } from 'react-chartjs-2'

ChartJS.register(
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController
)

type Props = {
    logs: Array<LogType>
    availableActivities: Array<Activity>
}

function Stats(props: Props) {
    const [isChartView, setChartView] = useState(true)

    const stepsWeightData = props.logs.map((item) => {
        return { x: item.steps, y: item.weight }
    })
    const heartWeightData = props.logs.map((item) => {
        return { x: item.heartBeat, y: item.weight }
    })

    const RegressionData = (
        data: { x: number; y: number }[]
    ): { x: number; y: number }[] => {
        const compute = linearRegressionLine(
            linearRegression(data.map((item) => [item.x, item.y]))
        )
        return data.map((item) => {
            return { ...item, y: compute(item.x) }
        })
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    }
    const data = {
        datasets: [
            {
                type: 'scatter' as const,
                label: 'Steps and Weight Dataset',
                data: stepsWeightData,
                backgroundColor: 'rgba(200, 200,0 , 0.7)',
            },
            {
                type: 'scatter' as const,
                label: 'Heart rate and Weight Dataset',
                data: heartWeightData,
                backgroundColor: 'rgba(56, 255, 10, 0.7)',
            },
            {
                type: 'line' as const,
                label: 'Linear Regresion Heart rate to Weight',
                data: RegressionData(heartWeightData),
                borderColor: 'rgba(10, 20, 200, 0.7)',
                borderWidth: 2,
            },
            {
                type: 'line' as const,
                label: 'Linear Regresion Steps to Weight',
                data: RegressionData(stepsWeightData),
                borderColor: 'rgba(200, 20, 21, 0.7)',
                borderWidth: 2,
            },
        ],
    }

    if (props.logs.length === 0) {
        return (
            <div className="text-center">
                <p>
                    No data to render just yet. Add some logs, if you know what
                    I mean <i>wink wink</i>
                </p>
                <img
                    className="block mx-auto mt-10"
                    src="https://i.pinimg.com/280x280_RS/32/cf/ae/32cfae09085b2968678f015cb747d6be.jpg"
                    alt="secret"
                />
            </div>
        )
    }
    console.log(props.logs)
    return (
        <div className="relative">
            <button
                onClick={() => setChartView(!isChartView)}
                className="absolute right-0 top-[-2rem] w-10 h-10 bg-secondary rounded-[25px] hover:rounded-md hover:bg-hover mb-5 text-primary uppercase transition-all duration-300 ease-linear text"
            >
                {isChartView ? (
                    <QueueListIcon className="w-6 h-6 fill-primary mx-auto" />
                ) : (
                    <ChartBarSquareIcon className="w-6 h-6 fill-primary mx-auto" />
                )}
            </button>
            {isChartView ? (
                <Chart type="scatter" options={options} data={data} />
            ) : (
                <table className="w-[70%] mx-auto">
                    <tbody className="[&>*>*]:p-5 [&>*:nth-child(even)]:bg-secondary [&>*:nth-child(even)]:text-primary">
                        <tr className="text-left">
                            <th>ID</th>
                            <th>Date</th>
                            <th>Steps</th>
                            <th>Heart rate</th>
                            <th>Weight</th>
                            <th>Activity</th>
                        </tr>
                        {props.logs.map((item) => {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.added_date}</td>
                                    <td>{item.steps}</td>
                                    <td>{item.heartBeat}</td>
                                    <td>{item.weight}</td>
                                    <td>
                                        {
                                            props.availableActivities[
                                                item.methodID - 1
                                            ].methodName
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Stats
