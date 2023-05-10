import { BsPlusCircle } from "react-icons/bs";
import React, { useState } from 'react';
import CreateTaskModal from '../modals/UpcomingTask/create';
import EditUpcomingTaskModal from '../modals/UpcomingTask/edit';
import ViewUpcommingTaskModal from '../modals/UpcomingTask/view';


export default function UpcomingTaskCard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [timestamp, setTimestamp] = useState("");
    const [color, setColor] = useState("blue");

    function displayModal(task) {
        setTitle(task.title);
        setDescription(task.description);
        setTimestamp(task.timestamp);

        document.getElementById('upcomming-task-details').checked = true;
    }

    return (
        <>
            <CreateTaskModal title={title} setTitle={setTitle} description={description} setDescription={setDescription} timestamp={timestamp} setTimestamp={setTimestamp} category={props.category} color={color} setColor={setColor} />
            <EditUpcomingTaskModal title={title} setTitle={setTitle} description={description} setDescription={setDescription} timestamp={timestamp} setTimestamp={setTimestamp} category={props.category} color={color} setColor={setColor} />
            <ViewUpcommingTaskModal title={title} setTitle={setTitle} description={description} setDescription={setDescription} timestamp={timestamp} setTimestamp={setTimestamp} category={props.category} color={color} setColor={setColor} />
            <div className={`card lg:card-side bg-info shadow-2xl w-full h-full overflow-auto overflow-x-hidden`}>
                <div className="card-body">
                    <div className="flex justify-between align-middle">
                        <div></div>
                        <h2 className="card-title flex justify-center">UPCOMING</h2>
                        <div className="tooltip tooltip-info" data-tip="Add new task" onClick={() => {
                            document.getElementById('create-task').checked = true;
                        }}>
                            <BsPlusCircle size={20} color="rgb(0,0,0)" cursor={"pointer"} />
                        </div>
                    </div>
                    {props.tasklist.length !== 0 ? <div className="flex flex-col">
                        {props.tasklist.map((task, index) => (
                            <>
                                <div className="tooltip task" data-tip="Click to view details" onClick={() => displayModal(task)}>
                                    <h3 className="task-title">{`${index + 1} : ${task.title}`}</h3>
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