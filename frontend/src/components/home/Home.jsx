
import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
// import imagetwo from "../../images/imagetwo.png";

const Home = ()=>{

    return(
    <div className="home">
        <div className="container">
            <h1>
                Organize your <br />work and life, like a Pro.
            </h1><br />
            <p style={{fontSize: 18}}>
                Become Focused, Organized and Calm with ToDo App 🔖<br />
                The World's #1️⃣ Task Manager App.🕐
            </p><br />
            <Link to="/todo"><button class="home-btn p-2" >Make Todo List</button></Link>
        </div>

        <div className="imgtwo">
            {/* <img src={imagetwo} alt="" /> */}
        </div>    
    </div>
    );
}

export default Home;