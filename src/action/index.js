import {SENDDATA, SIGNIN,MODAL} from './type'
import axios from "axios";
import ls from 'local-storage';
import { IP, PORT } from '../ip_config'
axios.interceptors.request.use(
    async config => {
       // const token = await AsyncStorage.getItem('token')
    //    if (token) {
            //config.headers.Authorization = "Bearer " + token;
            config.headers.Authorization = "Bearer "+ls("accessToken");
        // } else {
        //     console.log("no token")
        // }
        return config
    }
)

export const setReducer=(isLoading,error,success,data)=>{
    return {
        type:SENDDATA,
        isLoading,
        error,success,data
    }
}
export const setDataReducer=(isLoading,error,success,data)=>{
    return dispatch=>{
        
        dispatch(setReducer(isLoading,error,success,data))
        setTimeout(()=>dispatch(setReducer(false,null,null,null),3000))
    }
  
}
export const setModalReducer=(visible,screen,progress,someValue)=>{
    return {
        type:MODAL,
        visible,screen,progress,someValue
    }
}

export const setUserInformation=(isLoading,error,success,data)=>{
    return {
        type:SIGNIN,
        isLoading,
        error,success,data
    }
}
export const dispatchSigned=()=>{
    return dispatch=>{
        dispatch(setUserInformation(false,null,null,ls('data')))
    }
}

export const signIn=(email,password,rememberme)=>{
    return dispatch=>{
        let params={
            email:email,
            password:password
        }
        dispatch(setUserInformation(true,null,null,null))
        axios.post(`https://${IP}/api/admin/signIn`,params).then((data)=>{
            if(data.data){
                if(rememberme){
                    ls("accessToken",data.data.accessToken);
                    ls("refreshToken",data.data.refreshToken);
                    ls("userId",data.data.userId);
                    ls("data",data.data)
                    
                }
                console.log("response",data.data)
                dispatch(setUserInformation(false,null,{type:"SIGNIN",message:"authentication successful!"},data.data))
            }

        }).catch((error)=>{
                dispatch(setUserInformation(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
        })
    }
}
export const createAdmin=(firstname,lastname,password,email)=>{
    return dispatch=>{
        let params={
            firstName:firstname,
            lastName:lastname,
            email:email,
            password:password
        }
        console.log("params",params)
        dispatch(setReducer(true,null,null,null))
        axios.post(`https://${IP}/api/admin/create`,params).then((data)=>{
            if(data.data){
               
                console.log("response",data.data)
                dispatch(setReducer(false,null,{type:"CREATEADMIN",message:"admin Created Successfully!"},data.data))
                dispatch(loadAdmins())
            }

        }).catch((error)=>{
                dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
        })
    }
}
export const logout=()=>{
    return dispatch=>{
        ls.remove("accessToken")
        ls.remove("refreshToken")
        ls.remove("data")
        ls.remove("userId")
        dispatch(setUserInformation(false,null,null,null))
    }
}
export const generateCodes=(number,expdate)=>{
    return dispatch=>{
        let params={
            count:parseInt(number),
            expiryDate:expdate
        }
        dispatch(setReducer(true,null,null,null))
        axios.post(`https://${IP}/api/invitation-code/add`,params).then((data)=>{
            if(data.data){
                dispatch(setReducer(false,null,{type:"INVITATIONREQUEST",message:"Invitation codes created successfully!"},data.data))
            }else{
            
            }
            dispatch(loadGeneratedCodes());
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const resetPassword = (email) => {

    return dispatch => {
        let params={
            email:email
        }
        dispatch(setReducer(true, null, null, null))
        axios.post(`https://${IP}/api/auth/forgot-password`, params).then((data) => {
            if (data.data) {
                console.log("server response", data.data)

                dispatch(setReducer(false,{type:"RESETPASSWORD",message:"password sent to email"}, null, data.data))
            }
        }).catch((e) => {
            console.log("error1", JSON.stringify(e));
            console.log("messsage", handleMessages(e).error);
            dispatch(setReducer(false, null, handleMessages(e).error, null))
        })
    }
}
export const loadGeneratedCodes=()=>{
    return dispatch=>{
        let params={

        }
        dispatch(setReducer(true,null,null,null))
        axios.get(`https://${IP}/api/invitation-code/all`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"INVITATIONCODES",message:null},data.data.invitationCodes))
            }else{
            
            }
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const loadSecurityQuestions=()=>{
    return dispatch=>{
        let params={

        }
        dispatch(setReducer(true,null,null,null))
        axios.get(`https://${IP}/api/lookups/security-questions`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"SECURITYQUESTIONS",message:null},data.data.securityQuestions))
            }else{
            
            }
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const loadAllUsers=()=>{
    return dispatch=>{
        let params={

        }
        dispatch(setReducer(true,null,null,null))
        axios.get(`https://${IP}/api/admin/all/users`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"ALLUSERS",message:null},data.data.users))
            }else{
            
            }
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const promoteUser=(id)=>{
    return dispatch=>{
        let params={
            role:2
        }
        dispatch(setReducer(true,null,null,null))
        axios.post(`https://${IP}/api/admin/user/${id}/update`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"PROMOTEUSER",message:"user promoted to Admin"},data.data))
                dispatch(loadAdmins())
            }else{
            
            }
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const loadMessages=()=>{
    return dispatch=>{
        let params={

        }
        dispatch(setReducer(true,null,null,null))
        axios.get(`https://${IP}/api/sms/messages`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"ALLMESSAGES",message:null},data.data.messages))
            }else{
            
            }
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const loadAdmins=()=>{
    return dispatch=>{
        let params={

        }
        dispatch(setReducer(true,null,null,null))
        axios.get(`https://${IP}/api/admin/all/admins`,params,{
            Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJGRU1wcm5sVnJsbjZBWWM2a0lxcGYiLCJpYXQiOjE2NDI2MjAxMTk2ODYsImV4cCI6MTY0MjcwNjUxOTY4Nn0.oebR4vLN8lhtclkNLijwdU6sfQ22ekw7q-PCPus-Jk0'
        }).then((data)=>{
            if(data.data){
                console.log("datadata3",data.data)
                dispatch(setReducer(false,null,{type:"ALLADMINS",message:null},data.data.admins))
            }else{
            
            }
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const loadEncouters=(id)=>{
    return dispatch=>{
        let params={

        }
        dispatch(setReducer(true,null,null,null))
        axios.get(`https://${IP}/api/admin/user/${id}/encounter`,params,{
            headers:{
                'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJGRU1wcm5sVnJsbjZBWWM2a0lxcGYiLCJpYXQiOjE2NDI2MjAxMTk2ODYsImV4cCI6MTY0MjcwNjUxOTY4Nn0.oebR4vLN8lhtclkNLijwdU6sfQ22ekw7q-PCPus-Jk0'
            }
        }).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"USERENCOUNTER",message:null},data.data.encounters))
            }else{
            
            }
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const loadSexType=()=>{
    return dispatch=>{
        let params={

        }
        dispatch(setReducer(true,null,null,null))
        axios.get(`https://${IP}/api/lookups/sex-type`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"SEXTYPE",message:null},data.data.sexTypes))
            }else{
            
            }
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const addSexType=(en)=>{
    return dispatch=>{
        let params={
            en:en,
            es:en,
            isActive:true
        }
        dispatch(setReducer(true,null,null,null))
        axios.post(`https://${IP}/api/lookups/sex-type`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"ADDSEXTYPE",message:"sex type added successfully!"},data.data.securityQuestions))
            }else{
            
            }
            dispatch(loadSexType())
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const sendMessage=(to,text)=>{
    return dispatch=>{
        let params={
            to:to,
            text:text
        }
        dispatch(setReducer(true,null,null,null))
        axios.post(`https://${IP}/api/sms/send`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"SENTMESSAGE",message:"Message Sent Successfully"},data.data.sms.message))
                // dispatch(loadMessages())
            }else{
            
            }
            dispatch(loadSexType())
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const addSecurityQuestions=(en)=>{
    return dispatch=>{
        let params={
            en:en,
            es:en,
            isActive:true
        }
        dispatch(setReducer(true,null,null,null))
        axios.post(`https://${IP}/api/lookups/security-questions`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"AddSECURITYQUESTIONS",message:"security questions added successfully!"},data.data.securityQuestions))
            }else{
            
            }
            dispatch(loadSecurityQuestions())
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const addBatchSecurityQuestion=(batch)=>{
    return dispatch=>{
        let xx=[];
        for(var i=0;i<batch.length;i++){
            if(batch[i].value){
                xx.push({
                    en:batch[i].value,
                    es:batch[i].es,
                    isActive:true
                })
            }
        }
        let params={
           questions:xx
        }
        console.log("paramsare",params)
        dispatch(setReducer(true,null,null,null))
        axios.post(`https://${IP}/api/lookups/security-questions/batch`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"AddSECURITYQUESTIONS",message:"security questions added successfully!"},data.data.securityQuestions))
            }else{
            
            }
            dispatch(loadSecurityQuestions())
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const addDoseMessage=(batch,status)=>{
    return dispatch=>{
        let xx=[];
        for(var i=0;i<batch.length;i++){
            if(batch[i].value){
                xx.push({
                    en:batch[i].value,
                    es:batch[i].es,
                    isActive:batch[i].status?batch[i].status:status
                })
            }
        }
        let params= xx[0]
        
        console.log("paramsare",params)
        dispatch(setReducer(true,null,null,null))
        axios.post(`https://${IP}/api/dose-messages/add`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"ADDDOSEMESSAGE",message:"dose message added successfully!"},data.data))
            }else{
            
            }
            dispatch(getAllDoseMessage())
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const editDoseMessage=(value,es,status,id)=>{
    return dispatch=>{
        
        let params={
            id:id,
            
            isActive:status
        }
    if(value){
        params.en=value
    }
    if(es){
        params.es=es;
    }
        console.log("paramsare",params)
        dispatch(setReducer(true,null,null,null))
        axios.put(`https://${IP}/api/dose-messages/update`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"ADDDOSEMESSAGE",message:"dose message added successfully!"},data.data))
            }else{
            
            }
            dispatch(getAllDoseMessage())
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const getAllDoseMessage=()=>{
    return dispatch=>{
      
        let params={
        }
        console.log("paramsare",params)
        dispatch(setReducer(true,null,null,null))
        axios.get(`https://${IP}/api/dose-messages/all`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"DOSEMESSAGES",message:null},data.data.doseMessages))
            }else{
            
            }
            
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const addBatchSexType=(batch)=>{
    return dispatch=>{
        let xx=[];
        for(var i=0;i<batch.length;i++){
            if(batch[i].value){
                xx.push({
                    en:batch[i].value,
                    es:batch[i].es,
                    isActive:true
                })
            }
        }
        let params={
           types:xx
        }
        dispatch(setReducer(true,null,null,null))
        axios.post(`https://${IP}/api/lookups/sex-type/batch`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"ADDSEXTYPE",message:"sex type added successfully!"},data.data.securityQuestions))
            }else{
            
            }
            dispatch(loadSexType())
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const deleteSexType=(id)=>{
    return dispatch=>{
        let params={
        }
        dispatch(setReducer(true,null,null,null))
        axios.delete(`https://${IP}/api/lookups/sex-type/delete/${id}`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"DELETESEXTYPE",message:"sex type deleted successfully!"},data.data))
            }else{
            
            }
            dispatch(loadSexType())
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const deleteDoseMessage=(id)=>{
    return dispatch=>{
        let params={
        }
        dispatch(setReducer(true,null,null,null))
        axios.delete(`https://${IP}/api/dose-messages/delete/${id}`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"DELETEDOSE",message:"dose message deleted successfully!"},data.data))
            }else{
            
            }
            dispatch(getAllDoseMessage())
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const deleteInvitationCode=(id)=>{
    return dispatch=>{
        let params={
        }
        dispatch(setReducer(true,null,null,null))
        axios.delete(`https://${IP}/api/invitation-code/delete/${id}`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"DELETECODE",message:"sex type deleted successfully!"},data.data))
                dispatch(loadGeneratedCodes())
            }else{
            
            }
            dispatch(loadSexType())
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const deleteSecurityQuestion=(id)=>{
    return dispatch=>{
        let params={
        }
        dispatch(setReducer(true,null,null,null))
        axios.delete(`https://${IP}/api/lookups/security-questions/delete/${id}`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"DELETESECURITYQUESTION",message:"security question deleted successfully!"},data.data))
            }else{
            
            }
            dispatch(loadSecurityQuestions())
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const editSecurityQuestion=(value,es,status,id)=>{
    return dispatch=>{
        let params={
            id:id,
            
            isActive:status
        }
        if(es){
            params.es=es
        }
        if(value){
            params.en=value
        }
        console.log("paramsd",params)
        dispatch(setReducer(true,null,null,null))
        axios.put(`https://${IP}/api/lookups/security-questions/update`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"EDITSECURITYQUESTION",message:"security question updated successfully!"},data.data))
            }else{
            
            }
            dispatch(loadSecurityQuestions())
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const updateUser=(id,isActive)=>{
    return dispatch=>{
        let params={
            isActive:isActive
        }
        console.log("paramsd",params)
        dispatch(setReducer(true,null,null,null))
        axios.post(`https://${IP}/api/admin/user/${id}/update`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"UPDATEUSER",message:"user updated successfully!"},data.data))
            }else{
            
            }
            dispatch(loadAllUsers())
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const updateAdmin=(id,firstname,lastname,email,isActive)=>{
    return dispatch=>{
        let params={
            isActive:isActive,
            firstName:firstname,
            lastName:lastname,
            email:email
        }
        console.log("paramsd",params)
        dispatch(setReducer(true,null,null,null))
        axios.post(`https://${IP}/api/admin/user/${id}/update`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"UPDATEAdmin",message:"user updated successfully!"},data.data))
            }else{
            
            }
            dispatch(loadAdmins())
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}
export const editSexType=(value,es,status,id)=>{
    return dispatch=>{
        let params={
            id:id,
            en:value,
            es:es
        }
        console.log("params",params)
        dispatch(setReducer(true,null,null,null))
        axios.put(`https://${IP}/api/lookups/sex-type/update`,params).then((data)=>{
            if(data.data){
                console.log("datadata",data.data)
                dispatch(setReducer(false,null,{type:"EDITEDSEXTYPE",message:"Sex type edited successfully"},data.data))
            }else{
            
            }
            dispatch(loadSexType())
        }).catch((error)=>{
            dispatch(setReducer(false,handleMessages(error).message?handleMessages(error).message:handleMessages(error).error,null,null))
     
        })
    }
}

const handleMessages=(error)=>{
    if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response.data;
    } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        let errar={
            message:"trouble connecting to the server!please try again"
        }
        console.log("requesterror",error.request);
        return errar
    } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Errorb', error.message);
        return error.message
    }
}
