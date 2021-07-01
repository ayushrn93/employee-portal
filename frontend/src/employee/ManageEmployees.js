import {useState,useEffect} from "react";
import Layout from "../core/Layout";
import {deleteEmployee, getEmployees} from "../actions/apiMethods";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const ManageEmployees = () =>{
    const [employees,setEmployees] = useState([]);
    const [limit,setLimit] = useState("5");
    const [page,setPage] = useState(1);
    const [total,setTotal] = useState(0);
    const [search,setSearch] = useState("");

    const {user,token} = isAuthenticated();

    const loadEmployees = () =>{
        getEmployees(limit,page,search).then(data =>{
            if(data.error){
                console.log(data.error);
            }else{
                setEmployees(data.employees);
                setTotal(data.total);
            }
        })
    };

    const disableNext = () =>{
        let totalPages = Math.floor((total + parseInt(limit) - 1) / parseInt(limit));
        return totalPages===page?"page-item disabled":"page-item";
    }

    useEffect(()=>{
        loadEmployees();
    },[]);

    useEffect(() =>{
        loadEmployees();
    },[limit,page]);

    const destroy = employeeId =>{
        deleteEmployee(token,employeeId,user._id)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                loadEmployees();
            }
        })
    }
    return (
        <Layout title = "Manage Employees" description = "Find details of all the employees here." className ="container-fluid">
            <form onSubmit={(event)=>{event.preventDefault();loadEmployees();}}>
                <div className = "form-group">
                    <input className = "form-control" type = "text" value = {search} onChange = {(event)=>{event.preventDefault();setSearch(event.target.value)}} placeholder="Enter Employee's Name" />
                </div>
            </form>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Employee ID</th>
                        <th scope="col">Employee Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Team</th>
                        <th scope="col">Address</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp=>(
                        <tr key ={emp._id}>
                            <th scope="row">{emp._id}</th>
                            <td>{emp.name}</td>
                            <td>{emp.gender}</td>
                            <td>{emp.salary}</td>
                            <td>{emp.team}</td>
                            <td>{emp.address}</td>
                            <td>
                                <Link to ={`/employee/update/${emp._id}`}>
                                    <span className="glyphicon glyphicon-pencil"></span>
                                </Link>
                                <span className="glyphicon glyphicon-trash" onClick = {()=>destroy(emp._id)}></span>
                            </td>
                        </tr>
                        )
                    )}
                </tbody>
            </table>
            <br/>
            <div className = "row">
                <div className = "form-group col-1">
                    <label className = "text-muted">Items per Page: </label>
                    <select className="form-control" value = {limit} onChange ={(event)=>{event.preventDefault();setLimit(event.target.value);}}>
                        <option value = "5">5</option>
                        <option value = "10">10</option>
                        <option value = "25">25</option>
                        <option value = "50">50</option>
                        <option value = "100">100</option>
                    </select>
                </div>
                <ul className="pagination col-5">
                    <li className = {page!==1?"page-item":"page-item disabled"}>
                        <br/>
                        <span className = "page-link" onClick = {(event)=>{event.preventDefault();setPage(page-1)}}>Previous</span>
                    </li>
                    <li className = {disableNext()}>
                        <br/>
                        <span className = "page-link" onClick = {(event)=>{event.preventDefault();setPage(page+1)}}>Next</span>
                    </li>
                </ul>
            </div>
            <br/>
            <Link to ="/employee/create"><span className="badge badge-primary">Add Employee</span></Link>
        </Layout>
    );
};

export default ManageEmployees;