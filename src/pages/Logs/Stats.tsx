import { Activity, LogType } from '../../../types'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineController,
    LineElement,
    LinearScale,
    PointElement,
    ScatterController,
    ScatterControllerChartOptions,
    ScatterControllerDatasetOptions,
    ScatterDataPoint,
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
    LineController,
    ScatterController
)

type Props = {
    logs: Array<LogType>
    availableActivities: Array<Activity>
}

function Stats(props: Props) {
    const [fromDate, setFromDate] = useState<Date>()
    const [toDate, setToDate] = useState(new Date())
    const [isChartView, setChartView] = useState(true)
    const [filterActivity, setActivity] = useState(0)

    let logs = [...props.logs]

    if (logs.length === 0) {
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

    if (filterActivity) {
        logs = logs.filter((item) => item.methodID == filterActivity)
    }

    if (fromDate == null) {
        logs = logs.filter((item) => new Date(item.added_date) <= toDate)
    } else {
        logs = logs.filter(
            (item) =>
                new Date(item.added_date) >= fromDate &&
                new Date(item.added_date) <= toDate
        )
    }

    const stepsWeightData = logs.map((item) => {
        return { x: item.steps, y: item.weight }
    })
    const heartWeightData = logs.map((item) => {
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

    return (
        <div className="relative">
            <div className="mb-5 flex flex-row gap-3">
                <button
                    onClick={() => setChartView(!isChartView)}
                    className="w-10 h-10 bg-secondary rounded-[25px] hover:rounded-md hover:bg-hover text-primary uppercase transition-all duration-300 ease-linear text"
                >
                    {isChartView ? (
                        <QueueListIcon className="w-6 h-6 fill-primary mx-auto" />
                    ) : (
                        <ChartBarSquareIcon className="w-6 h-6 fill-primary mx-auto" />
                    )}
                </button>
                <select
                    name="methods"
                    onChange={(event) => {
                        setActivity(+event.target.value)
                    }}
                    value={filterActivity === 0 ? '' : filterActivity}
                    className={`w-[20%] min-w-[200px] h-10 border-2 px-10 border-secondary rounded-lg outline-none`}
                >
                    <option value="">All activities</option>
                    {props.availableActivities.map((activity) => {
                        return (
                            <option
                                key={activity.methodID}
                                value={activity.methodID}
                            >
                                {activity.methodName}
                            </option>
                        )
                    })}
                </select>
                <input
                    type="date"
                    value={fromDate?.toLocaleDateString('en-CA')}
                    onChange={(event) => {
                        const newDate = new Date(event.target.value)
                        if (newDate > toDate) {
                            console.log('test')
                            return
                        }
                        setFromDate(newDate)
                    }}
                    className="w-[20%] min-w-[200px] h-10 border-2 px-10 border-secondary rounded-lg rounded-b-none outline-none"
                />
                <input
                    type="date"
                    value={toDate.toLocaleDateString('en-CA')}
                    onChange={(event) => {
                        const newDate = new Date(event.target.value)
                        if (fromDate != null && newDate < fromDate) return
                        setToDate(new Date(event.target.value))
                    }}
                    className="w-[20%] min-w-[200px] h-10 border-2 px-10 border-secondary rounded-lg rounded-b-none outline-none"
                />
            </div>
            {logs.length == 0 ? (
                <div className="text-center mt-20 text-xl">
                    <p>Is this you right now?</p>
                    <img
                        className="block mx-auto"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8PHheU0z-ddZloFrtUMbHbX-nL1F5FXyQxE1MQYwOYvpCjPDo8u3jSfV08-M2V66dsIg&usqp=CAU"
                        alt="secret"
                    />
                    <p>No worries, try different filters</p>
                </div>
            ) : (
                <>
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
                                {logs.map((item) => {
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
                </>
            )}
        </div>
    )
}

export default Stats
