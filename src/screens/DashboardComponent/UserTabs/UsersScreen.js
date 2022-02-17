import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Modal,FormControl ,InputLabel, TextField, Typography,Avatar,Box,Tabs,Tab,TabPanel ,MenuItem,Select,CircularProgress} from '@mui/material';
import { colors } from '../../../styles';
import { AddCircleRounded,ChevronLeft,Add, Search } from '@mui/icons-material';
import { InputAdornment } from '@material-ui/core';
import {setDataReducer,loadAllUsers,loadEncouters,updateUser} from '../../../action/index'
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

const UserScreen=(params)=>{
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
    const [isActive,setIsActive]=React.useState(null)
    const [sortedData,setSortedData]=React.useState(null)
    const [search,setSearch]=React.useState(null)
    const [page,setPage]=React.useState(1)
    const [pagerCount,setPagerCount]=React.useState(null)

    React.useEffect(()=>{
        params.loadUsers()
    },[])
    React.useEffect(()=>{
      if(search && search.length>0){
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
        }else if(params.success.type==="UPDATEUSER"){
          setScreen(1);
        }
      }
    },[params.success])
    
      const columns2 = [
        { field: 'id', headerName: '#', width: 70 },
        { field: 'DateAdded', headerName: 'Date added', width: 130 },
        { field: 'Type', headerName: 'Type', width: 130 },
        {
          field: 'age',
          headerName: 'Noted',
          type: 'number',
          width: 90,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 160,
          renderCell:(params)=>(
            params.value==='active'?<div className="green">
<Typography color={'green'} xs={{color:'green !important',borderColor:'green',borderWidth:1}} >Protected</Typography>
            </div>:
            <div className="red">
            <Typography color={'red'} xs={{color:'green !important'}}>Unprotected</Typography>
            </div>
          ),
          
         
        },
        {
          field: 'action',
          headerName: 'Action',
          width: 160,
          renderCell:(params)=>(
            <center>
            <div style={{alignContent:'center',justifyContent:'space-around',alignSelf:'center'}}>
              <IconButton onClick={()=>{setModal(true);setModalProgress(2)}}>
              <img src={`${process.env.PUBLIC_URL}/icons/edit.svg`} height={20} width={20} style={{alignSelf:'center'}}/>
              </IconButton>
              <IconButton>

              <img src={`${process.env.PUBLIC_URL}/icons/delete.svg`} height={20} width={20} style={{alignSelf:'center'}}/>
              </IconButton>

            </div></center>
          )
        }
      ];
      
      const rows = [
        { id: 1,  DateAdded: 'Jon', age: 35,status:'active',action:true },
        { id: 2,  DateAdded: 'Cersei', age: 42,status:'inactive',action:false },
        { id: 3,  DateAdded: 'Jaime', age: 45,status:'active',action:false },
        { id: 4,DateAdded: 'Arya', age: 16,status:'active',action:true },
        { id: 5,  DateAdded: 'Daenerys', age: null,status:'active',action:true },
        { id: 6, lastName: 'Melisandre', DateAdded: null, age: 150 ,status:'active',action:true},
        { id: 7, lastName: 'Clifford', DateAdded: 'Ferrara', age: 44,status:'active',action:true },
        { id: 8, lastName: 'Frances', DateAdded: 'Rossini', age: 36,status:'active',action:true },
        { id: 9, lastName: 'Roxie', DateAdded: 'Harvey', age: 65,status:'active',action:true },
      ];
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
          if(allData[i].isActive+''===value){
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
            List users
          </Typography>
          <div className="f-flex " style={{justifyContent:'space-between'}}>
            <TextField label="search" placeholder="search" variant='outlined' value={search} onChange={(e)=>setSearch(e.target.value)} className='w-30'/>
            <div className="f-flex w-40 " style={{justifyContent:'space-between',alignContent:'center'}}>
              <Typography variant="p" style={{fontSize:15,alignSelf:'center',textAlign:'center'}} className="w-30">Created at</Typography>
             <LocalizationProvider dateAdapter={DateAdapter}>
              <DesktopDatePicker
          label="minimum date"
          inputFormat="MM/DD/YYYY"
          
          className="border"
          value={minDate}
          onChange={setMinDate}
          renderInput={(params) => <TextField {...params} />}/>

           <DesktopDatePicker
          label="maximum date"
          inputFormat="MM/DD/YYYY"
          value={maxDate}
          className="border"
          onChange={setMaxDate}
          renderInput={(params) => <TextField {...params} />}
       />
       </LocalizationProvider>
            </div>
            <div className="f-flex w-20 " style={{justifyContent:'center',alignContent:'center'}}>
              <Typography variant="p" style={{fontSize:15,alignSelf:'center'}} className="padding" >Status</Typography>
              <FormControl className="w-50">

              <Select className="w-f"
                labelId="demo-simple-select-labelb"
                value={status}
                label="Status"
                onChange={(e)=>setStatus(e.target.value)}
  >
    
        <MenuItem value={"All"}>All</MenuItem>
        <MenuItem value={"true"}>Active</MenuItem>
        <MenuItem value={"false"}>Deactive</MenuItem>
  </Select>
  </FormControl>
            </div>
          </div>
        </div>
        <br/>
            <div className="w-f" >
            {
              allData && allData.length>0?<div><table className="w-f ">
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
                      
                       return   i <=page*10 && i >=(page*10)-10?<tr className="tr-hover" style={{cursor:'pointer'}} onClick={()=>{
                         setScreen(2);setSelectedId(dat.userId);params.loadEncouters(dat.userId);setDetailData(dat);
                       }}>
                    <td className="padding" >{i+1}</td>
                    <td><p style={{alignSelf:'center',marginLeft:10,color:colors.primary10}}>{dat.firstName} {dat.lastName}</p></td>
                     <td>{dat.email}</td>
                     <td>
                             <p className={`${dat.isActive?'green':'red'} `}>
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
                     }):
                     allData.map((dat,i)=>{
                       return   i <=page*10 && i >=(page*10)-10?<tr className="tr-hover" style={{cursor:'pointer'}} onClick={()=>{
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
      </Stack></div>:params.isLoading?<LoadingData/>:<NoItemFound/>
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
                <div className="w-f padding" >

<br/>
<div className="w-f">

<p>General Information</p>
<br/>
<div className="f-flex" style={{justifyContent:'space-between'}}>
  
<TextField label="First name" variant={'outlined'} className="w-40" disabled={true} value={detailData?detailData.firstName:null}/>
<TextField label="Last name" variant={'outlined'} className="w-40" disabled={true} value={detailData?detailData.lastName:null}/>
</div>
<br/><br/>
<div className="f-flex" style={{justifyContent:'space-between'}}>
  
  <TextField label="Email" variant={'outlined'} className="w-40" disabled={true} value={detailData?detailData.email:null}/>
                        <FormControl label="status" className="w-40">
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>

                                 <Select 
                value={isActive===null?detailData.isActive?detailData.isActive:false:isActive}
                label="status"
                id="seleted"
                variant='outlined'
                className="w-f"
                onChange={(e)=>setIsActive(e.target.value)}
  >
        <MenuItem value={true}>Active</MenuItem>
        <MenuItem value={false}>InActive</MenuItem>
  </Select>
  </FormControl>

  </div>
  <br/><br/>
  <div className="f-flex" style={{justifyContent:'space-between'}}>
    <div className="w-10"></div>
    <button className='w-30' onClick={()=>{
      params.updateUser(detailData.userId,isActive)
    }} style={{backgroundColor:colors.primary10}}>
      {
        params.isLoading?<CircularProgress size={15} sx={{color:'white'}}/>:"Update user"
      }
    </button>
  </div>
</div>             
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
                   <img src="../../../icons/person.svg" height={90} width={90} style={{backgroundColor:colors.primary1,padding:10,borderRadius:90}}/>
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
                   <img src="../../../icons/person.svg" height={90} width={90} style={{backgroundColor:colors.primary1,padding:10,borderRadius:90}}/>
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
      loadEncouters:(id)=>dispatch(loadEncouters(id)),
      updateUser:(id,isActive)=>dispatch(updateUser(id,isActive))
 

 

  }
}
export default connect(mapStateToProps,mapDispatchTopProps)(UserScreen)