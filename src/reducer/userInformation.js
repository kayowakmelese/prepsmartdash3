import { SENDDATA,SIGNIN } from "../action/type";

const initialState={
    isLoading:false,
    data:null,
    error:null,
    success:null
}
const userInformationReducer=(state=initialState,action)=>{
    switch(action.type){
        case SIGNIN:
            return {
                isLoading:action.isLoading,
                error:action.error,
                success:action.success,
                data:action.data

            }
        default: return state;
    }
}
export default userInformationReducer