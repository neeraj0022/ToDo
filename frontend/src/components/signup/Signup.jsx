
import React, { useState } from "react";
import "./signup.css"
import { FormLabel, FormControl, OutlinedInput, Button } from "@mui/material";
import axios from "axios";
import { styled } from "@mui/system";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StyledFormControl = styled(FormControl)({
  margin: "10px 0",
  width: "100%",
});

const StyledButton = styled(Button)({
  marginTop: "10px",
});

const SignUp = () => {

  const [inputs, setInputs] =useState({email:"", username:"", password:""  });

  const change =(e) => {
    const {name, value} =e.target;
    setInputs({...inputs, [name]:value });
  }


  const submit = async (e) => {
    e.preventDefault();
    const {email, username, password}= inputs;

    if((!email || !username || !password)){
      toast.error("Please fill all Fields.");
    }
    else{
      try {
        const response = await axios.post(`${window.location.origin}/api/v1/register`, inputs);
        const {message}= response.data;
        toast(message);
        // alert(message);
        setInputs({email:"", username:"", password:""});
        // history("/signIn");
        
      }
      catch (error) {
        const errorMessage = error.response?.data?.message
        alert(errorMessage);
      }
    }
  };
  
  

  return (
    <>
    <ToastContainer/>
    <div className="signup">

       <div className="divone">
        <h4>Sign <br /> Up</h4>
        </div> <br />

        <div className="divtwo">
            <StyledFormControl>
                <FormLabel position="top" sx={{ textAlign: "left" }}>Email</FormLabel>
                <OutlinedInput placeholder="Write your email here" type="email" name="email" onChange={change} value={inputs.email}/>
            </StyledFormControl>
            
            <StyledFormControl>
                <FormLabel position="top" sx={{ textAlign: "left" }}>Name</FormLabel>
                <OutlinedInput placeholder="Write your name here" name="username" type="username" onChange={change} value={inputs.username}/>
            </StyledFormControl>

            <StyledFormControl>
                <FormLabel position="top" sx={{ textAlign: "left" }}>Password</FormLabel>
                <OutlinedInput placeholder="Write your password here" type="password" name="password" onChange={change} value={inputs.password} />
            </StyledFormControl>

            <StyledButton variant="contained" color="primary" onClick={submit}>
                Submit
            </StyledButton>

        </div>

    </div>
    </>

  );
};

export default SignUp;
