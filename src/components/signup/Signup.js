import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { API } from '../../global/connect';
import "./signup.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import CheckIcon from '@mui/icons-material/Check';


const formValidation = yup.object({
    username:yup
    .string()
    .required('Fill the username'),
    email:yup
    .string()
    .email('Enter valid email')
    .required('Fill the email'),
    password:yup
    .string()
    .min(8,"your password must be at least 8 characters")
    .max(14, "your password must be at less then 14 characters")
    .required('create a password'),
   
    
    })

function Signup() {

    const navigate = useNavigate()
    const [confirmPassword,setconFirmPassword] = useState('')
    const [showpassword,setShowpassword] = useState(false)


    const {handleSubmit,values,handleBlur,handleChange,touched,errors}=useFormik({
      initialValues : {
        username : '',
          email: '',
          password : '',
          
      },
      validationSchema : formValidation,
  
      onSubmit : (value)=>{
if(confirmPassword === value.password){
  usersignupData(value)
 }else{
  alert("Created password and confirm password not matching")
 }
      
      }
  })

  const usersignupData = (data)=>{
    fetch(`${API}/user/signup`,{
      method :'POST',
      body:JSON.stringify(data),
      headers:{"Content-Type":"application/json"}
    })
    .then((value)=>value.ok ? navigate('/signin'):alert('user name already exist'))
  }



  return (
    <div className="inputbox">
      <div className="input">

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
 name='username'
 value={values.username}
 onChange={handleChange}
 onBlur={handleBlur}
   error = {touched.username && errors.username}
  label = 'Name'
  helperText={touched.username && errors.username ? errors.username : null}

  InputProps={{
    endAdornment: (
      <InputAdornment position="start">
       {<AccountCircleIcon/> }
      </InputAdornment>
     )
    }}
/>
</div>
<div>
<TextField
name='email'
value={values.email}
onChange={handleChange}
onBlur={handleBlur}
  error = {touched.email && errors.email}

  label ='Email'
  helperText={touched.email && errors.email ? errors.email : null}

  InputProps={{
    endAdornment: (
      <InputAdornment position="start">
       { < EmailIcon  />}
      </InputAdornment>
     )
    }}
/>
</div>  

<div>
<TextField
name='password'
value={values.password }
onChange={handleChange}
onBlur={handleBlur}
  error = {touched.password && errors.password}
 
  label ='create password'
  type = {showpassword ?"text":"password"}
  helperText={touched.password && errors.password ? errors.password : null}

  InputProps={{
    endAdornment: (
      <InputAdornment position="start">
       {showpassword ? <VisibilityIcon sx={{"cursor":"pointer"}} onClick={()=>setShowpassword(false)}/> : < VisibilityOffIcon sx={{"cursor":"pointer"}} onClick={()=>setShowpassword("true")} />}
      </InputAdornment>
     )
    }}

/> 
</div>
<div>

<TextField
value= {confirmPassword}
onChange={(e)=>setconFirmPassword(e.target.value)}


  label ='confirm password'

  InputProps={{
    endAdornment: (
      <InputAdornment position="start">
       { < CheckIcon  />}
      </InputAdornment>
     )
    }}
/> 

</div> 



</Box>

<div>
<button type="submit" className="button">Create</button>
</div>

</form>

<div className='signupButton'>

      <p  variant="text" style={{"margin":"auto","marginTop":"8px"}}>Already have an account? <span className='haveAndDontHave' onClick={()=>navigate('/signin')}>Signin</span></p>

</div>
</div>
    </div>
  )
}

export default Signup