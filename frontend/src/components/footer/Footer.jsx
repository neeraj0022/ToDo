
import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import "./footer.css"

const Footer= () =>{
    return(
        <div className="container-fluid p-3 footer">
            <br />
            <p>&copy;&nbsp;Neeraj Narwade</p>
            <p><InstagramIcon/>&nbsp;neeraj0022&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            <GitHubIcon/>&nbsp;neeraj0022</p>
        </div>
    )
}

export default Footer;