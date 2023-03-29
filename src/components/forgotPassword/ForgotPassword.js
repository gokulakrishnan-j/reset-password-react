import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as yup from 'yup'
import { useFormik } from 'formik';
import { API } from '../../global/connect';
import './forgotPassword.css'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { InputAdornment } from '@mui/material';

const formValidation = yup.object({
    email : yup
    .string()
    .email("Enter valid email")
    .required('enter a admin name'),
   
    
    })

function ForgotPassword() {

    const navigate = useNavigate()
    const {handleSubmit,values,handleBlur,handleChange,touched,errors}=useFormik({
        initialValues : {
            email:''
            
            
        },
        validationSchema : formValidation,
    
        onSubmit : (value)=>{
           
  
            fetch(`${API}/user/forgottenpassword`,{
                method :'POST',
                body:JSON.stringify(value),
                headers:{"Content-Type":"application/json",}
      
              })
              .then((value)=>value.ok ?navigate(`/signin`) :alert('invalid email'))
                
            
        }
    })

  return (
    <div className='inputbox'>
<div className="input">
<Button  onClick={()=>navigate(-1)}>back</Button>
        
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
       {<EmailIcon/> }
      </InputAdornment>
     )
    }}

/>
</div>


</Box>
<div>
<button type="submit" className="button">Send</button>
</div>
</form>
</div>
    </div>
  )
}

export default ForgotPassword