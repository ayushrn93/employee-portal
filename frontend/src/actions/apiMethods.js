import {API} from "../config";

export const createEmployee = (employee,token, userId) =>{
    return fetch(`${API}/employee/create/${userId}`,{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify(employee)
    })
    .then(response=>response.json())
    .catch(err=>console.log(err));
};

export const deleteEmployee = (token, employeeId, userId) =>{
    return fetch(`${API}/employee/${employeeId}/${userId}`,{
        method:"DELETE",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response=>response.json())
    .catch(err=>console.log(err));
};

export const getEmployee = (employeeId) =>{
    return fetch(`${API}/employee/${employeeId}`,{
        method:"GET",
    })
    .then(response=>response.json())
    .catch(err=>console.log(err));
};

export const updateEmployee = (employee,token, employeeId, userId,) =>{
    return fetch(`${API}/employee/${employeeId}/${userId}`,{
        method:"PUT",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify(employee)
    })
    .then(response=>response.json())
    .catch(err=>console.log(err));
};

export const getEmployees = (limit,page,search) =>{
    return fetch(`${API}/employees?search=${search}&limit=${limit}&page=${page}`,{
        method:"GET"
    }).then(response=>response.json())
    .catch(err=>console.log(err));

};