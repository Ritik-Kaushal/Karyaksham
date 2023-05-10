import { useEffect, useState } from "react"
import ViewDelayedTaskModal from "../modals/DelayedTask/view";



export default function DelayedTaskCard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [timestamp, setTimestamp] = useState("");

    function displayModal(task) {
        setTitle(task.title);
        setDescription(task.description);
        setTimestamp(task.timestamp);

        document.getElementById('delayed-task-details').checked = true;
    }

    return (
        <>
            <ViewDelayedTaskModal title={title} description={description} timestamp={timestamp} category={props.category} />
            <div className={`card lg:card-side bg-warning shadow-2xl w-full h-full overflow-auto`}>
                <div className="card-body">
                    <h2 className="card-title flex justify-center">DELAYED</h2>
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