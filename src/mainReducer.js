import {Provider} from 'react-redux'

import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducer/index'
import App from './App';
import thunk from "redux-thunk" 


export const MainReducer=()=>{
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return <Provider store={store}>
        <App/>
    </Provider>

}

