import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Dashboard = () =>{

    const {user:{ name, email }} = isAuthenticated();

    const userInfo = () =>(
        <div className = "card mb-5">
            <h3 className = "card-header">User Info</h3>
            <ul className = "list-group">
                <li className = "list-group-item">{name}</li>
                <li className = "list-group-item">{email}</li>
                <li className = "list-group-item">Default User</li>
            </ul>
        </div>
    );

    const userLinks = () =>(
        <div className = "card">
            <h3 className = "card-header">User Links</h3>
            <ul className = "list-group">
                <li className = "list-group-item">
                    <Link className = "nav-link" to ="/employee/create">
                        Create Employee
                    </Link>
                </li>
            </ul>
            <ul className = "list-group">
                <li className = "list-group-item">
                    <Link className = "nav-link" to ="/employees/manage">
                        Manage Employees
                    </Link>
                </li>
            </ul>
        </div>
    );

    return (
        <Layout title ="Dashboard" description ="Your personal dashboard">
            <div className = "row">
                <div className = "col-3">
                    {userLinks()}
                </div>

                <div className = "col-9">
                    {userInfo()}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;