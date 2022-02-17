import { Box, Button, IconButton, MenuItem, Modal, Radio, RadioGroup, Select, Tab, Tabs, TextField,FormControl } from '@material-ui/core';
import { ArrowRight } from '@mui/icons-material';
import * as React from 'react'
import { colors } from '../../../styles';


const NotificationsScreen=(params)=>{
    const [modal,setModal]=React.useState(false)
    const [tabvalue,setTabValue]=React.useState(1)
    const [modalScreen,setModalScreen]=React.useState(1)    
    return <div className="w-f padding">
           <Box sx={{borderBottom:1,borderColor:colors.primary4}}>
              <Tabs value={tabvalue} onChange={(n,e)=>{console.log("eee",e);setTabValue(e)}}>
                <Tab label="Notifications" value={1}/>
                <Tab label="Scheduled Notifications" value={2}/>
              </Tabs>
              
            </Box>
            <div className="f-flex" style={{justifyContent:'right'}}>
              
              <Button onClick={()=>{setModal(true)}} disableElevation={true} style={{backgroundColor:colors.primary10,color:'white'}} className={'mat-btn'} variant={'filled'}>Add</Button>
          </div>
          {
              tabvalue===1?
              <table className="w-70">
                    <tr className="eee">
                        <th className="w-10 padding">#</th>
                        <th className="w-10">Code</th>
                        <th className="w-20">Title</th>
                        <th className="w-20">Description</th>
                        <th className="w-10">Date</th>
                        <th className="w-10">Time</th>
                        <th className="w-10">Action</th>
                    </tr>
                    {
                        [0,1,2,2,2,2,2,2,2,2].map((dat,o)=>{
                            return  <tr style={{borderBottom:'1px solid #222 !important'}}>
                        <td className="padding">1</td>
                        <td>0023</td>
                        <td>Notification title Here</td>
                        <td>Description here</td>
                        <td>23/03/2021</td>
                        <td>12:23 pm</td>
                        <td className="f-flex padding" style={{alignSelf:'center',justifyContent:'center'}}>
                           
                            <IconButton onClick={()=>{setModal(true);}}><img src='../../icons/delete.svg' height={20} width={20}/></IconButton>
                        </td>
                    </tr>
                        })
                    }
                   
                </table>:
                <table className="w-70">
                    <tr className="eee">
                        <th className="w-10 padding">#</th>
                        <th className="w-10">Code</th>
                        <th className="w-20">Title</th>
                        <th className="w-20">Description</th>
                        <th className="w-20">Scheduled Date</th>
                        <th className="w-10">Time</th>
                        <th className="w-10">Action</th>
                    </tr>
                    {
                        [0,1,2,2,2,2,2,2,2,2].map((dat,o)=>{
                            return  <tr style={{borderBottom:'1px solid #222 !important'}}>
                        <td className="padding">1</td>
                        <td>0023</td>
                        <td>Notification title Here</td>
                        <td>Description here</td>
                        <td>23/03/2021</td>
                        <td>12:23 pm</td>
                        <td className="f-flex padding" style={{alignSelf:'center',justifyContent:'center'}}>
                           
                            <IconButton onClick={()=>{setModal(true);}}><img src='../../icons/delete.svg' height={20} width={20}/></IconButton>
                        </td>
                    </tr>
                        })
                    }
                   
                </table>
          }
         
          <br/><br/>
          <Modal open={modal} style={{overflow:'scroll',height:'100%'}}>
            <center>
            {
                modalScreen===1?
                <div className="white padding w-30" style={{marginTop:'3%'}}>
                    <p className="left-r">Notification</p>
                    <br/><br/>
                    <Select
    id="demo-simple-select"
    value={10}
    label={'Type'}
    variant='outlined'
    className="w-f"
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
  <br/><br/>
  <TextField label={'Send to'} className="w-f" variant={'outlined'}/>
  <br/><br/>
  <TextField label={'Title'} className="w-f" variant={'outlined'}/>
  <br/><br/>
  <TextField label={'Description'} className="w-f" variant={'outlined'}/>
  <br/><br/>
  <TextField label={'Send to'} className="w-f" variant={'outlined'}/>
<br/><br/>
<RadioGroup name="use-radio-group" defaultValue="first">
<div className='f-flex'>
    <Radio/><p style={{alignSelf:'center',fontSize:'10pt'}}>Schedule now</p>
   
</div>
<div className='f-flex'>
    <Radio/><p style={{alignSelf:'center',fontSize:'10pt'}}>Schedule</p>
   
</div>
<div className="" style={{paddingLeft:'20px'}}>
<div className='f-flex'>
    <Radio/><p style={{alignSelf:'center',fontSize:'10pt'}}>One time</p>
   
</div>
<div className='f-flex'>
   <TextField type="date" variant="outlined" color='primary' style={{marginRight:'5%'}}/>
   <TextField type="time" variant="outlined"  color='primary'/>
   
</div>
<br/>
<div className='f-flex'>
    <Radio checked/><p style={{alignSelf:'center',fontSize:'10pt'}}>Repeat</p>
   
</div>
<div className='f-flex'>
   <TextField type="number" variant="outlined" color='primary' className="w-20" style={{marginRight:'5%'}}/>
   <Select
    id="demo-simple-select"
    value={10}
    label={'Type'}
    variant='outlined'
    className="w-50"
  >
    <MenuItem value={10}>days</MenuItem>
    <MenuItem value={20}>months</MenuItem>
    <MenuItem value={30}>years</MenuItem>
  </Select>
   
</div>
<br/><br/>
<FormControl label="" className="f-flex w-f" variant="outlined">
<div className="f-flex padding border radius w-70" style={{justifyContent:'center'}}>
{/* <MobileDatePicker
          label="Date mobile"
          inputFormat="MM/dd/yyyy"
          value={new Date().toISOString()}
          renderInput={(params) => <TextField {...params} />}
        /> */}
            <TextField type="date" className="w-50" />
            <ArrowRight style={{alignSelf:'center'}}/>
            <TextField type="date" className="w-50"/ >
            </div>
</FormControl>
<div>

</div>
</div>
 
</RadioGroup>
                </div>:null
            }
            </center>
          </Modal>
          
    </div>
}
export default NotificationsScreen;