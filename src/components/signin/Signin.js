import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate  } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { API } from '../../global/connect';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment } from '@mui/material';
import './signin.css'
import EmailIcon from '@mui/icons-material/Email';

const formValidation = yup.object({
    email : yup
    .string()
    .required('enter a userName name (email)'),
    password:yup
    .string()
    .min(8,"your password must be at least 8 characters")
    .max(14, "your password must be at less then 14 characters")
    .required('enter a password'),
   
    
    })

function Signin() {

    const navigate = useNavigate()
    const [showpassword,setShowpassword] = useState(false)

    const {handleSubmit,values,handleBlur,handleChange,touched,errors}=useFormik({
      initialValues : {
          email: '',
          password : '',
         
          
          
      },
      validationSchema : formValidation,
  
      onSubmit : (value)=>{
 adminData(value)
          
      }
  })

  const adminData = (data)=>{
    fetch(`${API}/user/signin`,{
      method :'POST',
      body:JSON.stringify(data),
      headers:{"Content-Type":"application/json"}

    })
    .then((value)=>value.ok ?navigate(`/user/${data.email}/home`) :alert('invalid'))
  }
    
  return (
    <div className='inputbox'>
        

<form onSubmit={handleSubmit}>
<Box
component="form"
sx={{
'& .MuiTextField-root': { m: 1,  },
}}
noValidate
autoComplete="off"
className="inputfeild"
>


<div>
<TextField
 name='email'
 value={values.email}
 onChange={handleChange}
 onBlur={handleBlur}
   error = {touched.email && errors.email}
 
  label = 'Email'
  helperText={touched.email && errors.email ? errors.email : null}

  InputProps={{
    endAdornment: (
      <InputAdornment position="start">
       {<EmailIcon />}
      </InputAdornment>
     )
    }}
/>
</div>
<div>
<TextField
name='password'
value={values.password}
onChange={handleChange}
onBlur={handleBlur}
  error = {touched.password && errors.password}
 
  label ='Password'
  type = {showpassword ?"text":"password"}
  helperText={touched.password && errors.password ? errors.password : null}

  InputProps={{
    endAdornment: (
      <InputAdornment position="start">
       {showpassword ? <VisibilityIcon sx={{cursor:"pointer"}} onClick={()=>setShowpassword(false)}/> : < VisibilityOffIcon sx={{cursor:"pointer"}}  onClick={()=>setShowpassword("true")} />}
      </InputAdornment>
    )
}}

/>
</div>  

</Box>

<div>
<button type="submit" className="button">Login</button>
</div>



</form>



<div className='signupButton'>

      <p  variant="text" style={{"margin":"auto","marginTop":"8px"}}>Don't have an account? <span className='haveAndDontHave' onClick={()=>navigate('/signup')}>Signup</span></p>

</div>

<div>
  <span className='forgotPassword' onClick={()=>navigate("/forgotPassword")}>Forgotten password?</span>
 
</div>

    </div>
  )
}

export default Signin