
import React from 'react';
import "./todo.css";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { useSelector } from "react-redux";

export const TodoCards = ({title, body, id, del, tdel, display, updatedId, toBeUpdate }) => {
 
  const isLoggedIn= useSelector((state)=> state.isLoggedIn );
  const deleteCard= ()=>{
    if(isLoggedIn){
      del(id);
    }
    else{
      tdel(id);
    }
  }
  return (
    <div className="p-3 todo-card ">

        <h6>{title}</h6>
        <p className="todo-card-p">
            {body.length > 65 ? `${body.slice(0, 65)}...` : body}
        </p>
        <br />
        <div className='d-flex container justify-content-between' >
            <div>
              <UpdateIcon className='card-icons'  
              onClick={() => {
                display("block");
                toBeUpdate(updatedId);
              }
              } />
            
            </div>
            
            <div>
              <DeleteIcon className='card-icons' style={{color:"red"}} onClick={()=> {
                deleteCard();
              }}/>
            </div>
        </div>

    </div>
  )
};

export default TodoCards;
