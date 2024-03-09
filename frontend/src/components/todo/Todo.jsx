import React, { useState, useEffect, useCallback } from 'react';
import './todo.css';
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Update } from './Update';
import axios from "axios";
import { useSelector } from "react-redux";

export const Todo = () => {

    const isLoggedIn= useSelector((state)=> state.isLoggedIn );

    const [showTextarea, setShowTextarea] = useState(false);
    const [inputs, setInputs] = useState({ title: "", body: "" });
    const [array, setArray] = useState([]);
    const id = sessionStorage.getItem("id");

    const showTextareaOnClick = () => {
        setShowTextarea(true);
    };

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

    const submit = useCallback(async () => {
        if (!isLoggedIn) {
            if (inputs.title === "") {
                toast.error("Title Can't Be Empty 👾");
            }
            else{   
                setArray([...array, inputs]);
                setInputs({ title: "", body: "" });
                toast.error("Your Task Is Added 👍, Please SignIn to Save");
            }
            return;
        }
        
    
        if (inputs.title === "") {
            toast.error("Title Can't Be Empty 👾");
        }
        else{
            try {
                await axios.post(`http://localhost:3000/api/v2/addTask`, {
                    title: inputs.title,
                    body: inputs.body,
                    id: id,
                });
                toast.success("Your Task is Added 👍");
                setInputs({ title: "", body: "" });
                setShowTextarea(false);
            }
            catch (error) {
                toast.error("Failed to add task. Please try again later.");
            }
        }
    }, [isLoggedIn, inputs, array, id]);

    const del = async (Cardid) => {
        try {
            await axios.delete(`http://localhost:3000/api/v2/deleteTask/${Cardid}`, { data: { id: id } });
            // Remove the deleted task from the array
            const updatedArray = array.filter(item => item._id !== Cardid);
            setArray(updatedArray);
            toast.success("Your Task Is Deleted ❌");
        }
        catch (error) {
            toast.error("Failed to delete task.");
        }
    };

    const tdel = (index) => {
        // Create a copy of the array to avoid mutation
        const updatedArray = [...array];
        
        // Check if the index is within the valid range
        if (index >= 0 && index < updatedArray.length) {
            // Remove the item at the specified index
            updatedArray.splice(index, 1);
            setArray(updatedArray);
            toast.success("Your Task Is Deleted ❌");
        }
        else {
            // Handle invalid index (optional: display an error message)
            console.error("Invalid task index:", index);
        }
    };
    
    

    const dis =(value) =>{
        document.getElementById("todo-update").style.display=value;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await axios.get(`http://localhost:3000/api/v2/getTask/${id}`);
                    setArray(response.data.list);
                }
            }
            catch (error) {
                console.error("Error fetching tasks:", error);
                toast.error("Failed to fetch tasks. Please try again later.");
            }
        };
        fetchData();

    }, [id, submit]);

    return (
        <>
            <div className="todo" style={{ display: "block" }}>
                <ToastContainer />
                <div className="todo-main d-flex container flex-column">
                    <div className="d-flex my-3 flex-column todo-inputs-div w-50 p-1">
                        <input
                            className="my-2 p-2 todo-inputs"
                            type="text"
                            id="title"
                            placeholder="Title"
                            name='title'
                            onClick={showTextareaOnClick}
                            value={inputs.title}
                            onChange={change}
                        />

                        {showTextarea && (
                            <textarea
                                className="p-2 todo-inputs"
                                type="text"
                                id="textarea"
                                name='body'
                                placeholder="Body"
                                value={inputs.body}
                                onChange={change}
                            />
                        )}
                    </div>

                    <div className='w-30 d-flex '>
                        <button className='home-btn bg-primary px-2 py-1 my-2 ' 
                        onClick={submit}>Add Task </button>
                    </div>
                </div>

                <div className="todo-body w-100">
                    <div className="container">
                        <div className='row justify-content-center'>

                        {isLoggedIn && array && array.map((item, index) =>
                                <div className="col-lg-4 col-11 my-3" key={index}>
                                    <TodoCards title={item.title} 
                                               body={item.body} 
                                               id={item._id} 
                                               del={del}
                                               display={dis} />
                                </div>
                        )}

                        {!isLoggedIn && array && array.map((item, index) =>
                                <div className="col-lg-4 col-11 my-3" key={index}>
                                    <TodoCards title={item.title} 
                                               body={item.body} 
                                               id={index} 
                                               tdel={tdel}
                                               display={dis} />
                                </div>
                        )}
                        


                        </div>
                    </div>
                </div>
            </div>

            <div className="todo-update">
                <div className='container'>
                    <Update />
                </div>
            </div>
        </>
    );
};

export default Todo;
