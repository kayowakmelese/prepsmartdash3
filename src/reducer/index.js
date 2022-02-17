import { combineReducers } from "redux";
import sendDataReducer from "./sendDataReducer";
import userInformationReducer from './userInformation'
import ModalReducer from './ModalReducer'
const rootReducer=combineReducers({
    sendDataReducer,userInformationReducer,ModalReducer
})

export default rootReducer