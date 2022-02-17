import { SENDDATA } from "../action/type";

const initialState={
    isLoading:false,
    data:null,
    error:null,
    success:null
}
const sendDataReducer=(state=initialState,action)=>{
    switch(action.type){
        case SENDDATA:
            return {
                isLoading:action.isLoading,
                error:action.error,
                success:action.success,
                data:action.data

            }
        default: return state;
    }
}
export default sendDataReducer