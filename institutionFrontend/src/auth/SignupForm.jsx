import { useNavigate } from "react-router-dom";




const SignupForm =()=>{
    const navigate =  useNavigate()
    return(
        <div>
            <h1>Signup Form</h1>
            <button onClick={()=> navigate('/login')} className="text-white bg-blue-500 p-10">
                Go To Login
            </button>
        </div>
    )
}
export default SignupForm;