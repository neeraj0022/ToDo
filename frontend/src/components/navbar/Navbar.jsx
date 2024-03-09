import React from "react";
import "./Navbar.css";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import BookIcon from '@mui/icons-material/Book';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const dispatch = useDispatch();
    const history = useNavigate();

    const logoutandHome = () => {
        logout();
        window.location.reload();
        history("/");
    }
      
    const logout = () => {
        dispatch(authActions.logout());
        sessionStorage.clear("id");
    }
      

    return (
        <>
              <nav className="navbar navbar-expand-lg  ">
                  <div className="container navbar-body">
                    <Link to={"/"} className="navbar-brand">
                        <BookIcon color="primary" sx={{ fontSize: 40 }} />
                        <Link className="navbar-brand" to="/todo">&nbsp; ToDo </Link>&nbsp;&nbsp;&nbsp;
                    </Link>

                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                      </button>

                      <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                          <ul className="navbar-nav">

                              <li className="nav-item">
                                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                              </li>

                              <li className="nav-item">
                                  <Link className="nav-link active" aria-current="page" to="/about">About Us</Link>
                              </li>
                          </ul>

                          <ul className="navbar-nav">
                              <div className="d-flex align-items-center"> {/* Add this div */}

                                {!isLoggedIn && <>
                                  <li className="nav-item mx-2">
                                      <Link className="nav-link active btn-nav" aria-current="page" to="/signUp">Sign Up</Link>
                                  </li>&nbsp;

                                  <li className="nav-item mx-2">
                                      <Link className="nav-link active btn-nav" aria-current="page" to="/signIn">Sign In</Link>
                                  </li>&nbsp;
                                </> }

                                {isLoggedIn && <>
                                  <li className="nav-item mx-2">
                                      <Link className="nav-link active btn-nav" aria-current="page" to="#" onClick={logoutandHome} >Log Out</Link>
                                  </li>&nbsp;

                                  <li className="nav-item mx-2">
                                      <Link className="nav-link active" aria-current="page" to="#">
                                          <AccountCircleRoundedIcon sx={{ fontSize: 37, color: "red" }} />
                                      </Link>
                                  </li>

                                </> }


                              </div>
                          </ul>

                      </div>
                  </div>
              </nav>
        </>
    )
}

export default Navbar;