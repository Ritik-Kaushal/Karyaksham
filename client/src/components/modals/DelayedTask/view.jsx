import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment';
import store from "@/store/baseStore";
import { markUndone, deleteTask } from "@/store/taskStore";
import ModalPortal from '@/components/ModalPortal';

// Modal to display details of completed tasks
export default function ViewDelayedTaskModal(props) {

    function markTaskNotDone() {
        store.dispatch(markUndone({ title: props.title, category: props.category, from: "delayed" }));
        document.getElementById('delayed-task-details').checked = false;

    }

    function deleteThisTask() {
        store.dispatch(deleteTask({ title: props.title, category: props.category, from: "delayed" }));
        document.getElementById('delayed-task-details').checked = false;
    }

    return (
        <ModalPortal>
            <input type="checkbox" id="delayed-task-details" className="modal-toggle" />
            <label htmlFor="delayed-task-details" className="modal cursor-pointer">
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
                        <button className="btn btn-outline btn-success mr-2" onClick={() => { markTaskNotDone() }}>Mark As Not Done</button>
                        <button className="btn btn-outline btn-error mr-2" onClick={() => {  deleteThisTask() }}>Delete</button>
                    </div>
                </label>
            </label>
        </ModalPortal>
    )
}



