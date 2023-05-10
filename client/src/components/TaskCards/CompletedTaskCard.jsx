import { useState } from "react";
import ViewCompletedTaskModal from "../modals/CompletedTask/view";

export default function CompletedTaskCard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [timestamp, setTimestamp] = useState("");

    function displayModal(task) {
        setTitle(task.title);
        setDescription(task.description);
        setTimestamp(task.timestamp);

        document.getElementById('completed-task-details').checked = true;
    }

    return (
        <>
            <ViewCompletedTaskModal title={title} description={description} timestamp={timestamp} category={props.category} />
            <div className="card bg-success shadow-2xl w-full h-full overflow-auto">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">COMPLETED</h2>
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
