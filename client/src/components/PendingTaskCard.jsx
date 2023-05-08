import { useEffect, useState } from "react"

export default function TaskCard(props) {
    return (
        <>
            <div className={`card lg:card-side bg-info shadow-2xl w-full h-full`}>
                <div className="card-body">
                    <h2 className="card-title flex justify-center">PENDING</h2>
                    {props.tasklist ? <>
                        {props.tasklist.map((task, index) => (
                            <>
                                <div className="tooltip task" data-tip="Click to view details">
                                    <h3 className="task-title">{`${index + 1} : ${task.title}`}</h3>
                                    <p className="task-details">{task.description}</p>
                                </div>
                            </>
                        ))}
                    </> : <p>No data to display</p>}
                </div>
            </div>

        </>
    )
}