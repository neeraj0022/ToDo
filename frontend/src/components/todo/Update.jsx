
import React, { useState, useEffect } from 'react';
import "./todo.css"
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
export const Update = ({ display, update }) => {
  
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [updatesQueue, setUpdatesQueue] = useState([]); // Queue for storing updates when not logged in

  useEffect(() => {
      setInputs({ title: update.title, body: update.body });
  }, [update]);

  const change = (e) => {
      const { name, value } = e.target;
      setInputs({ ...inputs, [name]: value });
  }

  const submit = async () => {
      try {
          if (isLoggedIn) {
              await axios.put(`http://localhost:8000/api/v2/updateTask/${update._id}`, inputs);
              toast.success("Task updated successfully");
              display("none");
          } 
          else {
              // If not logged in, store the updates locally
              setUpdatesQueue([...updatesQueue, inputs]);
              display("none");
              toast.info("You need to log in to update the task. Your changes will be applied after logging in.");
          }
      } catch (error) {
          toast.error("Failed to update task. Please try again later.");
      }
  }

  return (
      <div className='p-5 d-flex align-items-start flex-column update'>
          <ToastContainer />
          <h4>Update Your Task</h4>
          <input
              type="text"
              placeholder='Title'
              name='title'
              className='todo-inputs w-100 p-3 my-3'
              value={inputs.title}
              onChange={change}
          />
          <textarea
              placeholder='Body'
              name='body'
              className='todo-inputs w-100 p-3'
              value={inputs.body}
              onChange={change}
          />
          <button className='btn btn-dark my-3' onClick={submit}>Update</button>
      </div>
  );
}
