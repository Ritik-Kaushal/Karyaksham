import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import moment from "moment";
import CountDown from "./CountDown";


export default function DashboardCard() {

    const taskList = useSelector((state) => state.task);
    const [data, setData] = useState([]);

    useEffect(() => {
        const upcomingTasksByCategories = Object.entries(taskList).flatMap(([category, tasks]) =>
            tasks.upcoming.map(task => ({
                category,
                ...task
            }))
        );

        upcomingTasksByCategories.sort((task1, task2) => {
            const timestamp1 = moment(task1.timestamp, 'DD/MM/YYYY HH:mm');
            const timestamp2 = moment(task2.timestamp, 'DD/MM/YYYY HH:mm');
            return timestamp1 - timestamp2;
        });

        setData(upcomingTasksByCategories);
    }, [taskList])

    return (
        <>
            <div className={`card lg:card-side bg-info w-full h-full overflow-auto`}>
                <div className="card-body">
                    <div className="flex justify-center align-middle">
                        <h2 className="card-title">UPCOMING TASKS</h2>
                    </div>
                    {data && data.length !== 0 ? <div className="flex flex-col">
                        {data.map((task, index) => (
                            <>
                                <div className="task">
                                    <div className="flex justify-between">
                                        <h3 className="task-title">{`${index + 1} : ${task.title} (${task.category})`}</h3>
                                        <CountDown title={task.title} category={task.category} date={task.timestamp} />
                                    </div>
                                    <p className="task-details">{task.description}</p>
                                </div>

                            </>
                        ))}
                    </div> : <p className="font-serif font-bold">No data to display</p>}
                </div>
            </div>

        </>
    )
}