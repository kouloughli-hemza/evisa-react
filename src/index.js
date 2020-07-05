import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import auth from "./store/reducers/auth";
import {Provider} from "react-redux";
import evisa from "./store/reducers/evisa";
import evisaValidator  from './store/reducers/validator/evisa';
import nationalities from "./store/reducers/evisaData/nationalities";
import evisaTypes from "./store/reducers/evisaData/evisaTypes";
import traveller from "./store/reducers/validator/traveller";
import evisaSettings from "./store/reducers/evisaData/evisaSettings";
import '@shopify/polaris/styles.css';
import evisaRequests from "./store/reducers/evisaRequests";
import destinations from "./store/reducers/evisaData/destinations";
import agencies from "./store/reducers/evisaData/agencies";
import evisaRequest from "./store/reducers/EvisaRequest";
import evisaActions from "./store/reducers/evisaActions";



const rootReducer = combineReducers({
    auth : auth,
    evisa : evisa,
    nationalities : nationalities,
    evisaTypes: evisaTypes,
    travellerValidator : traveller,
    evisaValidator : evisaValidator,
    evisaSettings : evisaSettings,
    evisaRequests : evisaRequests,
    evisaDetails : evisaRequest,
    evisaAction : evisaActions,
    evisaDestinations : destinations,
    evisaAgencies : agencies
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
