import { Badge,Avatar, Alert, Snackbar } from '@mui/material'
import * as React from 'react'
import {colors,styles} from '../styles/index'
import {Routes,Link,HashRouter as Router,Route,useMatch,useNavigate} from 'react-router-dom'
import DashBoardTab from './DashboardComponent/Dashboard';
import UserScreen from './DashboardComponent/UserTabs/UsersScreen';
import MemberShip from './DashboardComponent/Dashboard/MembershipScreen';
import TeamScreen from './DashboardComponent/TeamTabs/TeamScreen';
import SettingScreen from './DashboardComponent/SettingsTab/SettingScreen';
import NotificationsScreen from './DashboardComponent/NotificationTab/NotificationsScreen'
import { checkInputs, checkSigned, checkSignedFromReducer, cleanBatch, validateInput } from '../functions/checkSigned'
import { connect } from 'react-redux';
import { addBatchSecurityQuestion, addBatchSexType,loadAllUsers,deleteDoseMessage,editDoseMessage,addDoseMessage,promoteUser,dispatchSigned,createAdmin,logout, addSecurityQuestions,generateCodes,editSecurityQuestion, addSexType, setDataReducer, editSexType,setModalReducer,deleteSexType,deleteSecurityQuestion, deleteInvitationCode } from '../action';
import { CircularProgress } from '@mui/material';
import { Box, Button, InputAdornment, Modal, Tab, Tabs, TextField,IconButton,Typography,Select,MenuItem,Menu} from '@material-ui/core';
import DeleteScreen from '../components/deletecomponent'
import {DesktopDatePicker} from '@mui/lab';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import { AccessAlarm, PeopleOutlined,PersonOutlined,MailOutlined,FavoriteBorderOutlined,GppGoodOutlined,SentimentSatisfiedOutlined,ChatOutlined } from '@mui/icons-material';
import GenerateCodes from './DashboardComponent/SettingsTab/GenerateCodes'
import SecurityQuestionScreen from './DashboardComponent/SettingsTab/SecurityQuestions'
import SexTypeScreen from './DashboardComponent/SettingsTab/SexTypeTab'
import AdminScreen from './DashboardComponent/Admins/AdminScreen'
import MessageScreen from './DashboardComponent/messages/index'
import moment from 'moment'
import EncounterScreen from './DashboardComponent/UserTabs/EncounterTab'
import Autocomplete from '@mui/material/Autocomplete';
import DoseMessageScreen from './DashboardComponent/SettingsTab/DoseMessageTab'



const DashboardScreen=(params)=>{ 
    const [path,setPath]=React.useState(null) 
    const [showAlert,setShowAlert]=React.useState(false);
    const [active,setActive]=React.useState(1);
    const [tabvalue,setTabValue]=React.useState(1)
    const [modal,setModal]=React.useState(false)
    const [modalScreen,setModalScreen]=React.useState(4)
    const [sexType,setSexType]=React.useState(null)
    const [securityQuestionValue,setSecurityQuestionValue]=React.useState(null)
    const [batch,setBatch]=React.useState([]);
    const [count,setCount]=React.useState(1);
    const [changed,setChanged]=React.useState(null)
    const [id,setId]=React.useState(null);
    const [codeNumber,setCodeNumber]=React.useState(null)
    const [name,setFirstName]=React.useState("")
    const [secondName,setSecondName]=React.useState("")
    const [password,setPassword]=React.useState("")
    const [confirmPassword,setConfirmPassword]=React.useState("")
    const [email,setEmail]=React.useState("")
    const [isActive,setIsActive]=React.useState(true)
    const [expDate,setExpDate]=React.useState(null)
    const [userDatas,setUserDatas]=React.useState(null)
    const [selected,setSelected]=React.useState(null)
    const [alertMessage,setAlertMessage]=React.useState(null)
      let history = useNavigate();
      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };

    React.useEffect(()=>{
        setCount(0)
        params.dispatchers()
        history("user")
        // console.log(useMatch)
    },[])
    React.useEffect(()=>{
        console.log("fault",selected)
        // console.log(useMatch)
    },[selected])
    React.useEffect(()=>{
        if(checkSigned() || checkSignedFromReducer(params.udata)){
            // window.location.href="/home"

        }else{
            // window.location.href="/"
            history("/")
        }
    },[])
    React.useEffect(()=>{
        setTimeout(()=>{
            if(params.success || params.error){
                if(params.success ){
                    if(params.success.message){setShowAlert(true);setAlertMessage({type:1,message:params.success.message})}
                }else{
                    if(params.error.length>0){
                        setShowAlert(true);
                        setAlertMessage({type:2,message:params.error})
                    }else{
                        setShowAlert(false)
                    }
                }
            }
            setTimeout(()=>setShowAlert(false),3000);
        },500)
      
    },[params.success,params.error])
   
    React.useEffect(()=>{  
        if(params.screen===1){
            setModalScreen(1)
        }else if(params.screen===2){
            setModalScreen(2)
        }else if(params.screen===3){
            setModalScreen(3)
        }else if(params.screen===4){
            setModalScreen(4)
        }else if(params.screen===5){
            setModalScreen(5)
        }else if(params.screen===6){
            setModalScreen(6)
        }else if(params.screen===7){
            setModalScreen(7)
        }else if(params.screen===8){
            setModalScreen(8)
        }else if(params.screen===9){
            setModalScreen(9)
        }else if(params.screen===10){
            setModalScreen(10)
        }else if(params.screen===11){
            setModalScreen(11)
        }else{
            setModalScreen(2);
        }

    },[params.screen])
    React.useEffect(()=>{
        if(params.someValue){
            setId(params.someValue.id)
            if(params.someValue.status !==null){
                setIsActive(params.someValue.status)
            }
        }
    },[params.someValue])
    React.useEffect(()=>{
        if(params.success){
            setId(null);
            setBatch(cleanBatch(batch));
            if(params.success.type==="AddSECURITYQUESTIONS"){
                setModal(false);
                setChanged(null)
                params.changeModalState(false,1,1,null)
            }else if(params.success.type==="ADDSEXTYPE"){
                setSexType(" ")
                setChanged(null)
                params.changeModalState(false,1,1,null)
            }else if(params.success.type==="DELETESEXTYPE"){
                params.changeModalState(false,1,1,null)
            }else if(params.success.type==="DELETESECURITYQUESTION"){
                params.changeModalState(false,1,1,null)
            }else if(params.success.type==="EDITEDSEXTYPE"){
                setChanged(null)
                params.changeModalState(false,1,1,null)
            }else if(params.success.type==="EDITSECURITYQUESTION" || params.success.type==="DELETECODE" ||  params.success.type==="PROMOTEUSER" ||  params.success.type==="DELETEDOSE" || params.success.type==="ADDDOSEMESSAGE" || params.success.type==="CREATEADMIN" || params.success.type==="INVITATIONREQUEST"){
                setChanged(null)
                params.changeModalState(false,1,1,null)
            }else if(params.success.type==="ALLUSERS"){
               PutUsers(params.data);
            }
        }
    },[params.success])
   const PutUsers=(data)=>{
       let arr=[]
       let obj=null
       for(var i=0;i<data.length;i++){
             obj={
                label:data[i].firstName+" "+data[i].lastName+" - "+data[i].email,id:data[i].userId
                
            }
            arr.push(obj)
       }
       setUserDatas(arr)
   }
    React.useEffect(()=>{
        console.log("modalstate",modal)
        params.changeModalState(modal,1,1,null)
    },[modal])
    React.useEffect(()=>{
        
        let arr=batch;

        arr.push({value:null,es:null,isActive:null})
        setBatch(arr)
    },[count])
    React.useEffect(()=>{
        if(batch.length<=0){
            setCount(1)
        }
        console.log("batch",batch)
    },[batch])
    React.useEffect(()=>{
        setCount(1)
    },[])
    function ValidateEmail(inputText)
    {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.match(mailformat))
    {
    return true;
    }
    else
    {
    params.setMessage("You have entered an invalid email address!");
    return false;
    }
    }
    React.useEffect(()=>{
        if(!params.modalVisible){
            setCodeNumber(null)
            setExpDate(null);
            setFirstName(null);
            setSecondName(null);
            setPassword(null);
            setConfirmPassword(null);
            setEmail(null)
        }
    },[params.modalVisible])
    return <div>
     <Snackbar  anchorOrigin={{ vertical: 'top',horizontal: 'right'}} open={showAlert}  autoHideDuration={6000}>
        
         {
             <Alert color={alertMessage?alertMessage.type===1?'success':'error':'success'}>{alertMessage?alertMessage.message:null}</Alert>
         }  
       </Snackbar>
      
        <div className='f-flex'>
        <div className='w-20  b-s b-g' style={{position:'fixed',left:0,height:'100%',color:'white',zIndex:2 }}>
        <Typography variant="h5" component="div" className="padding" style={{alignSelf:'center',color:'white',textAlign:'center'}}>
           <b>Ripe Wipe</b>
           </Typography>
            <Link to={'user'} onClick={()=>setActive(1)} >
                        <div className=" f-flex" style={active===1?styles.navbarSelected:styles.navbarUnSelected}>
              <PersonOutlined className="padding"/>
               <Typography variant='p' color={'primary'} style={active===1?styles.navbarUnText:styles.navbarText}>
                    Users
                </Typography>
            </div>
            </Link>
            <Link to={'admins'} onClick={()=>setActive(2)} >
                        <div className=" f-flex" style={active===2?styles.navbarSelected:styles.navbarUnSelected} >
                       <PeopleOutlined className="padding"/>
                              <Typography variant='p' color={'primary'} style={active===2?styles.navbarUnText:styles.navbarText}>
                    Admins
                </Typography>
            </div>
            </Link>
            <Link to={'invitations'} onClick={()=>setActive(3)} >
                        <div className=" f-flex" style={active===3?styles.navbarSelected:styles.navbarUnSelected} >
                        <MailOutlined className="padding"/>
                <Typography variant='p' color={'primary'} style={active===3?styles.navbarUnText:styles.navbarText}>
                    Invitations
                </Typography>
            </div>
            </Link>
            <Link to={'encounters'} onClick={()=>setActive(4)} >
                        <div className=" f-flex" style={active===4?styles.navbarSelected:styles.navbarUnSelected} >
              <FavoriteBorderOutlined className="padding"/>
                <Typography variant='p' color={'primary'} style={active===4?styles.navbarUnText:styles.navbarText}>
                    Encounters
                </Typography>
            </div>
            </Link>
            <Link to={'SecurityQuestion'} onClick={()=>setActive(5)} >
                        <div className=" f-flex" style={active===5?styles.navbarSelected:styles.navbarUnSelected} >
             <GppGoodOutlined className="padding"/>
                <Typography variant='p' color={'primary'} style={active===5?styles.navbarUnText:styles.navbarText}>
                    Security questions
                </Typography>
            </div>
            </Link>
            <Link to={'Sextype'} onClick={()=>setActive(6)} >
                        <div className=" f-flex" style={active===6?styles.navbarSelected:styles.navbarUnSelected} >
               <SentimentSatisfiedOutlined className="padding"/>
                <Typography variant='p' color={'primary'} style={active===6?styles.navbarUnText:styles.navbarText}>
                    Sex types
                </Typography>
            </div>
            </Link>
            <Link to={'dosemessages'} onClick={()=>setActive(7)} >
                        <div className={` f-flex`} style={active===7?styles.navbarSelected:styles.navbarUnSelected} >
                <ChatOutlined className="padding"/>
                <Typography variant='p' color={'primary'} style={active===7?styles.navbarUnText:styles.navbarText}>
                    Dose messages
                </Typography>
            </div>
            </Link>
            <Link to={'messages'} onClick={()=>setActive(8)} >
                        <div className={` f-flex`} style={active===8?styles.navbarSelected:styles.navbarUnSelected} >
                <ChatOutlined className="padding"/>
                <Typography variant='p' color={'primary'} style={active===8?styles.navbarUnText:styles.navbarText}>
                    Messages
                </Typography>
            </div>
            </Link>
           
        </div>
        <div className='w-f eee' style={{backgroundColor:'white'}}>
        <div style={{height:40,backgroundColor:'white',justifyContent:'space-between',zIndex:1}} className='f-flex padding w-f'>
           <Typography variant="h5" component="div" style={{alignSelf:'center',color:colors.primary10}}>
          
           </Typography>
           
            <div className='f-flex w-15' style={{alignContent:'center',alignSelf:'center'}}>
           
            <div className="padding f-flex w-f">
            <Avatar>{params.dataa?params.dataa.firstName?params.dataa.firstName.charAt(0).toUpperCase():null+params.dataa?params.dataa.lastName?params.dataa.lastName.charAt(0).toUpperCase():null:null:null}</Avatar>
            <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
{params.dataa?params.dataa.firstName+" "+params.dataa.lastName:null}      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} >Profile</MenuItem>
        <MenuItem onClick={handleClose} onClick={()=>{
            params.logout(); history("/")
        }}>Logout</MenuItem>
      </Menu>
           
            </div>
            
                
            </div>
        </div>
        <br/>
        <div className="padding" style={{paddingLeft:'21%'}}>
        <div className="padding white">
            <Routes>
                <Route path={`dashboard`} element={<DashBoardTab/>}/>
                <Route path={`user`} element={<UserScreen/>}/>
                <Route path={'membership'} element={<MemberShip/>}/>
                <Route path={'team'} element={<TeamScreen/>}/>
                <Route path={'settings'} element={<SettingScreen/>}/>
                <Route path={'notifications'} element={<NotificationsScreen/>}/>
                <Route path={'invitations'} element={<GenerateCodes/>}/>
                <Route path={'SecurityQuestion'} element={<SecurityQuestionScreen/>}/>
                <Route path={'Sextype'} element={<SexTypeScreen/>}/>
                <Route path={'admins'} element={<AdminScreen/>}/> 
                <Route path={'messages'} element={<MessageScreen/>}/>
                <Route path={'encounters'} element={<EncounterScreen/>}/>
                <Route path={'dosemessages'} element={<DoseMessageScreen/>}/>
                
            </Routes>
            </div>
            </div>
            </div>
        </div>
        <Modal open={params.modalVisible} style={{overflow:'scroll',height:'100%'}}>
            <center>
            {
                modalScreen===1? params.screen===1?  <div className="w-30 white padding left-r" style={{marginTop:'10%'}}>
               <p className="left-r w-90" style={{fontSize:15,color:'black'}}><b>{params.progress===1?"Add":"Edit"} sex type</b></p>
               <br/>
               {
                       batch.map((dat,i)=>{
                           let val=params.progress===2?batch[i].value != null?batch[i].value:params.someValue.value:batch[i].value;
                           let val2=params.progress===2?batch[i].es != null?batch[i].es:params.someValue.es:batch[i].es;
                           console.log("valueee",val)
                           {/* setChanged(val) */}
                           return ( <div><TextField label="Name(en)" className="w-f" variant="outlined" value={!changed?val:null} onChange={(e)=>{let xx=batch;xx[i].value=e.target.value;setBatch(xx);setChanged(e.target.value);console.log("batch"+batch[i].value!=null,JSON.stringify(batch)+params.progress)}}/>
                                 <br/><br/>
                                 <TextField label="Name(es)" className="w-f" variant="outlined" value={!changed?val2:null} onChange={(e)=>{let xx=batch;xx[i].es=e.target.value;setBatch(xx);setChanged(e.target.value);console.log("batch"+batch[i].es!=null,JSON.stringify(batch)+params.progress)}}/>
                                 <br/><br/>
                                 <Select 
                value={isActive}
                label="status"
                id="seleted"
                variant='outlined'
                className="w-f"
                onChange={(e)=>setIsActive(e.target.value)}
  >
        <MenuItem value={true}>Active</MenuItem>
        <MenuItem value={false}>InActive</MenuItem>
  </Select>
  <br/><br/>
                                 </div>)
                       })
                   }
                  
                  {/* {
                      params.progress===1?
                     
                      <Button onClick={()=>{
                          let cc=count+1;
                          setCount(cc);
                          }}>Add more</Button>:null
                  } */}
               {/* <TextField variant="outlined" label="Sex type name" className="w-f margin-input" value={sexType} onChange={(e)=>setSexType(e.target.value)}/> */}
               <br/><br/>
               <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <Button variant={'text'} className="mrit" onClick={() => params.changeModalState(false,1,1,null)}  style={{marginRight:'5%', padding: '0% 10%',color:colors.primary10 }}>Cancel</Button>
                    <button variant={'contained'} onClick={()=>  
                        batch.length >0?params.progress===1?params.addBatchSexType(batch):params.someValue.value===securityQuestionValue?params.setMessage("No changes made"):params.editSexType(batch[0].value,batch[0].es,isActive,params.someValue?params.someValue.id:null):params.setMessage("add sex type to continue")
                    
                    } disableElevation style={{ backgroundColor: colors.primary10,color:'white', padding: '3% 10%' }}>{
                       params.isLoading?<CircularProgress size={15} sx={{color:'white'}}/>:params.progress===1?"ADD":"SAVE"
                    }</button>
                </div>
           </div>:<DeleteScreen isLoading={params.isLoading} cancel={()=>params.changeModalState(false,1,1,null)} actions={()=>{
               
               params.deleteSecurityQuestion(id)}} desc={"Are you sure you want to delete this security question?"}/>
        :modalScreen===6? 
           <DeleteScreen isLoading={params.isLoading} cancel={()=>params.changeModalState(false,1,1,null)} actions={()=>params.deleteSexType(params.someValue?params.someValue.id:null)} desc={"Are you sure you want to delete this sex type?"}/>:
           modalScreen===3?
           <div className="w-30 white padding" style={{marginTop:'10%'}}>
               
               <div className="w-90 left-r">
             
                   <p style={{fontSize:15,color:'black'}}><b>Add Dose Message</b></p>
                   <br/><br/>
                   <TextField label="Dose type" className="w-f" variant="outlined"/>
                   <br/><br/>
                   <TextField label="Message" className="w-f" multiline={true} variant="outlined"/>
                   <br/><br/>
                   <Button>Add more</Button>
                   <br/><br/>
               <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <Button variant={'outlined'} className="mrit" onClick={() => setModal(false)} style={{marginRight:'5%'}}>Cancel</Button>
                    <Button variant={'contained'} disableElevation style={{ padding: '0 15%' }} style={{ backgroundColor: colors.primary10,color:'white' }}>Done</Button>
                </div>
               </div>

               <br/>
              
           </div>:modalScreen===4?
           <div className="w-30 white padding" style={{marginTop:'10%'}}>
               
               <div className="w-90 left-r">
             
                   <p style={{fontSize:15,color:'black'}}><b>{params.progress===1?"Add":"Edit"} Security Question</b></p>
                   <br/><br/>
                   {
                       batch.map((dat,i)=>{
                        let val=params.progress===2?batch[i].value != null?batch[i].value:params.someValue.value:batch[i].value;
                        let val2=params.progress===2?batch[i].es != null?batch[i].es:params.someValue.es:batch[i].es;
                           
                           console.log("valueee",val)
                           {/* setChanged(val) */}
                           return ( <div><TextField label="Description(en)" className="w-f" variant="outlined" value={!changed?val:null} onChange={(e)=>{let xx=batch;xx[i].value=e.target.value;setBatch(xx);setChanged(e.target.value);console.log("batch"+batch[i].value!=null,JSON.stringify(batch)+params.progress)}}/>
                                 <br/><br/>
                                 <TextField label="Description(es)" className="w-f" variant="outlined" value={!changed?val2:null} onChange={(e)=>{let xx=batch;xx[i].es=e.target.value;setBatch(xx);setChanged(e.target.value);console.log("batch"+batch[i].es!=null,JSON.stringify(batch)+params.progress)}}/>
                                 <br/><br/>
                                 <Select 
                value={isActive}
                label="status"
                variant='outlined'
                className="w-f"
                id="securityquestion"
                onChange={(e)=>setIsActive(e.target.value)}>
        <MenuItem value={true}>Active</MenuItem>
        <MenuItem value={false}>InActive</MenuItem>
  </Select>
                <br/><br/>
                                 </div>)
                           {/* return ( <div><TextField label="Security Question" className="w-f" variant="outlined" value={batch.length>0?batch[i].value:securityQuestionValue} onChange={(e)=>{batch.length>0?batch[i].value=e.target.value:setSecurityQuestionValue(e.target.value)}}/>
                                 <br/><br/></div>) */}
                       })
                   }
                  
                  {/* {
                      params.progress===1?<Button onClick={()=>{
                          let cc=count+1;
                          setCount(cc);
                          }}>Add more</Button>:null
                  } */}
                   
                   <br/><br/>
               <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <button onClick={()=>
        params.changeModalState(false,1,1,null)} className="mrit border"  style={{marginRight:'5%', padding: '0% 10%',color:colors.primary10 }}>Cancel</button>
                    <button style={{ backgroundColor: colors.primary10,color:'white', padding: '3% 10%' }} onClick={() => {
                        batch.length >0?params.progress===1?params.addBatchSecurityQuestion(batch):params.someValue.value===securityQuestionValue?params.setMessage("No changes made"):params.editSecurityQuestion(batch[0].value,batch[0].es,isActive,params.someValue?params.someValue.id:null):params.setMessage("add security question to continue")
                    }}>
                        {params.isLoading?
                        <CircularProgress size={15} sx={{color:'white'}}/>:params.progress===1?"Done":"Save"}
                    </button>
                </div>
               </div>

               <br/>
              
           </div>:modalScreen===5?
           
           <center >
           <div className='padding white w-30' style={{marginTop:'10%'}}>
           <p className="padding">{params.progress===1?'Create':'Edit'} Invitation</p>
           <TextField type={params.someValue?"text":"number"} onChange={(e)=>setCodeNumber(e.target.value)} value={params.progress===2 && !codeNumber?setCodeNumber(params.someValue.value):codeNumber} label={params.someValue?"invitation code":"Number of codes"} variant={"outlined"} className="w-f"/>
        <br/><br/>
        <LocalizationProvider dateAdapter={DateAdapter} className="w-f">
              <DesktopDatePicker
          label="expiration date"
          inputFormat="MM/DD/YYYY"
          value={expDate?expDate.toString().length>0?expDate:null:params.progress===1?null:setExpDate(params.someValue.expDate)}
          className="w-f"
          variant={'outlined'}
          minDate={moment()}
          onChange={(e)=>setExpDate(e._d)}
          renderInput={(params) => <TextField {...params} className={'w-f'} variant={'outlined'} />}/>
</LocalizationProvider>
<br/><br/>
<div className="w-f f-flex" style={{justifyContent:'right',alignSelf:'right'}}>
    <Button onClick={()=>{
        params.changeModalState(false,1,1,null)
    }}>Cancel</Button>
    <button className="" style={{backgroundColor:colors.primary10,color:'white'}} onClick={()=>{
            if(codeNumber.trim().length>0){
                params.generateCode(codeNumber.trim(),expDate)
            }
        }}>
            {
                params.isLoading?<CircularProgress size={15} sx={{color:'white'}}/>:"Generate"
            }
        </button>
</div>
    
           </div>
        </center>
           :modalScreen===7?<div className="w-30 padding white" style={{marginTop:'5%'}}>
          <Typography variant="h5" className="padding"> Register Admin</Typography>
          <TextField label="First name" value={name} onChange={(e)=>setFirstName(e.target.value)} className="w-f" variant='outlined' required/>
          <br/><br/>
          <TextField label="Last name" value={secondName} onChange={(e)=>setSecondName(e.target.value)} className="w-f" variant='outlined'/>
          <br/><br/>
          <TextField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-f" variant='outlined'/>
          <br/><br/>
          <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="w-f" variant='outlined'/>
          <br/><br/>
          <TextField label="Email" className="w-f" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} variant='outlined'/>

          <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <Button variant={'text'} className="mrit" onClick={() => params.changeModalState(false,1,1,null)}  style={{marginRight:'5%', padding: '0% 10%',color:colors.primary10 }}>Cancel</Button>
                    <button variant={'contained'} onClick={
                        ()=>{if(name.trim().length>0 && secondName.trim().length>0 && (password.trim().length>=6) && (password.trim()===confirmPassword.trim()) && ValidateEmail(email) ){
                              console.log("viral")
                                if(password.trim()!=confirmPassword.trim()){
                                params.setMessage("Password and confirm password does not match")
                                }else{
                                    console.log("i got here")
                                    params.createAdmin(name,secondName,password,email)
                                }
                                }else{
                        params.setMessage("Fill all the information to continue")
                    }
                     }
                        }  style={{ backgroundColor: colors.primary10,color:'white', padding: '3% 10%' }}>{
                       params.isLoading?<CircularProgress size={15} sx={{color:'white'}}/>:params.progress===1?"ADD":"SAVE"
                    }</button>
                </div>


           </div>:modalScreen===8?
           <DeleteScreen isLoading={params.isLoading} cancel={()=>params.changeModalState(false,1,1,null)} actions={()=>params.deleteInvitation(params.someValue?params.someValue.id:1)} desc={"Are you sure you want to delete this invitation code?"}/>
:modalScreen===9?<div className="w-30 padding white" style={{marginTop:'5%'}}>
          <Typography variant="h5" className="padding">Promote user to admin</Typography>
         
          <Autocomplete
      disablePortal
      variant="outlined"
      id="combo-box-demo"
      value={selected?selected.label:null}
      onChange={(event, newValue) => {
        setSelected(newValue);
        }}
      options={userDatas?userDatas:[]}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search user" variant="outlined" />}
    />
          <br/><br/>
        
          <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <Button variant={'text'} className="mrit" onClick={() => params.changeModalState(false,1,1,null)}  style={{marginRight:'5%', padding: '0% 10%',color:colors.primary10 }}>Cancel</Button>
                    <button variant={'contained'} onClick={
                        ()=>{if(selected!==null){
                            params.promoteUser(selected?selected.id:null);
                        }else{
                            params.setMessage("Select a user to promote to admin")
                        }}
                        }  style={{ backgroundColor: colors.primary10,color:'white', padding: '3% 10%' }}>{
                       params.isLoading?<CircularProgress size={15} sx={{color:'white'}}/>:params.progress===1?"Make Admin":"SAVE"
                    }</button>
                </div>


           </div>:modalScreen===10?
           <div className="w-30 white padding" style={{marginTop:'10%'}}>
               
               <div className="w-90 left-r">
             
                   <p style={{fontSize:15,color:'black'}}><b>{params.progress===1?"Add":"Edit"} Dose Message</b></p>
                   <br/><br/>
                   {
                       batch.map((dat,i)=>{
                        let val=params.progress===2?batch[i].value != null?batch[i].value:params.someValue.value:batch[i].value;
                        let val2=params.progress===2?batch[i].es != null?batch[i].es:params.someValue.es:batch[i].es;
                           
                           console.log("valueee",val)
                           {/* setChanged(val) */}
                           return ( <div><TextField label="Description(en)" className="w-f" variant="outlined" value={!changed?val:null} onChange={(e)=>{let xx=batch;xx[i].value=e.target.value;setBatch(xx);setChanged(e.target.value);console.log("batch"+batch[i].value!=null,JSON.stringify(batch)+params.progress)}}/>
                                 <br/><br/>
                                 <TextField label="Description(es)" className="w-f" variant="outlined" value={!changed?val2:null} onChange={(e)=>{let xx=batch;xx[i].es=e.target.value;setBatch(xx);setChanged(e.target.value);console.log("batch"+batch[i].es!=null,JSON.stringify(batch)+params.progress)}}/>
                                 <br/><br/>
                                 <Select 
                value={isActive}
                label="status"
                variant='outlined'
                className="w-f"
                id="dosemessage"
                onChange={(e)=>setIsActive(e.target.value)}>
        <MenuItem value={true}>Active</MenuItem>
        <MenuItem value={false}>InActive</MenuItem>
  </Select>
                <br/><br/>
                                 </div>)
                          
                       })
                   }
                  
                   
                   <br/><br/>
               <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <button onClick={()=>
        params.changeModalState(false,1,1,null)} className="mrit border"  style={{marginRight:'5%', padding: '0% 10%',color:colors.primary10 }}>Cancel</button>
                    <button style={{ backgroundColor: colors.primary10,color:'white', padding: '3% 10%' }} onClick={() => {console.log("ego",{
                       a: batch[0].value,b:batch[0].es,c:isActive,d:params.someValue?params.someValue.id:null
                    })
                        batch.length >0?params.progress===1?params.addDoseMessage(batch,isActive):params.someValue.value===securityQuestionValue?params.setMessage("No changes made"):params.editDoseMessage(batch[0].value,batch[0].es,isActive,params.someValue?params.someValue.id:null):params.setMessage("add dose message to continue")
                    }}>
                        {params.isLoading?
                        <CircularProgress size={15} sx={{color:'white'}}/>:params.progress===1?"Done":"Save"}
                    </button>
                </div>
               </div>

               <br/>
              
           </div>:modalScreen===11?
           <DeleteScreen isLoading={params.isLoading} cancel={()=>params.changeModalState(false,1,1,null)} actions={()=>params.deleteDoseMessage(id)} desc={"Are you sure you want to delete this dose message?"}/>
:
           <DeleteScreen isLoading={params.isLoading} cancel={()=>params.changeModalState(false,1,1,null)} actions={()=>params.deleteSecurityQuestion(id)} desc={"Are you sure you want to delete this security question?"}/>

          
           

            }
         
           </center>
           </Modal>
       
    </div>

}
const mapStateToProps=(state)=>{
    return {
        isLoading:state.sendDataReducer.isLoading,
        success:state.sendDataReducer.success,
        error:state.sendDataReducer.error,
        data:state.sendDataReducer.data,
        modalVisible:state.ModalReducer.visible,
        screen:state.ModalReducer.screen,
        progress:state.ModalReducer.progress,
        someValue:state.ModalReducer.someValue,
        dataa:state.userInformationReducer.data
    }
}
const mapDispatchTopProps=(dispatch)=>{
    return {
        addSecurityQuestion:(en)=>dispatch(addSecurityQuestions(en)),
        setMessage:(message)=>dispatch(setDataReducer(false,message,null,null)),
        addSexType:(en)=>dispatch(addSexType(en)),
        changeModalState:(visible,screen,progress,someValue)=>dispatch(setModalReducer(visible,screen,progress,someValue)),
        addBatchSecurityQuestion:(batch)=>validateInput(batch)?dispatch(addBatchSecurityQuestion(batch)):dispatch(setDataReducer(false,"Add value in order to continue",null,null)),
        addBatchSexType:(batch)=>{validateInput(batch)?dispatch(addBatchSexType(batch)):dispatch(setDataReducer(false,"Add value in order to continue",null,null))},
        deleteSexType:(id)=>dispatch(deleteSexType(id)),
        deleteSecurityQuestion:(id)=>dispatch(deleteSecurityQuestion(id)),
        editSexType:(value,es,status,id)=>checkInputs(value,es,status,id)?dispatch(editSexType(value,es,status,id)):dispatch(setDataReducer(false,"Add value in order to continue",null,null)),
        editSecurityQuestion:(value,es,status,id)=>checkInputs(value,es,status,id)?dispatch(editSecurityQuestion(value,es,status,id)):dispatch(setDataReducer(false,"Add value in order to continue",null,null)),
        createAdmin:(firstname,lastname,email,password)=>checkInputs(firstname,lastname,email,password)?dispatch(createAdmin(firstname,lastname,email,password)):dispatch(setDataReducer(false,"Add value in order to continue",null,null)),
        generateCode:(numer,date)=>checkInputs(numer)?dispatch(generateCodes(numer,date)):dispatch(setDataReducer(false,"Add value in order to continue",null,null)),
        deleteInvitation:(id)=>dispatch(deleteInvitationCode(id)),
        logout:()=>dispatch(logout()),
        dispatchers:()=>dispatch(dispatchSigned()),
        loaduser:()=>dispatch(loadAllUsers()),
        promoteUser:(id)=>dispatch(promoteUser(id)),
        deleteDoseMessage:(id)=>dispatch(deleteDoseMessage(id)),
        editDoseMessage:(value,es,status,id)=>checkInputs(value,es,status,id)?dispatch(editDoseMessage(value,es,status,id)):dispatch(setDataReducer(false,"Add value in order to continue",null,null)),
        addDoseMessage:(batch,status)=>validateInput(batch)?dispatch(addDoseMessage(batch,status)):dispatch(setDataReducer(false,"Add value in order to continue",null,null))
    }
}
export default connect(mapStateToProps,mapDispatchTopProps)(DashboardScreen)


