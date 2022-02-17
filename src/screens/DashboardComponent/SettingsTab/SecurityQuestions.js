import { IconButton,Typography,Button } from '@mui/material';
import * as React from 'react'
import { connect } from 'react-redux';
import { loadSecurityQuestions, setModalReducer } from '../../../action';
import LoadingData from '../../../components/loadingData';
import moment from 'moment'
import {colors} from '../../../styles/index'
import NoItemFound from '../../../components/NoItemFound';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const SecurityQuestionScreen=(params)=>{
    const [data,setData]=React.useState(null)
    
    const [page,setPage]=React.useState(1)
    const [pagerCount,setPagerCount]=React.useState(null)
    React.useEffect(()=>{
        if(params.success){
            if(params.success.type==="SECURITYQUESTIONS"){
                let dd=params.data.reverse();
                setData(dd)
                setPagerCount(parseInt(dd.length/10))
            }
        }
    },[params.success])
    React.useEffect(()=>{
        params.loadSecurityQ()
    },[])
    return  <div className="w-f">
     <div className="w-f flex" style={{justifyContent:'space-between'}}>
        <Typography variant="h5" style={{alignSelf:'center',justifyContent:'center',alignContent:'center'}}>List security questions</Typography>
        <Button color={'primary'} onClick={()=>params.changeModalState(true,4,1,null)} style={{backgroundColor:colors.primary10,color:'white',alignContent:'center',alignSelf:'center'}} className="flex">
       <p style={{fontSize:20,paddingRight:10}}> + </p> 
        New question</Button>
    </div>
       <br/><br/>
    {
        data?<div> <table className="w-f">
        <tr className="eee">
            <th className="w-5 padding">#</th>
            <th className="w-30">Description(en)</th>
            
            <th className="w-30">Description(es)</th>
            <th className="w-10">Status</th>
            <th className="w-10">Creation Date</th>

            <th className="w-5">Action</th>
        </tr>
        {data.map((dat,o)=>{
            let id=dat.id;
                return   o <=page*10 && o >=(page*10)-10?<tr style={{borderBottom:'1px solid #222 !important'}}>
            <td className="padding">{o+1}</td>
            <td className="padding">{dat.en}</td>
            <td className="padding">{dat.es}</td>
            <td className='padding'>
                             <p className={`${dat.isActive?'green':'red'}`}>
                            <Typography color={dat.isActive?'green':'orangered'} variant={'p'} sx={{color:dat.isActive?'green !important':'orangered !important',borderColor:dat.isOnCycle?'green':'red',borderWidth:1}} >{dat.isActive?"Active":"Deactive"}</Typography>
            </p>
                         </td>
            <td className="padding">{moment(dat.createdDate).format('MMM DD ,HH:MM a')}</td>
            <td className="f-flex padding" style={{alignSelf:'center',justifyContent:'center'}}>
                <IconButton onClick={()=>{params.changeModalState(true,4,2,{id:dat.id,value:dat.en,es:dat.es,status:dat.isActive})}}><img src={`${process.env.PUBLIC_URL}/icons/edit.svg`} height={20} width={20}/></IconButton>

                <IconButton onClick={()=>{params.changeModalState(true,6,3,{id:dat.id,value:dat.value})}}><img src={`${process.env.PUBLIC_URL}/icons/delete.svg`} height={20} width={20}/></IconButton>
            </td>
        </tr>:null
            })
       }
       
    </table>

    <Stack spacing={0}>
      <Pagination count={pagerCount} color={'primary'} variant="outlined" shape="rounded" page={page} onChange={(event,value)=>setPage(value)} />
      </Stack>
      </div>
    :params.isLoading?<LoadingData/>:<NoItemFound/>
    }
   
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
        loadSecurityQ:()=>dispatch(loadSecurityQuestions()),
        changeModalState:(visible,screen,progress,someValue)=>dispatch(setModalReducer(visible,screen,progress,someValue))
    }
}
export default connect(mapStateToProps,mapDispatchTopProps)(SecurityQuestionScreen)