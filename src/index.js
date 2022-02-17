import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MainReducer } from './mainReducer';
import {Provider} from 'react-redux'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';


import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducer/index'
import {colors} from './styles/index'
import { ThemeProvider } from '@emotion/react';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(rootReducer, composeEnhancers(applyMiddleware()))
    const theme=createTheme({
      palette:{
          primary:{
            main:colors.primary10,
            main2:colors.primary5
          },
          secondary:{
            main:colors.primary1
          }
      }
    })
ReactDOM.render(
   <Provider store={store}>
   <ThemeProvider theme={theme}>
   <MainReducer/>
   </ThemeProvider>
    
   </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
