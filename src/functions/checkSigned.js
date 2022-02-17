import ls from 'local-storage'
import moment from 'moment'
export const checkSigned=()=>{
    if(ls('accessToken') && ls('refreshToken') && ls('userId')){
        return true;
    }else{
        return false;
    }
}
export const checkSignedFromReducer=(data)=>{
    if(data){
        if(data.accessToken && data.refreshToken && data.userId){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
   
}
export const  getTimeFromMins=(mins)=>{
    // do not include the first validation check if you want, for example,
    // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
    if (mins >= 24 * 60 || mins < 0) {
        throw new RangeError("Valid input should be greater than or equal to 0 and less than 1440.");
    }
    var h = mins / 60 | 0,
        m = mins % 60 | 0;
    return moment.utc().hours(h).minutes(m).format("hh:mm A");
}

export const searchString=(key,givenArray)=>{
    let arr=[];
    for(var i=0;i<givenArray.length;i++){
      let bool=true;
      let name=null;
      for(var j=0;j<key.length;j++){
        name=givenArray[i].firstName+" "+givenArray[i].lastName;
        if(key.toLowerCase().charAt(j)!==name.toLowerCase().charAt(j)){
            bool=false;
        }else{
        }
      }
      if(bool){

        arr.push(givenArray[i])
      }else{
        console.log("not equal")
      }
    }
    return arr;
  }
  export const validateInput=(batch)=>{
      let bool=false;
      for(var i=0;i<batch.length;i++){
            if(batch[i].value?batch[i].value.trim().length>0:false && batch[i].es?batch[i].es.trim().length>0:false && batch[i].status?batch[i].status.trim().length>0:false){
                bool=true;
            }
      }
      return bool
  }
  export const cleanBatch=(batch)=>{
    let arr=[];
    for(var i=0;i<batch.length;i++){
           batch[i].value=null;
           batch[i].es=null;
           batch[i].status=null;
           
    } 
    return batch;  
  }
  export const checkInputs=(...inputs)=>{
      let bool=false;
      for(let val of inputs){
          if(val && val?val.trim().length>0:false){

          }else{
              bool=false;
          }
      }
      return bool;
  }