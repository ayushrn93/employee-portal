import {Link, withRouter} from "react-router-dom";
import { signout, isAuthenticated } from '../auth';

const Menu = ({history}) =>{

    const isActive = (history,path) =>{
        if(history.location.pathname===path){
            return {color:"orange"};
        }
        else return {color:"white"};
    };


    return(
        <div>
            <ul className = "nav nav-tabs bg-primary">
                <li className = "nav-item">
                    <Link className = "nav-link" to = "/" style = {isActive(history,"/")}>Employee Portal</Link>
                </li>
                {isAuthenticated() &&
                    <li className = "nav-item">
                        <Link className = "nav-link" to = "/user/dashboard" style = {isActive(history,"/user/dashboard")}>Dashboard</Link>
                    </li>
                }

                {!isAuthenticated() &&
                <>
                    <li className = "nav-item">
                        <Link className = "nav-link" to = "/signup" style = {isActive(history,"/signup")}>Signup</Link>
                    </li>
                    <li className = "nav-item">
                        <Link className = "nav-link" to = "/signin" style = {isActive(history,"/signin")}>Signin</Link>
                    </li>
                </>
                }
                {isAuthenticated() &&
                    <li className = "nav-item">
                        <span className = "nav-link" style = {{cursor:'pointer',color:"white"}} onClick ={()=>
                            signout(() =>{
                                history.push('/');
                            })
                        }>Signout</span>
                    </li>
                }
            </ul>
        </div>
    );
}

export default withRouter(Menu);