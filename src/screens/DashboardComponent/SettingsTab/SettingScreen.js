import { Box, Button, InputAdornment, Modal, Tab, Tabs, TextField,IconButton,Typography} from '@material-ui/core';
import { Cancel, CancelOutlined, Search } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import * as React from 'react'
import { connect } from 'react-redux';
import { addBatchSecurityQuestion, addBatchSexType,getAllDoseMessage, addSecurityQuestions,editSecurityQuestion, addSexType, setDataReducer, editSexType,setModalReducer,deleteSexType,deleteSecurityQuestion } from '../../../action';
import { colors } from '../../../styles';
import GenerateCodes from './GenerateCodes';
import SecurityQuestionScreen from './SecurityQuestions';
import SexTypeScreen from './SexTypeTab';
import DeleteScreen from '../../../components/deletecomponent'
import LoadingData from '../../../components/loadingData';

const SettingScreen=(params)=>{
    const [tabvalue,setTabValue]=React.useState(1)
    const [modal,setModal]=React.useState(false)
    const [modalScreen,setModalScreen]=React.useState(4)
    const [sexType,setSexType]=React.useState(null)
    const [securityQuestionValue,setSecurityQuestionValue]=React.useState(null)
    const [batch,setBatch]=React.useState([]);
    const [count,setCount]=React.useState(1);
    const [changed,setChanged]=React.useState(null)
    const [id,setId]=React.useState(null);
    const [data,setData]=React.useState(null)
    React.useEffect(()=>{  
        if(tabvalue===1){
            setModalScreen(1)
        }else if(tabvalue===2){
            setModalScreen(3)
        }else if(tabvalue===3){
            setModalScreen(4)
        }else if(tabvalue===4){
            setModalScreen(2)
        }else{
            setModalScreen(2);
        }

    },[tabvalue])
    React.useEffect(()=>{
        if(params.someValue){
            setId(params.someValue.id)
        }
    },[params.someValue])
    React.useEffect(()=>{
        if(params.success){
            setId(null);
            if(params.success.type==="AddSECURITYQUESTIONS"){
                setModal(false);
            }else if(params.success.type==="ADDSEXTYPE"){
                setSexType(" ")
            }else if(params.success.type==="DELETESEXTYPE"){
                params.changeModalState(false,1,1,null)
            }else if(params.success.type==="DELETESECURITYQUESTION"){
                params.changeModalState(false,1,1,null)
            }else if(params.success.type==="EDITEDSEXTYPE"){
                setChanged(null)
                params.changeModalState(false,1,1,null)
            }else if(params.success.type==="EDITSECURITYQUESTION"){
                setChanged(null)
                params.changeModalState(false,1,1,null)
            }else if(params.success.type==="DOSEMESSAGES"){
                setData(params.data)
            }
        }
    },[params.success])
   
    React.useEffect(()=>{
        console.log("modalstate",modal)
        params.changeModalState(modal,1,1,null)
    },[modal])
    React.useEffect(()=>{
        
        let arr=batch;

        arr.push({value:null})
        setBatch(arr)
    },[count])
    React.useEffect(()=>{
        
        console.log("batch",batch)
    },[batch])
    React.useEffect(()=>{
        setCount(1)
        params.loadAllDoseMessages();
    },[])
    return <div className="w-f padding">
        <Box sx={{borderBottom:'1px solid '+colors.primary2}}>
              <Tabs value={tabvalue} onChange={(n,e)=>{console.log("eee",e);setTabValue(e)}}   indicatorColor="primary"
>
                <Tab label="Sex type" value={1}/>
                <Tab label="Dose message" value={2}/>
                <Tab label="Security question" value={3}/>
                <Tab label="Generate code" value={4}/>
              </Tabs>
              
            </Box>
            <div className="f-flex" style={{justifyContent:'right'}}>
              
                <Button onClick={()=>{params.changeModalState(true,tabvalue,1,null)}} disableElevation={true} style={{backgroundColor:colors.primary10,color:'white'}} className={'mat-btn'} variant={'filled'}>Add</Button>
            </div>
            <br/><br/>
           {
               tabvalue===1?
           <SexTypeScreen/>:
            
            tabvalue===3?
            <SecurityQuestionScreen/>:
           <GenerateCodes/>
           }
           <Modal open={params.modalVisible} style={{overflow:'scroll',height:'100%'}}>
            <center>
            {
                modalScreen===1? params.screen===1?  <div className="w-30 white padding left-r" style={{marginTop:'10%'}}>
               <p className="left-r w-90" style={{fontSize:15,color:'black'}}><b>{params.progress===1?"Add":"Edit"} sex type</b></p>
               <br/>
               {
                       batch.map((dat,i)=>{
                           let val=params.progress===2?batch[i].value != null?batch[i].value:params.someValue.value:batch[i].value;
                           console.log("valueee",val)
                           {/* setChanged(val) */}
                           return ( <div><TextField label="Sex type name" className="w-f" variant="outlined" value={!changed?val:null} onChange={(e)=>{let xx=batch;xx[i].value=e.target.value;setBatch(xx);setChanged(e.target.value);console.log("batch"+batch[i].value!=null,JSON.stringify(batch)+params.progress)}}/>
                                 <br/><br/></div>)
                       })
                   }
                  
                  {
                      params.progress===1?
                     
                      <Button onClick={()=>{
                          let cc=count+1;
                          setCount(cc);
                          }}>Add more</Button>:null
                  }
               {/* <TextField variant="outlined" label="Sex type name" className="w-f margin-input" value={sexType} onChange={(e)=>setSexType(e.target.value)}/> */}
               <br/><br/>
               <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <Button variant={'text'} className="mrit" onClick={() => params.changeModalState(false,1,1,null)}  style={{marginRight:'5%', padding: '0% 10%',color:colors.primary10 }}>Cancel</Button>
                    <button variant={'contained'} onClick={()=>  
                        batch.length >0?params.progress===1?params.addBatchSexType(batch):params.someValue.value===securityQuestionValue?params.setMessage("No changes made"):params.editSexType(batch[0].value,params.someValue?params.someValue.id:null):params.setMessage("add sex type to continue")
                    
                    } disableElevation style={{ backgroundColor: colors.primary10,color:'white', padding: '3% 10%' }}>{
                       params.isLoading?<CircularProgress size={15} sx={{color:'white'}}/>:params.progress===1?"ADD":"SAVE"
                    }</button>
                </div>
           </div>:<DeleteScreen isLoading={params.isLoading} cancel={()=>params.changeModalState(false,1,1,null)} actions={()=>{
               
               params.deleteSexType(id)}} desc={"Are you sure you want to delete this sex type?"}/>
        :modalScreen===2? 
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
              
           </div>:params.progress===2?
           <div className="w-30 white padding" style={{marginTop:'10%'}}>
               
               <div className="w-90 left-r">
             
                   <p style={{fontSize:15,color:'black'}}><b>{params.progress===1?"Add":"Edit"} Security Question</b></p>
                   <br/><br/>
                   {
                       batch.map((dat,i)=>{
                        let val=params.progress===2?batch[i].value != null?batch[i].value:params.someValue.value:batch[i].value;
                           console.log("valueee",val)
                           {/* setChanged(val) */}
                           return ( <div><TextField label="Security Question" className="w-f" variant="outlined" value={!changed?val:null} onChange={(e)=>{let xx=batch;xx[i].value=e.target.value;setBatch(xx);setChanged(e.target.value);console.log("batch"+batch[i].value!=null,JSON.stringify(batch)+params.progress)}}/>
                                 <br/><br/></div>)
                           {/* return ( <div><TextField label="Security Question" className="w-f" variant="outlined" value={batch.length>0?batch[i].value:securityQuestionValue} onChange={(e)=>{batch.length>0?batch[i].value=e.target.value:setSecurityQuestionValue(e.target.value)}}/>
                                 <br/><br/></div>) */}
                       })
                   }
                  
                  {
                      params.progress===1?<Button onClick={()=>{
                          let cc=count+1;
                          setCount(cc);
                          }}>Add more</Button>:null
                  }
                   
                   <br/><br/>
               <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <button onClick={()=>
        params.changeModalState(false,1,1,null)} className="mrit border"  style={{marginRight:'5%', padding: '0% 10%',color:colors.primary10 }}>Cancel</button>
                    <button style={{ backgroundColor: colors.primary10,color:'white', padding: '3% 10%' }} onClick={() => {
                        batch.length >0?params.progress===1?params.addBatchSecurityQuestion(batch):params.someValue.value===securityQuestionValue?params.setMessage("No changes made"):params.editSecurityQuestion(batch[0].value,params.someValue?params.someValue.id:null):params.setMessage("add security question to continue")
                    }}>
                        {params.isLoading?
                        <CircularProgress size={15} sx={{color:'white'}}/>:params.progress===1?"Done":"Save"}
                    </button>
                </div>
               </div>

               <br/>
              
           </div>:<DeleteScreen isLoading={params.isLoading} cancel={()=>params.changeModalState(false,1,1,null)} actions={()=>params.deleteSecurityQuestion(id)} desc={"Are you sure you want to delete this security question?"}/>

          
           

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
        someValue:state.ModalReducer.someValue
    }
}
const mapDispatchTopProps=(dispatch)=>{
    return {
        addSecurityQuestion:(en)=>dispatch(addSecurityQuestions(en)),
        setMessage:(message)=>dispatch(setDataReducer(false,message,null,null)),
        addSexType:(en)=>dispatch(addSexType(en)),
        changeModalState:(visible,screen,progress,someValue)=>dispatch(setModalReducer(visible,screen,progress,someValue)),
        addBatchSecurityQuestion:(batch)=>dispatch(addBatchSecurityQuestion(batch)),
        addBatchSexType:(batch)=>dispatch(addBatchSexType(batch)),
        deleteSexType:(id)=>dispatch(deleteSexType(id)),
        deleteSecurityQuestion:(id)=>dispatch(deleteSecurityQuestion(id)),
        editSexType:(value,status,id)=>dispatch(editSexType(value,status,id)),
        editSecurityQuestion:(value,id)=>dispatch(editSecurityQuestion(value,id)),
        loadAllDoseMessages:()=>dispatch(getAllDoseMessage())

   

    }
}
export default connect(mapStateToProps,mapDispatchTopProps)(SettingScreen);