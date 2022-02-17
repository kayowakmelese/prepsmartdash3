import * as React from 'react'
import {TextField,InputAdornment,Button,Box,Tabs,Tab,Typography,IconButton,Modal,Select,MenuItem, Chip} from '@material-ui/core'
import {Add, Search,ChevronLeft} from '@mui/icons-material'
import { colors } from '../../../styles'
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Checkbox } from '@mui/material';



const TeamScreen=(params)=>{
    const [tabvalue,setTabValue]=React.useState(1)
    const [modalProgress,setModalProgress]=React.useState(4);
    const [modal,setModal]=React.useState(false);
    const [screen,setScreen]=React.useState(1);
    const [selectedChips,setSelectedChips]=React.useState(["fff","ffff"])
    const columns2 = [
        { field: 'id', headerName: '#', width: 70 },
        { field: 'roles', headerName: 'Roles', width: 130 },
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
<Typography color={'green'} variant={'p'} sx={{color:'green !important',borderColor:'green',borderWidth:1}} >Active</Typography>
            </div>:
            <div className="red">
            <Typography variant={'p'} color={'red'} sx={{color:'green !important'}}>Deactive</Typography>
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
              <IconButton onClick={()=>{}}>
              <img src="../../../icons/edit.svg" height={20} width={20} style={{alignSelf:'center'}}/>
              </IconButton>
            

            </div></center>
          )
        }
      ];
      const column3=[
          {
              field:'id',headerName:'#',width:50
          },
          {
            field:'code',headerName:'Code',width:70
        },
        {
            field:'name',headerName:'Name',width:200,
            renderCell:(params)=>(
                <div className="f-flex">

<Avatar>KM</Avatar>
<p style={{alignSelf:'center',marginLeft:'10px'}}>{params.value}</p>
                </div>
            )
        }
        ,{
            field:'email',headerName:'Email',width:200
        }
        ,{
            field:'phone',headerName:'Phone number',width:100
        }
        ,{
            field:'DateAdded',headerName:'Date added',width:100
        },
        {
            field:'last',headerName:'Last login',width:100
        },
        {
            field:'role',headerName:'Role',width:100
        },
        {
            field:'status',headerName:'Status',width:100,
             renderCell:(params)=>(
            params.value==='active'?<div className="green">
<Typography color={'green'} variant={'p'} sx={{color:'green !important',borderColor:'green',borderWidth:1}} >Active</Typography>
            </div>:
            <div className="red">
            <Typography variant={'p'} color={'red'} sx={{color:'green !important'}}>Deactive</Typography>
            </div>
          ),
          
        },
        {
            field:'action',headerName:'Action',width:100,
            renderCell:(params)=>(
                <center>
                <div style={{alignContent:'center',justifyContent:'space-around',alignSelf:'center'}}>
                  <IconButton onClick={()=>{}}>
                  <img src="../../../icons/edit.svg" height={20} width={20} style={{alignSelf:'center'}}/>
                  </IconButton>
                
    
                </div></center>
              )
        }
      ]
      
      const rows = [
        { id: 1,name:'kayowak melese', DateAdded: 'Jon', code: 35,status:'active',action:true,phone:'+1234567890',email:'kayomelese4@gmail.com',last:'today',role:'user' }
        ,{ id: 2,name:'kayowak melese',  DateAdded: 'Jon', code: 35,status:'active',action:true,phone:'+1234567890',email:'kayomelese4@gmail.com',last:'today',role:'user' }
        ,{ id: 3,name:'kayowak melese',  DateAdded: 'Jon', code: 35,status:'deactive',action:true,phone:'+1234567890',email:'kayomelese4@gmail.com',last:'today',role:'user' }
        ,{ id: 4,name:'kayowak melese',  DateAdded: 'Jon', code: 35,status:'active',action:true,phone:'+1234567890',email:'kayomelese4@gmail.com',last:'today',role:'user' }
        ,{ id: 5,name:'kayowak melese',  DateAdded: 'Jon', code: 35,status:'active',action:true,phone:'+1234567890',email:'kayomelese4@gmail.com',last:'today',role:'user' }
        ,{ id: 6,name:'kayowak melese',  DateAdded: 'Jon', code: 35,status:'active',action:true,phone:'+1234567890',email:'kayomelese4@gmail.com',last:'today',role:'user' }
        ,{ id: 7,name:'kayowak melese',  DateAdded: 'Jon', code: 35,status:'active',action:true,phone:'+1234567890',email:'kayomelese4@gmail.com',last:'today',role:'user' }
        
      ];

    return (
        <div className="w-f padding">
           <Box sx={{borderBottom:1,borderColor:colors.primary4}}>
              <Tabs value={tabvalue} onChange={(n,e)=>{console.log("eee",e);setTabValue(e)}}  indicatorColor="primary">
                <Tab label="Members" value={1}/>
                <Tab label="Role access" value={2}/>
              </Tabs>
              
            </Box>
            <div className="padding w-f">
            {
                tabvalue===1?
                <div className="w-f">
                <div className="f-flex" style={{justifyContent:'space-between'}}>
                <TextField sx={{border:'none',paddingHorizontal:20}} variant={'outlined'} placeholder={'search'} InputProps={{startAdornment:(
                    <InputAdornment position={'start'}>
                        <Search/>
                    </InputAdornment>
                )}}/>
                <Button onClick={()=>{setModal(true)}} disableElevation={true} style={{backgroundColor:colors.primary10,color:'white'}} className={'mat-btn'} variant={'filled'}>Add</Button>
            </div>
            <br/>
            <div className="w-f" style={{overflowX:'scroll'}}>
             <table style={{width:1300}}>
                    <tr className="eee">
                        <th className="w-5 padding">#</th>
                        <th className="w-5">Code</th>
                        <th className="w-20">Name</th>
                        <th className="w-10">Email</th>
                         <th className="w-10">Phone number</th>
                        <th className="w-10">Date added</th>
                        <th className="w-10">Last login</th>
                         <th className="w-10">Role </th>
                        <th className="w-5">Status</th>
                        <th className="w-5">Action</th>
                    </tr>
                   {
                     [1,1,1,1,1,1,1].map((dat,i)=>{
                       return  <tr>
                    <td className="padding">1</td>
                    <td className="padding">35</td>
                     <td className="f-flex padding"><Avatar color={'primary'}>KM</Avatar><p style={{alignSelf:'center',marginLeft:10}}>Kayowak melese</p></td>
                     <td>kayomelese4@gmail.com</td>
                      <td className="padding">+251949490003</td>
                       <td className="padding">today</td>
                         <td className="padding">13 Dec 2021</td>
                         <td className="padding">user</td>
                         <td>
                             <div className="green w-50">
                            <Typography color={'green'} variant={'p'} sx={{color:'green !important',borderColor:'green',borderWidth:1}} >Active</Typography>
            </div>
                         </td>
                         <td>
                           <center>
                <div style={{alignContent:'center',justifyContent:'space-around',alignSelf:'center'}}>
                  <IconButton onClick={()=>{}}>
                  <img src="../../../icons/edit.svg" height={20} width={20} style={{alignSelf:'center'}}/>
                  </IconButton>
                
    
                </div></center>
                         </td>
                     
                    </tr>
                     })
                   }
                    </table>
                    </div>
            {/* <DataGrid className="w-f" xs={{minHeight:500}}
        rows={rows}
        columns={column3}
        pageSize={5}
        rowsPerPageOptions={[5]} sx={{height: 800,border:1,borderColor:'#ccc','& .MuiDataGrid-cell':{
                borderBottom:1,borderColor:'#ccc'
            } }}
      /> */}
                </div>: 
                <div className="w-f">
                <div className="f-flex" style={{justifyContent:'space-between'}}>
                <TextField xs={{border:'none',paddingHorizontal:20}} variant={'outlined'} placeholder={'search'} InputProps={{startAdornment:(
                    <InputAdornment position={'start'}>
                        <Search/>
                    </InputAdornment>
                )}}/>
                <Button onClick={()=>setModal(true)} disableElevation={true} style={{backgroundColor:colors.primary10,color:'white'}} className={'mat-btn'} variant={'filled'}>Add</Button>
            </div>
            {
              screen===1?
              <table className="padding border" style={{minWidth:'100%'}}>
             <tr className="eee">
               <th className="padding">#</th>
               <th>Role</th>
               <th colSpan={6}>Feature 1</th>
               <th colSpan={5}>Feature 2</th>
             </tr>
             <tr className="padding">
               <td className="padding"></td>
               <td className="td-b"></td>
               <td className="td-b padding">All</td>
               <td>Section 1</td>
               <td>Section 2</td>
               <td>Section 3</td>
               <td>Section 4</td>
               <td>Section 5</td>
               <td className="td-b padding">All</td>
               <td>Section 1</td>
               <td>Section 2</td>
               <td>Section 3</td>
               <td>Section 4</td>
               <td>Section 5</td>
             </tr>
            {
              [0,1,2,4,5].map((dat,i)=>{
                return <tr onClick={()=>setScreen(2)} className="padding tr b-t" style={{padding:'10px'}}>
                  <td className="padding">{i+1}</td>
                  <td>Admin</td>
                  {
                    [0,1,2,3,4,5].map((da,i)=>{
                      return <td style={{alignSelf:'center',justifyContent:'center',alignContent:'center'}}><center><Checkbox color={'primary'} checked={i%2===0?true:false}/></center></td>
                    })
                  }
                </tr>
              })
            }
             <tr>

             </tr>
           </table>:
          <div>
          <div className="f-flex">
            <IconButton onClick={()=>setScreen(1)}>
              <ChevronLeft/>
            </IconButton>
            <Typography variant={'p'} style={{alignSelf:'center',marginLeft:'2%'}}>
              <b>Admin</b>
            </Typography>
            </div>
            <div className="f-flex">
              <div className="w-30 border radius padding">
                <div className="f-flex" style={{justifyContent:'space-between'}}>
                 <Typography variant="p">
                   <b>Description</b>
                 </Typography>
                 <Typography variant="p">
                   Edit
                 </Typography>

                </div>
                <Typography variant="p" style={{fontSize:13,marginTop:5}}>
                sed do eiusmod tempor incididunt ut labore et dolore mag

na aliqua. Ut enim ad minim veniam, quis nostrud
exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in repre

henderit in voluptate velit esse cillum dolore eu fugiat
nulla pariatur.

ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in repre

henderit in voluptate velit esse cillum dolore eu fugiat
nulla pariatur
                </Typography>
              </div>
              <div className="w-70 border radius padding" style={{marginLeft:'3%'}}>
              <Typography variant="p">
                <b>Access</b>
                <div className="w-f padding" style={{justifyContent:'space-evenly'}}>
                  {
                    [1,2,3,4,5,6,7,8,9,10,12,11].map((dat,i)=>{
                      return <Button className="w-30 f-flex padding" style={{marginBottom:'20px',justifyContent:'space-evenly'}}>
                      <Checkbox color={'primary'} checked={i%2===0?true:false}/>
                        <p>ACCESS{i}</p>
                      </Button>
                    })
                  }
                </div>
              </Typography>
              </div>
            </div>
            <br/><br/>
            <DataGrid className="w-f" xs={{minHeight:500}}
        rows={rows}
        columns={column3}
        pageSize={5}
        rowsPerPageOptions={[5]} sx={{height: 800,border:1,borderColor:'#ccc','& .MuiDataGrid-cell':{
                borderBottom:1,borderColor:'#ccc'
            } }}
      />
          </div>
            }
          
         
         
                </div>

            }
            </div>
              <Modal open={modal} style={{overflow:'scroll',height:'100%'}}>
            <center>
            <div  className="padding" style={{ marginTop: '5%' }}>
                {
                  modalProgress===1?
                  <div className="white w-50">
                    <Typography variant="p" color={colors.primary9} className="t-left">
                        <b className="left-r">Add New User</b>

                    </Typography>
                    <div style={{position:'relative',width:'120px',marginTop:'5%',marginBottom:'2%',alignSelf:'left',justifyContent:'space-around'}}>
                   <img src="../../../icons/person.svg" height={90} width={90} style={{backgroundColor:colors.primary1,padding:10,borderRadius:90}}/>
                  <IconButton style={{position:'absolute',bottom:0,right:0,backgroundColor:colors.primary10}} size="large">
                      <Add sx={{color:'white'}} />
                  </IconButton>
                  <br/>
                 
                   </div>
                    <br />

                    <div className="t-left m-top f-flex">
                        <div className="w-50">
                        <TextField label="Username" variant="outlined" type="text" className="w-f"/>
                        <br/><br/>
                        <TextField label="Lastname" variant="outlined" type="text" className="w-f"/>
                        <br/><br/>
                        <TextField label="Email" variant="outlined" type="email" className="w-f"/>
                        <br/><br/>
                        <TextField label="Confirm email" variant="outlined" type="email" className="w-f"/>
                        <br/><br/>
                       
                        </div>
                        <div className="p-h w-50">
                            <TextField variant={'outlined'} className="w-f divider" label="Phone number"/>
                            <br/><br/>
                            <TextField variant={'outlined'} className="w-f divider" type="password" label="set Password"/>
                            <br/><br/>
                            <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={20}
    label="Age"
    className="w-f"
    variant="outlined"
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
                        </div>
                    </div>
                    <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <Button variant={'text'} className="mrit" onClick={() => setModal(false)}>Cancel</Button>
                    <Button variant={'contained'} disableElevation style={{ padding: '0 15%' }} style={{ backgroundColor: colors.primary10,color:'white' }}>Save</Button>
                </div>
                </div>:modalProgress===2?
                <div className="padding w-30 white">
                    <p className="left-r">Add users</p>
                    <br/><br/>
                  
                  <div className="w-f shadow left-r" style={{justifyContent:'left'}}>
                    {[0,1,2,3].map((dat,i)=>{
                      return <div className="w-30 left-r" style={{padding:5,alignItems:'left',justifyContent:'left'}}>
                      <Chip label="kayo melese" avatar={<Avatar color={'primary'}>KM</Avatar>} onClick={(e)=>{
                        let xx=selectedChips;
                        xx.push("kayo");
                        
                        console.log(xx);
                      setSelectedChips(xx)}}/></div>
                    })}
                  </div>
                  <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <Button variant={'text'} className="mrit" onClick={() => setModal(false)}>Cancel</Button>
                    <Button variant={'contained'} disableElevation style={{ padding: '0 15%' }} style={{ backgroundColor: colors.primary10,color:'white' }}>Save</Button>
                </div>
                </div>:
                <div className="padding w-30 white">
                    <p className="left-r">Add users</p>
                    <br/><br/>
                    <TextField label="Role Name" placeholder="Enter a name" variant="outlined" className="w-f"/>
                    <br/><br/>
                    <TextField label="Description" placeholder="Add a brief description" variant="outlined" multiline={true} numOfLines={5} className="w-f"/>
                    <br/><br/>
                    <Typography variant="h5" className="left-r">
                    <b>Access</b>
                    </Typography>
                    <div className="w-f padding" style={{justifyContent:'space-evenly'}}>
                  {
                    [1,2,3,4,5,6,7,8,9,10,12,11].map((dat,i)=>{
                      return <Button className="w-30 f-flex padding" style={{marginBottom:'20px',justifyContent:'space-evenly'}}>
                      <Checkbox color={'primary'} checked={i%2===0?true:false}/>
                        <p>ACCESS{i}</p>
                      </Button>
                    })
                  }
                </div>
                    
                 
                  <div className="f-flex m-top" style={{ justifyContent: 'right' }}>
                    <Button variant={'text'} className="mrit" onClick={() => setModal(false)}>Cancel</Button>
                    <Button variant={'contained'} disableElevation style={{ padding: '0 15%' }} style={{ backgroundColor: colors.primary10,color:'white' }}>Done</Button>
                </div>
                </div>
                }
                </div>

              



            </center>
        </Modal>
        </div>
    )
}
export default TeamScreen