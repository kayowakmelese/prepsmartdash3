import * as React from 'react'
import { Cancel, CancelOutlined, Search } from '@mui/icons-material';
import { Box, Button, InputAdornment, Modal, Tab, Tabs, TextField,IconButton,Typography,CircularProgress} from '@material-ui/core';
import {colors} from '../styles/index'
import {connect} from 'react-redux'
const DeleteScreen=(params)=>{
    React.useEffect(()=>{
        console.log("paramsq",params)
    },[])
    return <div className="w-30 white padding-big f-flex" style={{marginTop:'10%'}}>
               <div className="w-5 " style={{paddingRight:10,alignContent:'center'}}>
                    <CancelOutlined color={'red'} style={{color:'red',alignSelf:'center',alignContent:'center'}} size={60}/>
               </div>
               <div className="w-90 left-r ">
                    <Typography variant={'h6'} color={'#222'}>
                    Delete
                    </Typography>
                    
                   <Typography  variant={'p'} color={'#222'} sx={{marginTop:50}}>
                   {
                       params.desc
                   }
                    </Typography>
                   <br/>
               <div className="f-flex m-topbig" style={{ justifyContent: 'right' }}>
                    <button variant={'outlined'} className="mrit w-30" onClick={() => params.cancel()} style={{marginRight:'5%',color:colors.primary10}}>Cancel</button>
                    <button  onClick={()=>params.actions()} className="w-30" disableElevation style={{ backgroundColor: colors.primary10,color:'white' }}>{
                        params.isLoading?<CircularProgress size={15} color={'white'}/>:"Yes"
                    }</button>
                </div>
               </div>

               <br/>
              
           </div>
}
const mapStateToProps=(state)=>{
    return {
        isLoading:state.sendDataReducer.isLoading
    }
}
const mapDispatchTopProps=(state)=>{
    return {

    }
}
export default connect(mapStateToProps,mapDispatchTopProps)(DeleteScreen)