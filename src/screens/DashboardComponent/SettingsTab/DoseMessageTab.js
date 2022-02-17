import * as React from 'react'
import { connect } from 'react-redux';
import { addBatchSecurityQuestion, addBatchSexType,getAllDoseMessage, addSecurityQuestions,editSecurityQuestion, addSexType, setDataReducer, editSexType,setModalReducer,deleteSexType,deleteSecurityQuestion } from '../../../action';
import { colors } from '../../../styles';
import LoadingData from '../../../components/loadingData';
import { IconButton,Typography,Button } from '@mui/material';
import moment from 'moment'
import NoItemFound from '../../../components/NoItemFound';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const DoseMessageScreen=(params)=>{
    const [data,setData]=React.useState(null)
    
    const [page,setPage]=React.useState(1)
    const [pagerCount,setPagerCount]=React.useState(null)
    React.useEffect(()=>{
        if(params.success){
            if(params.success.type==="DOSEMESSAGES"){
                setData(params.data)
                setPagerCount(parseInt(params.data.length/10))
            }
        }
    },[params.success])
    React.useEffect(()=>{
        params.loadAllDoseMessages();
    },[])
    return <div className="w-f">
       <div className="w-f flex " style={{justifyContent:'space-between',alignContent:'center'}}>
        <Typography variant="h5">List Dose Messages</Typography>
        <Button color={'primary'} onClick={()=>{
            params.changeModalState(true,10,1,null)
        }} style={{backgroundColor:colors.primary10,color:'white',alignItems:'center',alignSelf:'center'}} className="flex">
       <p style={{fontSize:20,paddingRight:10}}> + </p> 
        New Dose message</Button>
    </div>
    <br/><br/>
   {data && data.length>0? <div><table className="w-f">
        <tr className="eee">
            <th className="w-10 padding">#</th>
            <th className="w-20">Name(en)</th>
            <th className="w-20">Name(es)</th>
            <th className="w-20">Status</th>
            <th className="w-20">Crreation date</th>
            <th className="w-5">Actions</th>
        </tr>
        {data.map((dat,o)=>{
                return  o<=page*10 && o>=(page*10)-10?<tr style={{borderBottom:'1px solid #222 !important'}}>
            <td className="padding">{o+1}</td>
            <td className='padding'>{dat.en}</td>
            <td className="padding" >{dat.es}</td>
            <td className='padding'>
                             <p className={`${dat.isActive?'green':'red'} w-30`}>
                            <Typography color={dat.isActive?'green':'orangered'} variant={'p'} sx={{color:dat.isActive?'green !important':'orangered !important',borderColor:dat.isOnCycle?'green':'red',borderWidth:1}} >{dat.isActive?"Active":"Deactive"}</Typography>
            </p>
                         </td>
                         <td className="padding">{moment(dat.createdDate).format("MM/DD/YYYY")}</td>
            <td className="f-flex padding" style={{alignSelf:'center',justifyContent:'center'}}>
                <IconButton onClick={()=>{params.changeModalState(true,10,2,{value:dat.en,es:dat.es,id:dat.id})}}><img src={`${process.env.PUBLIC_URL}/icons/edit.svg`} height={20} width={20}/></IconButton>

                <IconButton onClick={()=>{params.changeModalState(true,11,1,{id:dat.id})}}><img src={`${process.env.PUBLIC_URL}/icons/delete.svg`}  height={20} width={20}/></IconButton>
            </td>
        </tr>:null
            })
        }
       
    </table>
    <Stack spacing={0}>
      <Pagination count={pagerCount} color={'primary'} variant="outlined" shape="rounded" page={page} onChange={(event,value)=>setPage(value)} />
      </Stack>
    </div>:params.isLoading?<LoadingData/>:<NoItemFound/>
}
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
        setMessage:(message)=>dispatch(setDataReducer(false,message,null,null)),
        loadAllDoseMessages:()=>dispatch(getAllDoseMessage()),
        changeModalState:(visible,screen,progress,someValue)=>dispatch(setModalReducer(visible,screen,progress,someValue))


   

    }
}
export default connect(mapStateToProps,mapDispatchTopProps)(DoseMessageScreen)