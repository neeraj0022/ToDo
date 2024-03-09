
import React from 'react'
import "./todo.css"

export const Update = () => {
  return (
    <div className='p-5 d-flex align-items-start flex-column update'>

        <h4>Update Your Task</h4>
        <input type="text" placeholder='Title' className='todo-inputs w-100 p-3 my-3 ' />
        <textarea placeholder='Body' className='todo-inputs w-100 p-3' />
        <button className='btn btn-dark my-3 '>Update</button>

    </div>
  )
}
