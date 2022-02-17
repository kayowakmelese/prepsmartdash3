import { MODAL } from "../action/type";

const initialState={
    visible:false,
    screen:1,
    progress:1,
    someValue:null
}
const ModalReducer=(state=initialState,action)=>{
    switch(action.type){
        case MODAL:
            return {
               visible:action.visible,
               screen:action.screen,
               progress:action.progress,
               someValue:action.someValue

            }
        default: return state;
    }
}
export default ModalReducer