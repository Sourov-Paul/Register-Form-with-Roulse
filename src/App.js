import { useState } from 'react';
import './App.css';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import initilizeAuthentication from './Firbase/firebaseinit';

initilizeAuthentication()
// const googleProvider=new GoogleAuthProvider();




function App() {

// Email state=========
const [email,setEmail]=useState('')
// Password state=========
const[password,setPassword]=useState('')
// Error Strate=======
const[error,setError]=useState('');

// Already An Account toggleLogin
const [isLogin,setIsLogin]=useState(false)


const auth=getAuth();

// const handleGoogleSignIn=()=>{
//   signInWithPopup(auth,googleProvider)
//   .then(result=>{
//     const person=result.user;
//     console.log(person);
//   })
// }


// Already An Account toggleLogin

const toggleLogin= e =>{
  setIsLogin(e.target.checked)
}

// Email==

const handelEmailChange= e =>{
  setEmail(e.target.value);
}
// Password======
const handelPasswordChange= e =>{
  setPassword(e.target.value);
}
// Submit====
const handelRegidtraction=e=>{
  e.preventDefault();
// Password Roulse=====
  if(password.length<8){
 setError('Password Must Be at last 8 Characters long.')
 return
  }
if (!/(?=.*[A-Z].*[A-Z])/.test(password)){
  setError("Password Must content 2 upper Case (A/B/C)")
  return
}
if (!/(?=.*[a-z].*[a-z].*[a-z])/.test(password)){
  setError("Password Must content 2 Lower Case (a/b/c/d)")
  return
}
if (!/(?=.*[0-9].*[0-9])/.test(password)){
  setError("Password Must content 2 Number (1/2/3)")
  return
}
if (!/(?=.*[!@#$&])/.test(password)){
  setError("Password Must content any Special Case (!/#/$/&)")
  return
}

  // isLogin? processLogin(email,password): createNewUser(email,password);
// Extra solution with if

if(isLogin){
   processLogin(email,password);
  }
  else{
    registerNewUser(email,password);
  }

 
}
  
const processLogin=(email,password)=>{
  signInWithEmailAndPassword(auth,email,password)
  .then(result=>{
    const user=result.user;
    console.log(user);
    setError("")
  })
  .catch(error=>{
    setError(error.massage)
  })

}
const registerNewUser=(email,password)=>{
  createUserWithEmailAndPassword (auth,email,password)
  .then(result=>{
    const personInfo=result.user;
    console.log(personInfo)
    setError('Regegtation Submited')
  })
  .catch(error=>{
    setError(error.massage)
  })
}


  return (
    <div >
    <form className="mx-5 mt-5" onSubmit={handelRegidtraction}>
      <h2 className="text-center text-primary mb-4">Please {isLogin ? "Login":"Register"} </h2>
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      {/* Email */}
      <input  onBlur={handelEmailChange} required type="email" className="form-control" id="inputEmail3" />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      {/* Password */}
      <input onBlur={handelPasswordChange} required type="password" className="form-control" id="inputPassword3"/>
    </div>
  </div>
 
  <div className="row mb-3">
    <div className="col-sm-10 offset-sm-2">
      <div className="form-check">
        <label htmlFor="gridCheck1"> Already Have an Account </label>
        <input onChange={toggleLogin}  className="form-check-input" type="checkbox" id="gridCheck1"/>

        <span className="form-check-label" htmlFor="gridCheck1">
     {error}    </span>
      </div>
    </div>
  </div>
  <button  type="submit" className="btn btn-primary">{isLogin ? "Log In":"Register"} </button>
  {/* <button onClick={handleGoogleSignIn} type="submit" className="btn btn-primary">Sign in</button> */}
</form>
    </div>
  );
}

export default App;
