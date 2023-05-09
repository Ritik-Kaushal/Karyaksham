import { useState } from "react";
import ModalPortal from "./ModalPortal";
import store from "@/store/baseStore";
import { markUndone, deleteTask} from "@/store/taskStore";

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
                    {props.tasklist.length!==0 ? <div className="flex flex-col">
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

// Modal to display details of completed tasks
function ViewCompletedTaskModal(props) {

    function markTaskNotDone(){
        store.dispatch(markUndone({title:props.title, category:props.category}));
        document.getElementById('completed-task-details').checked = false;

    }

    function deleteThisTask(){
        store.dispatch(deleteTask({title:props.title, category:props.category, from:"completed"}));
        document.getElementById('completed-task-details').checked = false;
    }

    return (
        <ModalPortal>
            <input type="checkbox" id="completed-task-details" className="modal-toggle" />
            <label htmlFor="completed-task-details" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold text-center">{props.title}</h3>
                    <br></br>
                    <div class="relative z-0 w-full mb-6 group">
                        <strong>Description : </strong>{props.description}
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <strong>Timestamp : </strong>{props.timestamp}
                    </div>

                    <div className="flex justify-center">
                        <button className="btn btn-outline btn-success mr-2" onClick={() => {markTaskNotDone()}}>Mark As Not Done</button>
                        <button className="btn btn-outline btn-error mr-2" onClick={() => {deleteThisTask()}}>Delete</button>
                    </div>
                </label>
            </label>
        </ModalPortal>
    )
}



