import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment';
import store from "@/store/baseStore";
import { markDone,deleteTask } from "@/store/taskStore";
import ModalPortal from '@/components/ModalPortal';

// Modal to display details of tasks
export default function ViewMissedTaskModal(props) {

    function markTaskDone(){
        store.dispatch(markDone({title:props.title, category:props.category, from:"missed"}));
        document.getElementById('missed-task-details').checked = false;

    }

    function editThisTask(){
        props.setTitle(props.title);
        props.setDescription(props.description);
        props.setTimestamp(props.timestamp);

        document.getElementById('missed-task-details').checked = false;
        document.getElementById('edit-missed-task-details').checked = true;
    }

    function deleteThisTask(){
        store.dispatch(deleteTask({title:props.title, category:props.category, from:"missed"}));
        document.getElementById('missed-task-details').checked = false;
    }

    return (
        <ModalPortal>
            <input type="checkbox" id="missed-task-details" className="modal-toggle" />
            <label htmlFor="missed-task-details" className="modal cursor-pointer">
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
                        <button className="btn btn-outline btn-success mr-2" onClick={() => {markTaskDone()}}>Mark Done</button>
                        <button className="btn btn-outline btn-success mr-2" onClick={() => {editThisTask()}}>Edit</button>
                        <button className="btn btn-outline btn-error mr-2" onClick={() => {deleteThisTask()}}>Delete</button>
                    </div>
                </label>
            </label>
        </ModalPortal>
    )
}



