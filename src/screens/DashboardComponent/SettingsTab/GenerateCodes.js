import { Button, CircularProgress, IconButton, TextField ,Typography} from '@mui/material'
import * as React from 'react'
import {connect} from 'react-redux'
import { colors } from '../../../styles'
import moment from 'moment'
import {generateCodes,loadGeneratedCodes, setDataReducer,setModalReducer} from '../../../action/index'
import { getTimeFromMins } from '../../../functions/checkSigned'
import LoadingData from '../../../components/loadingData'
import NoItemFound from '../../../components/NoItemFound'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const GenerateCodes=(params)=>{
    const [codeNumber,setCodeNumber]=React.useState(null)
    const [data,setData]=React.useState(null)
    const [page,setPage]=React.useState(1)
    const [pagerCount,setPagerCount]=React.useState(null)
    React.useEffect(()=>{
        if(params.success){
            if(params.success.type==="INVITATIONCODES"){
                let dd=params.data.reverse();
                setData(dd)
                setPagerCount(parseInt(dd.length/10)+1)
            }
        }
    },[params.success])
    React.useEffect(()=>{
        params.loadCodes();
    },[])
    React.useEffect(()=>{
       console.log("pager",page)
    },[page])
    
    return  <div className="w-f padding">
    <div className="w-f flex " style={{justifyContent:'space-between',alignContent:'center'}}>
        <Typography variant="h5">List Invitations</Typography>
        <Button color={'primary'} onClick={()=>{
            params.changeModalState(true,5,1,null)
        }} style={{backgroundColor:colors.primary10,color:'white',alignItems:'center',alignSelf:'center'}} className="flex">
       <p style={{fontSize:20,paddingRight:10}}> + </p> 
        New invitations</Button>
    </div>
       <br/><br/>
       
       <div className="w-f">
       {data && data.length>0?<div>
       <table className="w-f">
            <tr className="eee">
                <th className="w-5 padding">#</th>
                <th className="w-20">Type</th>
                
                <th className="w-20">Expiration date</th>
                <th className="w-20">Use date</th>
                <th className="w-20">Creation date</th>
                <th className="w-5">Action</th>
            </tr>
       
        {data.map((dat,o)=>{
         return dat.isActive && o <=page*10 && o >=(page*10)-10?<tr key={dat.invitationCodeId} style={{borderBottom:'1px solid #222 !important'}}>
                <td className="padding">{o+1}</td>
                <td className="padding">{dat.invitationCode}
                <IconButton onClick={()=>{navigator.clipboard.writeText(dat.invitationCode);params.setMessage("copied invitation code successfully!")}}>

                <img src={`${process.env.PUBLIC_URL}/icons/copy.svg`} height={20} width={20}/>
                </IconButton>
                </td>
                <td className="padding">{moment(dat.expiryDate).format('MMM DD YYYY')}</td>
               
                <td className="padding  ">{dat.updatedDate?moment(dat.updatedDate).format('MMM DD,YYYY HH:MM'):'--'}</td>
                <td className="padding">{moment(dat.createdDate).format("MMM DD, YYYY,HH:MM")}</td>
                <td className="f-flex padding" style={{alignSelf:'center',justifyContent:'center'}}>
                <IconButton onClick={()=>{params.changeModalState(true,5,2,{value:dat.invitationCode,expDate:dat.expiryDate})}}>

                <img src={`${process.env.PUBLIC_URL}/icons/edit.svg`} height={20} width={20}/>
                </IconButton>
                <IconButton onClick={()=>{params.changeModalState(true,8,1,{id:dat.invitationCode,value:dat.invitationCode})}}>

<img src={`${process.env.PUBLIC_URL}/icons/delete.svg`} height={20} width={20}/>
</IconButton>
                </td>
            </tr>:null
         
                })}
      
       </table>
       <center >
       <Stack spacing={0}>
      <Pagination count={pagerCount} color={'primary'} variant="outlined" shape="rounded" page={page} onChange={(event,value)=>setPage(value)} />
      </Stack>
      </center>
      </div>
       
       :params.isLoading?<LoadingData/>:<NoItemFound/>}
       </div>
    </div>
}
const mapStateToProps=(state)=>{
    return {
        isLoading:state.sendDataReducer.isLoading,
        success:state.sendDataReducer.success,
        error:state.sendDataReducer.error,
        data:state.sendDataReducer.data
    }
}
const mapDispatchTopProps=(dispatch)=>{
    return {
        loadCodes:()=>dispatch(loadGeneratedCodes()),
        generateCode:(numer,date)=>dispatch(generateCodes(numer,date)),
        setMessage:(message)=>dispatch(setDataReducer(false,null,{message:message},null)),
        changeModalState:(visible,screen,progress,someValue)=>dispatch(setModalReducer(visible,screen,progress,someValue))
    }
}
export default connect(mapStateToProps,mapDispatchTopProps)(GenerateCodes)