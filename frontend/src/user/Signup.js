import {useState} from "react";
import Layout from "../core/Layout";
import {signup} from "../auth";
import {Link} from "react-router-dom";

const Signup = () =>{
    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    })

    const {name,email,password,error,success} = values;

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
        signup({name,email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false});
            }
            else{
                setValues({...values,name:"",email:"",password:"",error:"",success:true});
            }
        });
    }

    const signUpForm = () =>{
        return (
            <form>
                <div className = "form-group">
                    <label className = "text-muted">Name:</label>
                    <input className = "form-control" type = "text" value = {name} onChange = {handleChange("name")} />
                </div>
                <div className = "form-group">
                    <label className = "text-muted">Email:</label>
                    <input className = "form-control" type = "email" value = {email} onChange = {handleChange("email")} />
                </div>
                <div className = "form-group">
                    <label className = "text-muted">Password:</label>
                    <input className = "form-control" type = "password" value = {password} onChange = {handleChange("password")} />
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
                Account Created Successfully. Please <Link to = "/signin">Signin</Link>
            </div>
        )
    }

    return (
        <Layout title = "Signup" description = "Signup to Employee Portal" className = "container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;