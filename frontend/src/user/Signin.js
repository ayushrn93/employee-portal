import { useState } from "react";
import Layout from "../core/Layout";
import { signin, authenticate } from "../auth";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

const Signin = () =>{
    const [values,setValues] = useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        redirectToReferer:false
    })

    const { email, password, error, redirectToReferer, loading } = values;

    const handleChange = name => event =>{
        setValues({
            ...values,
            error:false,
            [name]:event.target.value
        });
    }

    const clickSubmit = (event) =>{
        event.preventDefault();
        setValues({...values,error:false,loading:true});
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false});
            }
            else{
                authenticate(data,()=>{
                    setValues({...values, loading:false, redirectToReferer:true});    
                });
            }
        });
    }

    const signInForm = () =>{
        return (
            <form>
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


    const showLoading = () =>(
            loading&&<div className = "alert alert-info">Loading...</div>
    );

    const showError = () =>{
        return (
            <div className = "alert alert-danger" style = {{display:error?"":"none"}}>
                {error}
            </div>
        )
    };

    const redirectUser = () =>{
        if(redirectToReferer){
            if(isAuthenticated().user.role===1)
                return <Redirect to ="/admin/dashboard" />;
            else return <Redirect to ="/user/dashboard" />;
        }
        
        if(isAuthenticated())
            return <Redirect to ="/" />;
    };

    return (
            <Layout title = "Signin" description = "Sign in to Employee Portal" className = "container col-md-8 offset-md-2">
                {showLoading()}
                {showError()}
                {signInForm()}
                {redirectUser()}
            </Layout>
    );
};

export default Signin;