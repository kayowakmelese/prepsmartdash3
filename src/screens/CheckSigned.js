import * as React from 'react'

import { checkSigned, checkSignedFromReducer } from '../functions/checkSigned'
import {connect} from 'react-redux'
 const CheckSigned=(params)=>{
    React.useEffect(()=>{
        if(checkSigned() || checkSignedFromReducer(params.udata)){
            window.location.href="/home"
        }else{
            window.location.href="/"
        }
    },[])
    return null
}
const mapStateToProps=(state)=>{
    return {
        isLoading:state.sendDataReducer.isLoading,
        success:state.sendDataReducer.success,
        error:state.sendDataReducer.error,
        
        uisLoading:state.userInformationReducer.isLoading,
        usuccess:state.userInformationReducer.success,
        uerror:state.userInformationReducer.error,
        udata:state.userInformationReducer.data
    }
}
const mapDispatchTopProps=(dispatch)=>{
    return {

    }
}
export default connect(mapStateToProps,mapDispatchTopProps)(CheckSigned)