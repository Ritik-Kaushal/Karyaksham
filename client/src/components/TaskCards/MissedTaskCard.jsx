import { useEffect, useState } from "react";
import ViewMissedTaskModal from "../modals/MissedTask/view";
import EditMissedTaskModal from "../modals/MissedTask/edit";


export default function MissedTaskCard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [timestamp, setTimestamp] = useState("");
    const [color, setColor] = useState("blue");

    function displayModal(task) {
        setTitle(task.title);
        setDescription(task.description);
        setTimestamp(task.timestamp);

        document.getElementById('missed-task-details').checked = true;
    }

    return (
        <>
            <EditMissedTaskModal title={title} setTitle={setTitle} description={description} setDescription={setDescription} timestamp={timestamp} setTimestamp={setTimestamp} category={props.category} color={color} setColor={setColor} />
            <ViewMissedTaskModal title={title} setTitle={setTitle} description={description} setDescription={setDescription} timestamp={timestamp} setTimestamp={setTimestamp} category={props.category} color={color} setColor={setColor}/>
            <div className={`card lg:card-side bg-error shadow-2xl w-full h-full overflow-auto `}>
                <div className="card-body">
                    <h2 className="card-title flex justify-center">MISSED</h2>
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