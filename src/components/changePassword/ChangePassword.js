import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { API } from '../../global/connect';
import "./changepassword.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { InputAdornment } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const formValidation = yup.object({
    password:yup
    .string()
    .min(8,"your password must be at least 8 characters")
    .max(14, "your password must be at less then 14 characters")
    .required('create a password'),
   
    
    })

function ChangePassword() {

    const {email} = useParams()
    const navigate = useNavigate()
    const [confirmPassword,setconFirmPassword] = useState('')
    const [showpassword,setShowpassword] = useState(false)


    const {handleSubmit,values,handleBlur,handleChange,touched,errors}=useFormik({
      initialValues : {
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
    fetch(`${API}/user/changeforgottenpassword/${email}`,{
      method :'PUT',
      body:JSON.stringify(data),
      headers:{"Content-Type":"application/json"}
    })
    .then((value)=>value.ok ? navigate('/signin'):alert('Server side error '))
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
       {showpassword ? <VisibilityIcon sx={{cursor:"pointer"}}  onClick={()=>setShowpassword(false)}/> : < VisibilityOffIcon sx={{cursor:"pointer"}}  onClick={()=>setShowpassword("true")} />}
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
       {<CheckIcon/> }
      </InputAdornment>
     )
    }}

/> 

</div> 


</Box>

<div>
<button type="submit" className="button">Change</button>
</div>

</form>
</div>

    </div>
  )
}

export default ChangePassword