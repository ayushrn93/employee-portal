import Menu from "./Menu";

const Layout = ({ title="title", description = "description", className, children }) =>{
    return (
        <div>
            <Menu />
            <div className ="jumbotron">
                <h2>{title}</h2>
                <br />
                <p className = "lead">{description}</p>
            </div>
            <div className = {className}>{children}</div>
        </div>
    );
};

export default Layout;