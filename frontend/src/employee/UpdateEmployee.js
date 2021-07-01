import {useState} from "react";
import Layout from "../core/Layout";
import {updateEmployee} from "../actions/apiMethods";
import { isAuthenticated } from "../auth";

const UpdateEmployee = ({match}) =>{
    const [values,setValues] = useState({
        name:"",
        salary:"",
        address:"",
        gender:"",
        team:"",
        error:"",
        success:false
    })

    const {user, token} = isAuthenticated();

    const { name, salary, address, gender, team, error, success } = values;

    const handleChange = name => event =>{
        setValues({
            ...values,
            error:false,
            [name]:event.target.value
        });
    }

    const clickSubmit = (event) =>{
        event.preventDefault();
        setValues({...values,error:false});
        console.log(team);
        updateEmployee({ name, salary, address, gender, team },token,match.params.employeeId,user._id)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false});
            }
            else{
                setValues({...values,name:"",salary:"",address:"", gender:"", team:"", error:"",success:true});
            }
        });
    }

    const employeeForm = () =>{
        return (
            <form>
                <div className = "row">
                    <div className = "form-group col-9">
                        <label className = "text-muted">Employee Name:</label>
                        <input className = "form-control" type = "text" value = {name} onChange = {handleChange("name")} />
                    </div>
                    <div className = "form-group col-3">
                        <label className = "text-muted">Salary:</label>
                        <input className = "form-control" type = "text" value = {salary} onChange = {handleChange("salary")} />
                    </div>
                </div>
                <div className = "form-group">
                    <label className = "text-muted">Address:</label>
                    <input className = "form-control" type = "text" value = {address} onChange = {handleChange("address")} />
                </div>
                <div className = "form-group">
                    <label className = "text-muted">Team:</label>
                    <select className="form-control" value = {team} onChange ={handleChange("team")}>
                        <option value = "">-Select Team-</option>
                        <option value = "IT">IT</option>
                        <option value = "Sales">Sales</option>
                        <option value = "HR">HR</option>
                        <option value = "Auditing">Auditing</option>
                    </select>
                </div>
                <label className = "text-muted">Gender:</label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="gender" value = "male" checked={gender === "male"} onChange={handleChange("gender")} />
                    <label className="form-check-label">
                        Male
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="gender" value = "female" checked={gender === "female"} onChange={handleChange("gender")}/>
                    <label className="form-check-label">
                        Female
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="gender" value = "other" checked={gender === "other"} onChange={handleChange("gender")}/>
                    <label className="form-check-label">
                        Other
                    </label>
                </div>
                <br/>
                <button className = "btn btn-primary" onClick = {clickSubmit}>Submit</button>
            </form>
        )
    }


    const showError = () =>{
        return (
            <div className = "alert alert-danger" style = {{display:error?"":"none"}}>
                {error}
            </div>
        )
    };

    const showSuccess = () =>{
        return (
            <div className = "alert alert-info" style = {{display:success?"":"none"}}>
                Employee Updated Successfully.
            </div>
        )
    }

    return (
        <Layout title = "Update Employee" description = "Fill in the Employee details." className = "container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {employeeForm()}
        </Layout>
    );
};

export default UpdateEmployee;