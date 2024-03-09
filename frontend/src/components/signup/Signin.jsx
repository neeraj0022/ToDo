
import React from "react";
import "./signup.css";
import { FormLabel, FormControl, OutlinedInput, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StyledFormControl = styled(FormControl)({
  margin: "10px 0",
  width: "100%",
});

const StyledButton = styled(Button)({
  marginTop: "10px",
});


const SignIn = () => {

  const dispatch = useDispatch();
  const history = useNavigate();

  const [inputs, setInputs] = useState({email:"", password:""});

  const change =(e) => {
    const {name, value} =e.target;
    setInputs({...inputs, [name]:value });
  }



  const submit = async(e) =>
  {
    e.preventDefault();
    try {
        const response = await axios.post(`${window.location.origin}/api/v1/signin`, inputs);
        const user = response.data.user;
        if (user)
        {
            alert("Signed In Sucessfull.👍");
            sessionStorage.setItem("id", user._id);
            dispatch(authActions.login());
            history("/todo");
        } 
        else{
            // User not found
            toast.error("Invalid Login Credentials.👾");
        }
    }
    catch (error) {
      alert("Network error");
    }
  }


  return (
    <>
    <ToastContainer/>
    <div className="signup">
       <div className="divone">
        <h4>Sign <br /> In</h4>
        </div> <br />

        <div className="divtwo">
            <StyledFormControl>
                <FormLabel position="top" sx={{ textAlign: "left" }}>Email</FormLabel>
                <OutlinedInput placeholder="Write your email here" type="email" name="email" value={inputs.email} onChange={change}/>
            </StyledFormControl>

            <StyledFormControl>
                <FormLabel position="top" sx={{ textAlign: "left" }}>Password</FormLabel>
                <OutlinedInput placeholder="Write your password here" type="password" name="password" value={inputs.password} onChange={change} />
            </StyledFormControl>

            <StyledButton variant="contained" color="primary" onClick={submit}>
                Submit
            </StyledButton>

        </div>

    </div>
    </>

  );
};

export default SignIn;
