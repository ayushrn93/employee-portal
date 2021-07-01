import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import CreateEmployee from "./employee/CreateEmployee";
import UpdateEmployee from "./employee/UpdateEmployee";
import ManageEmployees from "./employee/ManageEmployees";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = "/" exact component = {Home} />
        <Route path = "/signup" exact component = {Signup} />
        <Route path = "/signin" exact component = {Signin} />
        <PrivateRoute path = "/user/dashboard" exact component = {Dashboard} />
        <PrivateRoute path = "/employee/create" exact component = {CreateEmployee} />
        <PrivateRoute path = "/employee/update/:employeeId" exact component = {UpdateEmployee} />
        <PrivateRoute path = "/employees/manage" exact component = {ManageEmployees} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
