import {useState} from "react"
import {useNavigate} from "react-router-dom"
import "./Auth.css"
import { ToastContainer, toast } from 'react-toastify';
const Auth =()=>{
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const [pageSetup,setPageSetup] = useState("signup")
  const [loginDetails,setLoginDetails]=useState({
    name:"",
    email:"",
    password:""
  })
  const [message,setMessage] = useState("")
  
  const handleChange =(e)=>{
    setLoginDetails({
      ...loginDetails,
      [e.target.name]:e.target.value
    })
  }
  
  const handleSubmit =(e)=>{
    e.preventDefault();
    if(pageSetup === "signup"){
      setIsLoading(true)
      fetch("http://localhost:5000/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(loginDetails)
      }).then(res=>res.json()).then((data)=>{
        setIsLoading(false)
        console.log(data.message)
        toast(data.message);
        localStorage.setItem("userDetails", JSON.stringify(data.userDetails));
        localStorage.setItem("token",data.token);
            if(data.status==200){
      setTimeout(()=>{
          navigate("/")
        },2000)
    }
      }).catch(error=>{
        setIsLoading(false);
        toast("unable to create account")
        setLoginDetails({
    name:"",
    email:"",
    password:""})
      })
    }else{
      setIsLoading(true)
      fetch("http://localhost:5000/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(loginDetails)
      }).then(res=>res.json()).then((data)=>{
        setIsLoading(false)
        console.log(data.message)
        toast(data.message)
        localStorage.setItem("userDetails", JSON.stringify(data.userDetails));
        localStorage.setItem("token",data.token);
    if(data.status==200){
      setTimeout(()=>{
          navigate("/")
        },1500)
    }
        
        
      }).catch(error=>{
        setIsLoading(false);
        toast("unable to login account")
        setLoginDetails({
    name:"",
    email:"",
    password:""})
      })
    }
    
  }
  return(
    <div className="auth-container">
      <ToastContainer /> 
      <div className="auth-card">

  {/* Header */}
<div className="auth-header">
  <div className="logoname">
    FeetFitness
  </div>

  <h2 className="title">
    {pageSetup === "signup" ? "Create Account" : "Welcome Back"}
  </h2>
</div>

        {/* Form */}
        <div className="auth-form">

          {pageSetup === "signup" && (
            <input
              name="name"
              value={loginDetails.name}
              placeholder="Full Name"
              className="auth-input"
              onChange={handleChange}
            />
          )}

          <input
            name="email"
            value={loginDetails.email}
            placeholder="Email Address"
            className="auth-input"
            onChange={handleChange}
          />

          {/* Password */}
          <div className="password-wrapper">
            <input
              name="password"
              value={loginDetails.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="auth-input password-input"
            />

            <button
              type="button"
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-10-7a10.05 10.05 0 012.293-3.95M6.223 6.223A9.956 9.956 0 0112 5c5 0 9 4 10 7a9.97 9.97 0 01-4.293 4.95M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6L3 3"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.633 0C21.5 7.943 17.523 5 12 5S2.5 7.943 1.367 12C2.5 16.057 6.477 19 12 19s9.5-2.943 10.633-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Button */}
          <button className="auth-btn" onClick={handleSubmit}>
            {pageSetup === "signup" ? "Create Account" : "Sign In"}
            {isLoading && <p className="loader" ></p>}
          </button>
        </div>

        {/* Footer */}
        <div className="auth-footer">
          <p>
            {pageSetup === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>

          <button
            onClick={() =>
              setPageSetup(pageSetup === "signup" ? "signin" : "signup")
            }
            className="switch-btn"
          >
            {pageSetup === "signup" ? "Sign In" : "Register"}
            
          </button>
        </div>

      </div>
    </div>
  )
}

export default Auth;