import { Alert, Checkbox, CircularProgress, TextField } from '@mui/material'
import * as React from 'react'
import { Link,useNavigate  } from 'react-router-dom'

import { signIn,resetPassword, setDataReducer } from '../action'
import {colors} from '../styles/index'
import {connect} from 'react-redux'
import { Snackbar } from '@material-ui/core'
import CheckSigned from './CheckSigned'
import { checkSigned, checkSignedFromReducer } from '../functions/checkSigned'

const SignInScreen=(params)=>{  
    const [username,setUsername]=React.useState(null)
    const [password,setPassword]=React.useState(null)
    const [rememberMe,setRememberMe]=React.useState(true)
    const [showAlert,setShowAlert]=React.useState(false);
    const [screen,setScreen]=React.useState(2);
      let history = useNavigate();

    
    React.useEffect(()=>{
            if(params.usuccess){
                if(params.usuccess.type==="SIGNIN"){
                    // window.location.href="home"
                    history("home/user")
                }else if(params.usuccess.type==="RESETPASSWORD"){
                    setScreen(2)
                }
            }
    },[params.usuccess])
    React.useEffect(()=>{
        if(checkSigned() || checkSignedFromReducer(params.udata)){
            // window.location.href="home"
           // History.push("home")
           
                    history("home")
        }else{
          //  window.location.href="/"
        }
    },[])
   
    React.useEffect(()=>{
        console.log("success1",params.usuccess)
        console.log("success1",params.uerror)
        if(params.usuccess || params.uerror){
            setShowAlert(true);
        }else{
            setShowAlert(false);
        }
        setTimeout(()=>setShowAlert(false),3000);
    },[params.usuccess,params.uerror])
    React.useEffect(()=>{
        console.log("success",params.success)
        console.log("success",params.error)
        if(params.success || params.error){
            setShowAlert(true);
        }else{
            setShowAlert(false);
        }
        setTimeout(()=>setShowAlert(false),30000);
    },[params.success,params.error])
    
    return <div className="" style={{marginTop:'10%'}}>
       <center>
       {
           screen===2? <img src={`${process.env.PUBLIC_URL}/Logo-large.svg`} height={40} className="padding"/>:
           <h1 className='padding'><b>Forgot Password?</b></h1>
       }
      
       <div className='white w-f padding w-30 padding b-s'>
       <Snackbar  anchorOrigin={{ vertical: 'top',horizontal: 'right'}} open={showAlert}  autoHideDuration={6000}>
         {(params.usuccess || params.success)? <Alert>{params.usuccess?params.usuccess.message:params.success.message}</Alert>:
           <Alert severity='error'>{params.uerror?params.uerror:params.error?params.error:null}</Alert>
        
         }  
       </Snackbar>
       <div className="w-f radius">
            
            <center>
            {
                screen===1? <div className='w-f' style={{textAlign:'left'}}>
{/*             
            <p className=' t-l'>Email</p>
            <input type={'text'} placeholder='email' className='w-f'/> */}
            <br/><br/>
            <p style={{color:'gray',fontSize:15}} className="">Enter your email address and we’ll send you a link to reset your password.

</p>
            <TextField label="email" type="email"  onErrorCapture={()=>{
                console.log("your email is invalid") 
            }} value={username} onChange={(e)=>setUsername(e.target.value)} variant="outlined" className="w-f border m-top"/>
            <br/><br/>
           
           <button style={{borderRadius:5,backgroundColor:colors.primary10,padding:15,marginTop:'5%'}} className='w-f' onClick={()=>params.resetEmail(username)}>
               {
                   params.isLoading?<CircularProgress size={20} sx={{color:'white'}}/>:<p className='t-b t-w'>Send Password Reset Link</p>
               }
               
           </button>
           <center>
                <p style={{color:colors.primary10,cursor:'pointer'}} onClick={()=>setScreen(2)} className="padding">Sign in</p>
                </center>
           
          
            </div>:
            <div className='w-f' style={{textAlign:'left'}}>
{/*             
            <p className=' t-l'>Email</p>
            <input type={'text'} placeholder='email' className='w-f'/> */}
            <br/><br/>
            <TextField label="email" type="email" onErrorCapture={()=>{
                console.log("your email is invalid") 
            }} value={username} onChange={(e)=>setUsername(e.target.value)} variant="outlined" className="w-f border"/>
            <br/><br/>
            <TextField label="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} variant="outlined" className="w-f border"/>
            {/* <p className='mtop  t-l' style={{marginTop:'10%'}}>Password</p>
            <input type={'password'} placeholder='password' className='w-f'/> */}
           <div className='f-flex' style={{justifyContent:'space-between'}}>
               <div className='f-flex' style={{alignContent:'center'}}>
               <Checkbox checked={rememberMe} onChange={(change)=>setRememberMe(rememberMe?false:true)}/>
                   <p style={{alignSelf:'center',fontSize:12,color:'black'}}>Remember me</p>
               </div>
               <p style={{alignSelf:'center',fontSize:12,color:'#1890ff',cursor:'pointer'}} onClick={()=>setScreen(1)}>Forgot your password?</p>
           </div>
           
           <button style={{borderRadius:5,backgroundColor:colors.primary10,padding:15,marginTop:'5%'}} className='w-f' onClick={()=>{username.trim().length>0 && password.trim().length>0?params.signIn(username,password,rememberMe):params.setMessage("Please enter email and password to continue")}}>
               {
                   params.uisLoading?<CircularProgress size={20} sx={{color:'white'}}/>:<p className='t-b t-w'>Log in</p>
               }
               
           </button>
           
          
            </div>
            }
           
            </center>
</div>            
       </div>
          </center>
       
    </div>

}
const mapStateToProps=(state)=>{
    return {
        isLoading:state.sendDataReducer.isLoading,
        success:state.sendDataReducer.success,
        error:state.sendDataReducer.error,
        
        uisLoading:state.userInformationReducer.isLoading,
        usuccess:state.userInformationReducer.success,
        uerror:state.userInformationReducer.error,
        udata:state.userInformationReducer.data
    }
}
const mapDispatchTopProps=(dispatch)=>{
    return {

        signIn:(username,password,rememberme)=>dispatch(signIn(username,password,rememberme)),
        resetEmail:(email)=>dispatch(resetPassword(email)),
        
        setMessage:(message)=>dispatch(setDataReducer(false,message,null,null)),
    }
}
export default connect (mapStateToProps,mapDispatchTopProps)(SignInScreen)