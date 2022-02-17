import logo from './logo.svg';
import './App.css';
import './styles/main.css'
import { connect } from 'react-redux';
import {setDataReducer} from './action/index'
import * as React from 'react'
import {
  HashRouter as Router,Routes,
  
  Route,
} from "react-router-dom";
import SignInScreen from './screens/signInScreen'
import DashboardScreen from './screens/Dashboard'
import UserScreen from './screens/DashboardComponent/UserTabs/UsersScreen';
import MemberShip from './screens/DashboardComponent/Dashboard/MembershipScreen';
import TeamScreen from './screens/DashboardComponent/TeamTabs/TeamScreen';
import SettingScreen from './screens/DashboardComponent/SettingsTab/SettingScreen';
import NotificationsScreen from './screens/DashboardComponent/NotificationTab/NotificationsScreen';
import GenerateCodes from './screens/DashboardComponent/SettingsTab/GenerateCodes'
import SecurityQuestionScreen from './screens/DashboardComponent/SettingsTab/SecurityQuestions'
import SexTypeScreen from './screens/DashboardComponent/SettingsTab/SexTypeTab'
import AdminScreen from './screens/DashboardComponent/Admins/AdminScreen'
import MessageScreen from './screens/DashboardComponent/messages/index'
import DoseMessageScreen from './screens/DashboardComponent/SettingsTab/DoseMessageTab'

import EncounterScreen from './screens/DashboardComponent/UserTabs/EncounterTab'
function App(props) {
  React.useEffect(()=>{
    props.setData();
  },[])
  return (<div>
    <Router >
    <React.Fragment>
      <Routes>
        <Route path="/" exact element={<SignInScreen/>} />
        <Route path="/home" exact element={<DashboardScreen/>} >
          <Route path={`dashboard`} element={<Dash/>}/>
          <Route path={'user'} element={<UserScreen/>}/>
          <Route path={'membership'} element={<MemberShip/>}/>
          <Route path={'team'} element={<TeamScreen/>}/>
          <Route path={'settings'} element={<SettingScreen/>} />
          <Route path={'notifications'} element={<NotificationsScreen/>} />
          <Route path={'invitations'} element={<GenerateCodes/>}/>
          <Route path={'SecurityQuestion'} element={<SecurityQuestionScreen/>}/>
          <Route path={'Sextype'} element={<SexTypeScreen/>}/>
          <Route path={'admins'} element={<AdminScreen/>}/> 
          <Route path={'encounters'} element={<EncounterScreen/>}/>

          <Route path={'dosemessages'} element={<DoseMessageScreen/>}/>

          <Route path={'messages'} element={<MessageScreen/>}/>


        </Route>
      </Routes>
      </React.Fragment>
    </Router>
    </div>
  );
}
const mapStateToProps=(state)=>{
  return {
    isLoading:state.sendDataReducer.isLoading,
    success:state.sendDataReducer.success,
    error:state.sendDataReducer.error
  }
   
}
const mapDispatchToProps=(dispatch)=>{
  return {

    setData:()=>{dispatch(setDataReducer(false,"yes success","error",[]))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
const Dash=()=>{
  return <h1>this is dashboard</h1>
}