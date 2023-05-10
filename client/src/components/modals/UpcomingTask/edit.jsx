import React, { useEffect, useState, useRef } from 'react'
import ModalPortal from '@/components/ModalPortal';

import moment from 'moment';
import store from "@/store/baseStore";
import { updateTask } from "@/store/taskStore";


// Modal to edit upcoming task
export default function EditUpcomingTaskModal(props) {
  const [oldTitle, setOldTitle] = useState(props.title);

  useEffect(() => {
    setOldTitle((prevTitle) => prevTitle || props.title);
  }, [props.title]);


  function valid(date) {
    const currentDate = moment();
    const format = 'DD/MM/YYYY HH:mm';
    const inputDate = moment(date, format, true);

    return inputDate.isValid() && inputDate.isAfter(currentDate);
  }

  function handleUpdateTask() {
    store.dispatch(updateTask({ category: props.category, from: "upcoming", oldTitle: oldTitle, task: { title: props.title, description: props.description, timestamp: props.timestamp } }));
    document.getElementById('edit-upcomming-task-details').checked = false;
    props.setTitle("");
    props.setDescription("");
    props.setTimestamp("");
    setOldTitle("");

  }

  return (
    <ModalPortal>
      <input type="checkbox" id="edit-upcomming-task-details" className="modal-toggle" />
      <label htmlFor="edit-upcomming-task-details" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold text-center">Create Task</h3>
          <br></br>
          <div className="relative z-0 w-full mb-6 group">
            <input type="text" value={props.title} onChange={(e) => props.setTitle(e.target.value)} name="edit-task-title" id="edit-task-title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="edit-task-title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title of Task</label>

          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input type="text" value={props.description} onChange={(e) => props.setDescription(e.target.value)} name="edit-task-description" id="edit-task-description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="edit-task-description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description of Task</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input type="text" value={props.timestamp} onChange={(e) => {
              props.setTimestamp(e.target.value);
              if (valid(e.target.value)) {
                props.setColor("blue");
              }
              else {
                props.setColor("red");
              }
            }} name="edit-task-datetime" id="edit-task-datetime" className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-${props.color}-500 focus:outline-none focus:ring-0 focus:border-${props.color}-600 peer`} placeholder=" " required />
            <label for="edit-task-datetime" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-${props.color}-600 peer-focus:dark:text-${props.color}-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>Choose the deadline (Eg: 24/12/2001 14:59)</label>
          </div>


          {props.title && props.description && props.timestamp && valid(props.timestamp) ? <button className="create-task-Button btn btn-outline btn-info float-right" onClick={handleUpdateTask}>Update</button> : <button className="btn btn-outline btn-info float-right cursor-not-allowed">Update</button>}
        </label>
      </label>
    </ModalPortal>
  )
}
