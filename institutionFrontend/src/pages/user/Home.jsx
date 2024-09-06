import { useNavigate } from "react-router-dom";

const Home=()=>{
    const navigate = useNavigate()
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center">Welcome to our website</h1>

                </div>
            </div>
            <button onClick={()=>navigate('/signup')} className="text-white bg-blue-500 p-10">
                Go To Signup
            </button>
        </div>
    )
}
export default Home;