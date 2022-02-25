import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Modal, TextField,FormControl,InputLabel, Typography, Avatar, Box, Tabs, Tab, TabPanel, Select, MenuItem ,CircularProgress} from '@mui/material';
import { colors } from '../../../styles';
import { AddCircleRounded, ChevronLeft, Add, Search } from '@mui/icons-material';
import { InputAdornment } from '@material-ui/core';
import { setDataReducer, loadAllUsers, loadEncouters, loadAdmins, setModalReducer,updateUser,updateAdmin } from '../../../action/index'
import { connect } from 'react-redux'
import LoadingData from '../../../components/loadingData'
import moment from 'moment'

import {DesktopDatePicker} from '@mui/lab';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import NoItemFound from '../../../components/NoItemFound';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { searchString } from '../../../functions/checkSigned';


const AdminScreen = (params) => {
    const [modal, setModal] = React.useState(false);
    const [modalProgress, setModalProgress] = React.useState(1);
    const [screen, setScreen] = React.useState(1);
    const [tabvalue, setTabValue] = React.useState(1)
    const [allData, setAllData] = React.useState(null)
    const [selectedId, setSelectedId] = React.useState(null)
    const [detailData, setDetailData] = React.useState(null)
    const [encounters, setEncounters] = React.useState(null)
    const [isActive,setIsActive]=React.useState(false)
    const [email,setEmail]=React.useState(null)
    const [firstName,setFirstName]=React.useState(null)
    const [lastName,setLastName]=React.useState(null)
    const [minDate,setMinDate]=React.useState(moment())
    const [maxDate,setMaxDate]=React.useState(moment())
    const [status,setStatus]=React.useState("All")
    const [sortedData,setSortedData]=React.useState(null)
    const [search,setSearch]=React.useState(null)

    const [page,setPage]=React.useState(1)
    const [pagerCount,setPagerCount]=React.useState(null)
    React.useEffect(() => {
        params.loadAdmins()
    }, [])
    React.useEffect(()=>{
        if(search && search.length>0){
          setSortedData(searchString(search,allData))
        }
    },[search])
    React.useEffect(() => {
        if (params.success) {
            if (params.success.type === "ALLADMINS") {
                setAllData(params.data.reverse())
                setPagerCount(parseInt(params.data.length/10))

            } else if (params.success.type === "USERENCOUNTER") {
                setEncounters(params.data)
                setPagerCount(parseInt(params.data.length/10))
            }else if(params.success.type==="UPDATEAdmin"){
                setScreen(1)
            }
        }
    }, [params.success])
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
    React.useEffect(()=>{
        if(detailData){
            setEmail(detailData.email)
            setFirstName(detailData.firstName)
            setLastName(detailData.lastName)
        }
    },[detailData])


    return (

        <div>
            {
                screen === 1 ? <div>
                    <div className="padding w-f" style={{ justifyContent: 'space-between' }}>
                        <div className="f-flex" style={{ justifyContent: 'space-between' }}>
                            <Typography variant="h5">
                                List Admins
                            </Typography>
                            <div className="f-flex">
                                <Button color={'primary'} onClick={() => params.changeModalState(true, 9, 1, null)} style={{ color: colors.primary10, alignItems: 'center', alignSelf: 'center' }} className="flex">

                                    Promote user to admin</Button>
                                <Button color={'primary'} onClick={() => params.changeModalState(true, 7, 1, null)} style={{ backgroundColor: colors.primary10, color: 'white', alignItems: 'center', alignSelf: 'center' }} className="flex">
                                    <p style={{ fontSize: 20, paddingRight: 10 }}> + </p>
                                    New Admin</Button>
                            </div>

                        </div>
                        <br />
                        <div className="f-flex " style={{justifyContent:'space-between'}}>
            <TextField label="search" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search" variant='outlined' className='w-30'/>
            <div className="f-flex w-50 " style={{justifyContent:'space-between',alignContent:'center'}}>
            <div className="f-flex" style={{justifyContent:'space-between',alignContent:'center'}}>
              <Typography variant="p" style={{fontSize:15,alignSelf:'center',textAlign:'center'}} className="w-30">Created at</Typography>
             <LocalizationProvider dateAdapter={DateAdapter}>
              <DesktopDatePicker
          label="minimum date"
          inputFormat="MM/DD/YYYY"
          
          className="border w-40"
          value={minDate}
          onChange={setMinDate}
          renderInput={(params) => <TextField {...params} />}/>

           <DesktopDatePicker
          label="maximum date"
          inputFormat="MM/DD/YYYY"
          value={maxDate}
          className="border w-40"
          onChange={setMaxDate}
          renderInput={(params) => <TextField {...params} />}
       />
       </LocalizationProvider>
       </div>
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
                    <br />
                    <div className="w-f" >
                        {
                            allData && allData.length>0 ?<div> <table className="w-f ">
                                <tr className="eee">
                                    <th className="w-5 padding">#</th>
                                    <th className="w-10">Name</th>
                                    <th className="w-10">Email</th>

                                    <th className="w-5">Status</th>
                                    <th className="w-10">Created at</th>
                                    <th className="w-5">Action</th>
                                </tr>
                                {
                                   sortedData?sortedData.map((dat, i) => {
                                        return  i <=page*10 && i >=(page*10)-10?<tr className="tr-hover" style={{ cursor: 'pointer' }} onClick={() => {
                                            setScreen(2); setSelectedId(dat.userId); params.loadEncouters(dat.userId); setDetailData(dat);
                                        }}>
                                            <td className="padding" >{i + 1}</td>
                                            <td className="padding"><p style={{ alignSelf: 'center', marginLeft: 10, color: colors.primary10 }}>{dat.firstName} {dat.lastName}</p></td>
                                            <td className="padding">{dat.email}</td>
                                            <td className="padding">
                                                <p className={`${dat.isActive ? 'green' : 'red'}`}>
                                                    <Typography color={dat.isActive ? 'green' : 'orangered'} variant={'p'} sx={{ color: dat.isActive ? 'green !important' : 'orangered !important', borderColor: dat.isActive ? 'green' : 'red', borderWidth: 1 }} >{dat.isActive ? "Active" : "Deactive"}</Typography>
                                                </p>
                                            </td>
                                            <td className="padding">{moment(dat.createdDate).format("MMM DD, YYYY,HH:MM")}</td>

                                            <td>
                                                <center>
                                                    <div style={{ alignContent: 'center', justifyContent: 'space-around', alignSelf: 'center' }}>
                                                        <IconButton onClick={() => { }}>
                                                            <img src={`${process.env.PUBLIC_URL}/icons/edit.svg`} height={20} width={20} style={{ alignSelf: 'center' }} />
                                                        </IconButton>


                                                    </div></center>
                                            </td>

                                        </tr>:null
                                    }):allData.map((dat, i) => {
                                        return  i <=page*10 && i >=(page*10)-10?<tr className="tr-hover" style={{ cursor: 'pointer' }} onClick={() => {
                                            setScreen(2); setSelectedId(dat.userId); params.loadEncouters(dat.userId); setDetailData(dat);
                                        }}>
                                            <td className="padding" >{i + 1}</td>
                                            <td className="padding"><p style={{ alignSelf: 'center', marginLeft: 10, color: colors.primary10 }}>{dat.firstName} {dat.lastName}</p></td>
                                            <td className="padding">{dat.email}</td>
                                            <td className="padding">
                                                <p className={`${dat.isActive ? 'green' : 'red'} w-30`}>
                                                    <Typography color={dat.isActive ? 'green' : 'orangered'} variant={'p'} sx={{ color: dat.isActive ? 'green !important' : 'orangered !important', borderColor: dat.isActive ? 'green' : 'red', borderWidth: 1 }} >{dat.isActive ? "Active" : "Deactive"}</Typography>
                                                </p>
                                            </td>
                                            <td className="padding">{moment(dat.createdDate).format("MMM DD, YYYY,HH:MM")}</td>

                                            <td>
                                                <center>
                                                    <div style={{ alignContent: 'center', justifyContent: 'space-around', alignSelf: 'center' }}>
                                                        <IconButton onClick={() => { }}>
                                                            <img src={`${process.env.PUBLIC_URL}/icons/edit.svg`} height={20} width={20} style={{ alignSelf: 'center' }} />
                                                        </IconButton>


                                                    </div></center>
                                            </td>

                                        </tr>:null
                                    })
                                }
                            </table> <Stack spacing={0}>
      <Pagination count={pagerCount} color={'primary'} variant="outlined" shape="rounded" page={page} onChange={(event,value)=>setPage(value)} />
      </Stack> </div>: params.isLoading ? <LoadingData /> : <NoItemFound/>
                        }

                    </div>
                </div>
                    : <div><div >
                        <div className="f-flex">
                            <IconButton onClick={() => setScreen(1)}>
                                <ChevronLeft />
                            </IconButton>
                            <Avatar color={'primary'} style={{ alignSelf: 'center' }}>{detailData ? detailData.firstName.charAt(0).toUpperCase() + detailData.lastName.charAt(0).toUpperCase() : null}</Avatar>
                            <Typography variant={'p'} style={{ alignSelf: 'center', marginLeft: '2%' }}>
                                <b>{detailData ? detailData.firstName + " " + detailData.lastName : null}</b>
                            </Typography>
                        </div>
                        <br />

                        <div className="w-f">

                            <div style={{ height: 500 }}>
                                <div className="w-f padding" >

                                    <br />
                                    <div className="w-f">

                                        <p>General Information</p>
                                        <br />
                                        <div className="f-flex" style={{ justifyContent: 'space-between' }}>

                                            <TextField label="First name" variant={'outlined'} className="w-40" onChange={(e)=>setFirstName(e.target.value)} disabled={false} value={firstName} />
                                            <TextField label="Last name" variant={'outlined'} className="w-40" onChange={(e)=>setLastName(e.target.value)} disabled={false} value={lastName} />
                                        </div>
                                        <br /><br />
                                        <div className="f-flex" style={{ justifyContent: 'space-between' }}>

                                            <TextField label="Email" variant={'outlined'} className="w-40" disabled={false} onChange={(e)=>setEmail(e.target.value)} value={email} />
                                            <FormControl label="status" className="w-40">
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>

                                            <Select
                                                value={isActive === null ? detailData.isActive ? detailData.isActive : false : isActive}
                                                label="status"
                                                id="seleted"
                                                variant='outlined'
                                                className="w-f"
                                                onChange={(e) => setIsActive(e.target.value)}
                                            >
                                                <MenuItem value={true}>Active</MenuItem>
                                                <MenuItem value={false}>InActive</MenuItem>
                                            </Select>
                                            </FormControl>

                                        </div>
                                        <br /><br />
                                        <div className="f-flex" style={{ justifyContent: 'space-between' }}>
                                            <div className="w-10"></div>
                                            <button className='w-30' onClick={() => {
                                                params.updateUser(detailData.userId,firstName,lastName,email,isActive)
                                            }} style={{ backgroundColor: colors.primary10 }}>
                                                {
                                                    params.isLoading ? <CircularProgress size={15} sx={{ color: 'white' }} /> : "Update user"
                                                }
                                            </button>
                                        </div>
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
            modalProgress === 1 ? <div className="w-30  white padding" style={{ marginTop: '5%' }}>
                <Typography variant="p" color={colors.primary9} className="t-left">
                    <b>Add Users</b>

                </Typography>
                <br />
                <div style={{ position: 'relative', width: 120, marginTop: '10%', marginBottom: '10%' }}>
                    <img src="../../../icons/person.svg" height={90} width={90} style={{ backgroundColor: colors.primary1, padding: 10, borderRadius: 90 }} />
                    <IconButton style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: colors.primary10 }} size="large">
                        <Add sx={{ color: 'white' }} />
                    </IconButton>
                    <br />


                </div>
                <div className="t-left">
                    <p className=' t-l'>Username</p>
                    <input type={'text'} placeholder='username' className='w-f' />
                    <p className=' t-l' >Email</p>
                    <input type={'email'} placeholder='email' className='w-f' />
                    <p className=' t-l'>Password</p>
                    <input type={'password'} placeholder='username' className='w-f' />
                    <p className=' t-l' >Confirm password</p>
                    <input type={'password'} placeholder='password' className='w-f' />
                </div>
                <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <Button variant={'text'} className="mrit" onClick={() => setModal(false)}>Cancel</Button>
                    <Button variant={'contained'} disableElevation style={{ padding: '0 15%' }} style={{ backgroundColor: colors.primary10 }}>Save</Button>
                </div>
            </div> :
                <div className="w-30  white padding" style={{ marginTop: '5%' }}>
                    <Typography variant="p" color={colors.primary9} className="t-left">
                        <b>Edit Users</b>

                    </Typography>
                    <br />
                    <div style={{ position: 'relative', width: 120, marginTop: '10%', marginBottom: '10%' }}>
                        <img src="../../../icons/person.svg" height={90} width={90} style={{ backgroundColor: colors.primary1, padding: 10, borderRadius: 90 }} />
                        <IconButton style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: colors.primary10 }} size="large">
                            <Add sx={{ color: 'white' }} />
                        </IconButton>
                        <br />


                    </div>
                    <div className="t-left">
                        <p className=' t-l'>Username</p>
                        <input type={'text'} placeholder='username' className='w-f' />
                        <p className=' t-l' >Email</p>
                        <input type={'email'} placeholder='email' className='w-f' />
                    </div>
                    <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                        <Button variant={'text'} className="mrit" onClick={() => setModal(false)}>Cancel</Button>
                        <Button onClick={() => { }} variant={'contained'} disableElevation style={{ padding: '0 15%' }} style={{ backgroundColor: colors.primary10 }}>Save</Button>
                    </div>
                </div>
        }

    </center>
</Modal>
        </div >
        
    )
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.sendDataReducer.isLoading,
        success: state.sendDataReducer.success,
        error: state.sendDataReducer.error,
        data: state.sendDataReducer.data,
        modalVisible: state.ModalReducer.visible,
        screen: state.ModalReducer.screen,
        progress: state.ModalReducer.progress,
        someValue: state.ModalReducer.someValue
    }
}
const mapDispatchTopProps = (dispatch) => {
    return {
        setMessage: (message) => dispatch(setDataReducer(false, message, null, null)),
        loadAdmins: () => dispatch(loadAdmins()),
        loadEncouters: (id) => dispatch(loadEncouters(id)),
        changeModalState: (visible, screen, progress, someValue) => dispatch(setModalReducer(visible, screen, progress, someValue)),
        updateUser:(id,firstname,lastname,email,status)=>dispatch(updateAdmin(id,firstname,lastname,email,status))





    }
}
export default connect(mapStateToProps, mapDispatchTopProps)(AdminScreen)