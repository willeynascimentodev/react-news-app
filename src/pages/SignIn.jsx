import LoginForm from "../components/LoginForm";
import NavMenu from "../components/NavMenu";

function SignIn() {
    

    return (
        <>  
            <NavMenu/>
            <div className="container">
                <h1 className="text-center">News Agregator Sign In</h1>
                <LoginForm/>
            </div>
        </>
    )
}

export default SignIn;