
import './App.css';
import Navbar from "./components/navbar/Navbar"
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from './components/signup/Signup';
import SignIn from './components/signup/Signin';
import Todo from './components/todo/Todo';
import { useDispatch } from "react-redux";
import { authActions } from "./store";

function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    const id =sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }

  })
  

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/todo" element={<Todo/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/signIn" element={<SignIn/>} />
        </Routes>
      </Router>

      <Footer/>

    </div>
  )
}

export default App;
