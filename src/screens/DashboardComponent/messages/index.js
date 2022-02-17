import * as React from 'react'
import {loadMessages, setDataReducer,sendMessage} from '../../../action/index'
import {connect} from 'react-redux'
import LoadingData from '../../../components/loadingData'
import { colors } from '../../../styles'
import moment from 'moment'
import { ChevronLeft,Send } from '@mui/icons-material'
import { IconButton,TextField } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from '@material-ui/core'
import NoItemFound from '../../../components/NoItemFound'

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const MessageScreen=(params)=>{
    const [messages,setMessages]=React.useState(null)
    const [screen,setScreen]=React.useState(1)
    const [selectedUser,setSelectedUser]=React.useState(null)
    const [message,setMessage]=React.useState(null)
    const [parsedData,setParsedData]=React.useState(null)
    const scrollref=React.useRef(null)
    const [page,setPage]=React.useState(1)
    const [pagerCount,setPagerCount]=React.useState(null)
    const [sortedMessage,setSortedMessage]=React.useState(null)
    
    React.useEffect(()=>{
        if(params.success){
            if(params.success.type==="ALLMESSAGES"){
                setSortedMessage(sortAllMessages(params.data))
                setMessages(params.data)
              
            }else if(params.success.type==="SENTMESSAGE"){
                // setMessages(params.data)
                
                let arr=parsedData;
                arr.push(params.data)
                setTimeout(()=>scrollref.current.scrollIntoView(),1000)
            }

            
        }
    },[params.success])
    React.useEffect(()=>{
        params.loadMessages();
    },[])
    const parseData=(phoneNumber)=>{
        let arr=[];
        for(var i=0;i<messages.length;i++){
                if(messages[i].from===phoneNumber || messages[i].to===phoneNumber){
                    arr.push(messages[i])
                }
        }
        arr.reverse();
        setParsedData(arr);
        return arr;
    }
    const sortAllMessages=(allMessages)=>{
        let arr=[]

        for(var i=0;i<allMessages.length;i++){
            let bool=true;
            if(arr.length>0){
                    for(var k=0;k<arr.length;k++){
                       
                        if(allMessages[i].to ===arr[k].to && allMessages[i].from===arr[k].from){
                           bool=false;
                        }else  if(allMessages[i].from ===arr[k].to && allMessages[i].to===arr[k].from){
                                bool=false;
                        }
                        console.log("fuck",allMessages[i].to ===arr[k].to && allMessages[i].from===arr[k].from?true:false)

                    }
                    if(bool===true){
                        arr.push(allMessages[i])
                    }
            }else{
                console.log("iwashere",allMessages[i])
                arr.push(allMessages[i])
            }
        }
        console.log("array",allMessages)
        return arr;
    }
    React.useEffect(()=>{
        if(parsedData){
            scrollref.current.scrollIntoView()
        }
    },[parsedData])
    return (
        <div className='padding w-f'>
            <p><b>Messages</b></p>
            <p style={{fontSize:12,color:'gray'}}>list of all messages</p>
            <br/><br/>
            <div className="border  w-f padding" >
                {screen===1?<div>
                   { sortedMessage && sortedMessage.length>0?sortedMessage.map((dat,i)=>{
                        return  i <=page*10 && i >=(page*10)-10?<div className="padding f-flex" onClick={()=>{setSelectedUser(dat);setScreen(2);parseData(dat.direction==="outbound-api"?dat.to:dat.from);}} style={{backgroundColor:dat.direction==="outbound-api"?'#00d50003':'#7ae91e08',justifyContent:'space-between',cursor:'pointer',marginBottom:'1%',borderRadius:'5px',backgroundColor:'#fff',fontFamily:'sans-serif',boxShadow:'0px 0px 14px #eee'}}>
                        
                       <div> <p style={{fontSize:12,color:colors.primary10}}>{dat.to}</p>
                       <p><b>{dat.body}</b></p>
                       </div>
                       <div style={{alignItems:'center',justifyContent:'center',alignContent:'center'}}>
                           <p className={`padding ${dat.status!=='undelivered' && dat.status!=='failed'?'green':'red'}`}>{dat.status}</p>
                           <p style={{color:colors.primary10,textAlign:'center',fontSize:12}}>{moment(dat.dateSent).format('MMM DD HH:MM')}</p>
                       </div>
                                
                        </div>:null
                    }):params.isLoading?<LoadingData/>:<NoItemFound/>}
                    <Stack spacing={0}>
      <Pagination count={pagerCount} color={'primary'} variant="outlined" shape="rounded" page={page} onChange={(event,value)=>setPage(value)} />
      </Stack>
                    </div> :
                    <div className="padding " style={{alignSelf:'center',alignContent:'center',position:'relative'}}>
                    
                    <div className="f-flex">
                    <IconButton onClick={()=>setScreen(1)}>
                        <ChevronLeft/>
                    </IconButton>
                        <p style={{alignSelf:'center'}}>{selectedUser.to}</p>
                        <br/>
                        </div>
                        <div style={{maxHeight:400,overflowY:'scroll',scrollBehavior:'smooth'}}>
                        {
                            parsedData?parsedData.map((dat,i)=>{
                                return <div className={`padding f-flex ${dat.to===(selectedUser.direction==='outbound-api'?selectedUser.to:selectedUser.from)?'bubble-right':'bubble-left'}`}>
                                    <div className={` ${dat.to===(selectedUser.direction==='outbound-api'?selectedUser.to:selectedUser.from)?'bubble-r':'bubble-l'} padding radius`} >
                                        <p style={{textAlign:'inherit'}}>{dat.body}</p>
                                        <div className="f-flex" style={{justifyContent:'right'}}>
                                        {
                                            dat.to===(selectedUser.direction==='outbound-api'?selectedUser.to:selectedUser.from)?
                                            dat.status==="undelivered" || dat.status==="failed"?<CloseIcon style={{fontSize:15,color:'red'}}/>:dat.status==="delivered"?<CheckCircleOutlineIcon style={{fontSize:15,color:'green'}}/>:dat.status==="received"?<CheckCircleIcon/>:null
                                            :null
                                        }
                                        <p style={{color:colors.primary10,fontSize:12,textAlign:'inherit'}}>{moment(dat.dateSent?dat.dateSent:dat.dateCreated).format('MMM DD HH:MM')}</p>
                                        </div>
                                    </div>
                                </div>
                            }):null
                        }
                        <div id="scrolltobottom w-10" style={{height:20}} ref={scrollref}></div>
                        </div>
                        
                        <div className="white f-flex" style={{justifyContent:'center'}}>
                            <TextField label="reply message" value={message} onChange={(e)=>setMessage(e.target.value)} className="w-90"/>
                        
                        {
                            params.isLoading?<CircularProgress size={20} color={'blue'} className="padding"/>:  <IconButton onClick={()=>{
                            message.trim().length>0?params.sendMessage(selectedUser.direction==='outbound-api'?selectedUser.to:selectedUser.from,message):params.setMessage("add reply message to send")
                        }}>
                            <Send/>
                        </IconButton>
                        }
                      
                        </div>
                    </div>
                   
                }
            </div>
        </div>
    )
}
const mapStateToProps=(state)=>{
    return {
        isLoading:state.sendDataReducer.isLoading,
        success:state.sendDataReducer.success,
        error:state.sendDataReducer.error,
        data:state.sendDataReducer.data,
    }
}
const mapDispatchTopProps=(dispatch)=>{
    return {
        loadMessages:()=>dispatch(loadMessages()),
        setMessage:(message)=>dispatch(setDataReducer(false,message,null,null)),
        sendMessage:(to,text)=>dispatch(sendMessage(to,text))
    }
}
export default connect(mapStateToProps,mapDispatchTopProps)(MessageScreen)