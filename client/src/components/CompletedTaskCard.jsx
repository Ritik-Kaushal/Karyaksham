import { useEffect, useState } from "react";
import ModalPortal from "./ModalPortal";
// ModalPortal

export default function CompletedTaskCard(props) {
    return (
        <>
            <CompletedTaskModal/>
            <div className="card bg-success shadow-2xl w-full h-full overflow-auto">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">COMPLETED</h2>
                    {props.tasklist ? <div className="flex flex-col">
                        {props.tasklist.map((task, index) => (
                            <>
                                <div className="tooltip task" data-tip="Click to view details" onClick={() => displayModal()}>
                                    <h3 className="task-title">{`${index + 1} : ${task.title}`}</h3>
                                    <p className="task-details">{task.description}</p>
                                </div>

                            </>
                        ))}
                    </div> : <p>No data to display</p>}
                </div>
            </div>

        </>
    )
}

function displayModal() {
    document.getElementById('completed-task-details').checked = true;
}

// Modal to display details of completed tasks
function CompletedTaskModal(props) {
    return (
        <ModalPortal>
            <input type="checkbox" id="completed-task-details" className="modal-toggle" />
            <label htmlFor="completed-task-details" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold text-center">{props.title}</h3>
                    <br></br>
                    <div class="relative z-0 w-full mb-6 group">
                        Hello
                    </div>
                    <button className="completed-task-details-Button btn btn-outline btn-info float-right" onClick={() => { }}>Create</button>
                </label>
            </label>
        </ModalPortal>
    )
}



