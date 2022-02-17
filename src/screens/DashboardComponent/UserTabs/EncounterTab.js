import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Modal, TextField, Typography,Avatar,Box,Tabs,Tab,TabPanel ,MenuItem,Select} from '@mui/material';
import { colors } from '../../../styles';
import { AddCircleRounded,ChevronLeft,Add, Search } from '@mui/icons-material';
import { InputAdornment } from '@material-ui/core';
import {setDataReducer,loadAllUsers,loadEncouters} from '../../../action/index'
import {connect} from 'react-redux'
import LoadingData from '../../../components/loadingData'
import moment from 'moment'
import {DesktopDatePicker} from '@mui/lab';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import NoItemFound from '../../../components/NoItemFound';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { searchString } from '../../../functions/checkSigned';

const EncounterScreen=(params)=>{
    const [modal,setModal]=React.useState(false);
    const [modalProgress,setModalProgress]=React.useState(1);
    const [screen,setScreen]=React.useState(1);
    const [allData,setAllData]=React.useState(null)
    const [selectedId,setSelectedId]=React.useState(null)
    const [detailData,setDetailData]=React.useState(null)
    const [encounters,setEncounters]=React.useState(null)
    const [minDate,setMinDate]=React.useState(moment())
    const [maxDate,setMaxDate]=React.useState(moment())
    const [selectedDate, handleDateChange] = React.useState(new Date());
    const [status,setStatus]=React.useState("All");
    const [sortedData,setSortedData]=React.useState(null)
    const [search,setSearch]=React.useState(null)

    const [page,setPage]=React.useState(1)
    const [pagerCount,setPagerCount]=React.useState(null)
    React.useEffect(()=>{
        params.loadUsers()
    },[])
    React.useEffect(()=>{
      if(search){
        setSortedData(searchString(search,allData))
      }
  },[search])
    React.useEffect(()=>{
      if(params.success){
        if(params.success.type==="ALLUSERS"){
              setAllData(params.data)
              setPagerCount(parseInt(params.data.length/10))

              
              
        computeActive(status)
        }else if(params.success.type==="USERENCOUNTER"){
          setEncounters(params.data)
          setPagerCount(parseInt(params.data.length/10))

        }
      }
    },[params.success])
    
     
      const computeMinMax=(min,max)=>{
        let computed=[];
        for(var i=0;i<allData.length;i++){
          console.log("resulto",moment(allData[i].createdDate).diff(moment(min),'hours'))
          if(moment(allData[i].createdDate).diff(moment(min),'hours') >0 && moment(max).diff(allData[i].createdDate,'hours') >=0 ){
            computed.push(allData[i])
          }
        }
        setSortedData(computed)
        
      }
      const computeActive=(value)=>{
        let computed=[];
        if(value!=="All"){
        for(var i=0;i<allData.length;i++){
          if(allData[i].isOnCycle+''===value){
            computed.push(allData[i])
          }
        }
        setSortedData(computed)
      }else{
        setSortedData(null)
      }
      }
      React.useEffect(()=>{
        if(allData){

          computeMinMax(minDate,maxDate)
        }
      },[minDate,maxDate])
      React.useEffect(()=>{
        computeActive(status)
        // computeMinMax(minDate,maxDate)
    },[status])
    return (
        
        <div>
        {
          screen===1?<div>
          <div className="padding w-f" style={{justifyContent:'space-between'}}>
          <Typography variant="h5">
            List Encounters
          </Typography>
          <div className="f-flex " style={{justifyContent:'space-between'}}>
            <TextField label="search" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search" variant='outlined' className='w-30'/>
            <div className="f-flex w-40 " style={{justifyContent:'space-between',alignContent:'center'}}>
              <Typography variant="p" style={{fontSize:15,alignSelf:'center',textAlign:'center'}} className="w-30">Created at</Typography>
             <LocalizationProvider dateAdapter={DateAdapter}>
              <DesktopDatePicker
          label="minimum date"
          inputFormat="MM/dd/yyyy"
          value={minDate}
          onChange={setMinDate}
          renderInput={(params) => <TextField {...params} />}/>

           <DesktopDatePicker
          label="maximum date"
          inputFormat="MM/dd/yyyy"
          value={maxDate}
          onChange={setMaxDate}
          renderInput={(params) => <TextField {...params} />}
       />
       </LocalizationProvider>
            </div>
            <div className="f-flex w-20 " style={{justifyContent:'center',alignContent:'center'}}>
              <Typography variant="p" style={{fontSize:15,alignSelf:'center'}} className="padding" >Status</Typography>
              <Select className="w-50"
                labelId="demo-simple-select-label"
                value={status}
                label="status"
                onChange={(e)=>setStatus(e.target.value)}
  >
        <MenuItem value={"All"}>All</MenuItem>
        <MenuItem value={"true"}>Active</MenuItem>
        <MenuItem value={"false"}>Deactive</MenuItem>
  </Select>
            </div>
          </div>
        </div>
        <br/>
            <div className="w-f" >
            {
              allData?<div><table className="w-f ">
                    <tr className="eee">
                        <th className="w-5 padding">#</th>
                        <th className="w-10">Name</th>
                        <th className="w-10">Email</th>
                        
                        <th className="w-5">Status</th>
                        <th className="w-10">Created at</th>
                        <th className="w-5">Action</th>
                    </tr>
                   {sortedData?
                     sortedData.map((dat,i)=>{
                       
                       return  i <=page*10 && i >=(page*10)-10? <tr className="tr-hover" style={{cursor:'pointer'}} onClick={()=>{
                         setScreen(2);setSelectedId(dat.userId);params.loadEncouters(dat.userId);setDetailData(dat);
                       }}>
                    <td className="padding" >{i+1}</td>
                    <td><p style={{alignSelf:'center',marginLeft:10,color:colors.primary10}}>{dat.firstName} {dat.lastName}</p></td>
                     <td>{dat.email}</td>
                     <td>
                             <p className={`${dat.isActive?'green':'red'} w-30`}>
                            <Typography color={dat.isActive?'green':'orangered'} variant={'p'} sx={{color:dat.isActive?'green !important':'orangered !important',borderColor:dat.isOnCycle?'green':'red',borderWidth:1}} >{dat.isActive?"Active":"Deactive"}</Typography>
            </p>
                         </td>
                         <td className="padding">{moment(dat.createdDate).format("MMM DD HH:MM")}</td>
                        
                         <td>
                           <center>
                <div style={{alignContent:'center',justifyContent:'space-around',alignSelf:'center'}}>
                  <IconButton onClick={()=>{}}>
                  <img src={`${process.env.PUBLIC_URL}/icons/edit.svg`} height={20} width={20} style={{alignSelf:'center'}}/>
                  </IconButton>
                
    
                </div></center>
                         </td>
                     
                    </tr>:null
                     }):
                     allData.map((dat,i)=>{
                       return  i <=page*10 && i >=(page*10)-10? <tr className="tr-hover" style={{cursor:'pointer'}} onClick={()=>{
                         setScreen(2);setSelectedId(dat.userId);params.loadEncouters(dat.userId);setDetailData(dat);
                       }}>
                    <td className="padding" >{i+1}</td>
                    <td><p style={{alignSelf:'center',marginLeft:10,color:colors.primary10}}>{dat.firstName} {dat.lastName}</p></td>
                     <td>{dat.email}</td>
                     <td>
                             <p className={`${dat.isActive?'green':'red'} w-30`}>
                            <Typography color={dat.isActive?'green':'orangered'} variant={'p'} sx={{color:dat.isActive?'green !important':'orangered !important',borderColor:dat.isActive?'green':'red',borderWidth:1}} >{dat.isActive?"Active":"Deactive"}</Typography>
            </p>
                         </td>
                         <td className="padding">{moment(dat.createdDate).format("MMM DD HH:MM")}</td>
                        
                         <td>
                           <center>
                <div style={{alignContent:'center',justifyContent:'space-around',alignSelf:'center'}}>
                  <IconButton onClick={()=>{}}>
                  <img src={`${process.env.PUBLIC_URL}/icons/edit.svg`} height={20} width={20} style={{alignSelf:'center'}}/>
                  </IconButton>
                
    
                </div></center>
                         </td>
                     
                    </tr>:null
                     })
                   }
                    </table> <Stack spacing={0}>
      <Pagination count={pagerCount} color={'primary'} variant="outlined" shape="rounded" page={page} onChange={(event,value)=>setPage(value)} />
      </Stack></div>:params.isLoading?<LoadingData/>:null
            }
             
                    </div>
          </div>
          :<div >
            <div className="f-flex">
            <IconButton onClick={()=>setScreen(1)}>
              <ChevronLeft/>
            </IconButton>
            <Avatar color={'primary'} style={{alignSelf:'center'}}>{detailData?detailData.firstName.charAt(0).toUpperCase()+detailData.lastName.charAt(0).toUpperCase():null}</Avatar>
            <Typography variant={'p'} style={{alignSelf:'center',marginLeft:'2%'}}>
              <b>{detailData?detailData.firstName+ " "+detailData.lastName:null}</b>
            </Typography>
            </div>
            <br/>
           
            <div className="w-f">
          
                <div style={{height:500}}>
                <div className="w-f" >
                {encounters && encounters.length>0?
                  <table>
                    <tr className="eee">
                        <th className="w-10 padding">#</th>
                        <th className="w-20">Date added</th>
                        <th className="w-20">Type</th>
                        <th className="w-20">Noted</th>
                         <th className="w-10">Status</th>
                        
                        <th className="w-5">Action</th>
                    </tr>
                   {
                    encounters.map((dat,i)=>{
                       return  <tr className="tr-hover" style={{cursor:'pointer'}} >
                    <td className="padding">1</td>
                    <td className="padding">{moment(dat.createdDate).format("MM/DD/YYYY")}</td>
                     <td className="f-flex padding">
                     {
                       dat.sexType.map((da,i)=>{
                         return <p>{da.en}</p>
                       })
                     }</td>
                     <td>{dat.comment?dat.comment:"no notes"}</td>
                     
                         <td>
                             <div className={`${dat.status==="protected"?'green':'red'} w-50`}>
                            <Typography color={dat.status==="protected"?'green':'orangered'} variant={'p'} sx={{color:dat.status==="protected"?'green !important':'orangered !important',borderColor:dat.status==="protected"?'green':'red',borderWidth:1}} >{dat.status==="protected"?"Protected":"Unprotected"}</Typography>
            </div>
                         </td>
                         <td>
                           <center>
                <div style={{alignContent:'center',justifyContent:'space-around',alignSelf:'center'}}>
                  <IconButton onClick={()=>{}}>
                  <img src={`${process.env.PUBLIC_URL}/icons/edit.svg`} height={20} width={20} style={{alignSelf:'center'}}/>
                  </IconButton>
                
    
                </div></center>
                         </td>
                     
                    </tr>
                     })
                   }
                    </table>:params.isLoading?<LoadingData/>:<NoItemFound/>
                }
             
                    </div>
                </div>
              </div>
           
          </div>
        }
       
      <Modal open={modal}>
           <center>

           {
             modalProgress===1? <div className="w-30  white padding" style={{marginTop:'5%'}}>
                   <Typography variant="p" color={colors.primary9} className="t-left">
                   <b>Add Users</b>
                   
                   </Typography>
                   <br/>
                   <div style={{position:'relative',width:120,marginTop:'10%',marginBottom:'10%'}}>
                   <img src={`${process.env.PUBLIC_URL}/icons/person.svg`} height={90} width={90} style={{backgroundColor:colors.primary1,padding:10,borderRadius:90}}/>
                  <IconButton style={{position:'absolute',bottom:0,right:0,backgroundColor:colors.primary10}} size="large">
                      <Add sx={{color:'white'}} />
                  </IconButton>
                  <br/>

                 
                   </div>
                   <div className="t-left">
                   <p className=' t-l'>Username</p>
            <input type={'text'} placeholder='username' className='w-f'/>
            <p className=' t-l' >Email</p>
            <input type={'email'} placeholder='email' className='w-f'/>
            <p className=' t-l'>Password</p>
            <input type={'password'} placeholder='username' className='w-f'/>
            <p className=' t-l' >Confirm password</p>
            <input type={'password'} placeholder='password' className='w-f'/>
                   </div>
                 <div className="f-flex m-top" style={{justifyContent:'right'}}>
                     <Button variant={'text'} className="mrit" onClick={()=>setModal(false)}>Cancel</Button>
                     <Button variant={'contained'} disableElevation style={{padding:'0 15%'}} style={{backgroundColor:colors.primary10}}>Save</Button>
                 </div>
                   </div> :
                   <div className="w-30  white padding" style={{marginTop:'5%'}}>
                   <Typography variant="p" color={colors.primary9} className="t-left">
                   <b>Edit Users</b>
                   
                   </Typography>
                   <br/>
                   <div style={{position:'relative',width:120,marginTop:'10%',marginBottom:'10%'}}>
                   <img src={`${process.env.PUBLIC_URL}/icons/person.svg`} height={90} width={90} style={{backgroundColor:colors.primary1,padding:10,borderRadius:90}}/>
                  <IconButton style={{position:'absolute',bottom:0,right:0,backgroundColor:colors.primary10}} size="large">
                      <Add sx={{color:'white'}} />
                  </IconButton>
                  <br/>

                 
                   </div>
                   <div className="t-left">
                   <p className=' t-l'>Username</p>
            <input type={'text'} placeholder='username' className='w-f'/>
            <p className=' t-l' >Email</p>
            <input type={'email'} placeholder='email' className='w-f'/>
                   </div>
                 <div className="f-flex m-top" style={{justifyContent:'right'}}>
                     <Button variant={'text'} className="mrit" onClick={()=>setModal(false)}>Cancel</Button>
                     <Button variant={'contained'} disableElevation style={{padding:'0 15%'}} style={{backgroundColor:colors.primary10}}>Save</Button>
                 </div>
                   </div> 
           }
                  
                   </center>
            </Modal>
        </div>
        
    )
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
      setMessage:(message)=>dispatch(setDataReducer(false,message,null,null)),
      loadUsers:()=>dispatch(loadAllUsers()),
      loadEncouters:(id)=>dispatch(loadEncouters(id))
 

 

  }
}
export default connect(mapStateToProps,mapDispatchTopProps)(EncounterScreen)