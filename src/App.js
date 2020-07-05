import React, { Component } from 'react';
import SiteFrame from "./components/SIteFrame/SiteFrame";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import { connect } from 'react-redux';
import {AutoLoginUser} from "./store/actions/auth";
import LogOut from "./containers/Auth/LogOut";
import Home from './components/Home/Home';
import Evisa from "./containers/Evisa/Evisa";
import EvisaRequests from "./containers/EvisaRequests/EvisaRequests";
import EvisaRequest from "./containers/EvisaRequests/EvisaRequest";
import EvisaRequestTable from "./containers/EvisaRequests/EvisaRequestTable";

class App extends Component {
    state = {
        mobileNavigationActive : false,
        userMenuActive : false
    };
    componentDidMount() {
        this.props.onAutoLogin();
    }

    HandleMobileNavigationToggle = () => {
        this.setState(prevState => {
            return {
                mobileNavigationActive : !prevState.mobileNavigationActive
            }
        })
    };
    HandleUserMenuToggle = () => {
        this.setState(prevState => {
            return {
                userMenuActive : !prevState.userMenuActive
            }
        })
    };

    render() {
        let routes = (
            <Switch>
                <Route path="/" component={Auth} />
                <Redirect to="/" />
            </Switch>
        );

        if ( this.props.isAuth ) {
            routes = (
                <Switch>
                    <Route  path="/logout" component={LogOut}/>
                    <Route  path="/evisa" component={Evisa}/>
                    <Route  path="/evisa-request/details/:id" component={EvisaRequest}/>
                    <Route  exact path="/e-visa" component={EvisaRequests}/>
                    <Route  exact path="/" render={() => <Home user={this.props.user}/>}/>
                    <Redirect to="/" />
                </Switch>
            );
        }

        return(
            <BrowserRouter>
                <SiteFrame  mobileNavigationStatus={this.state.mobileNavigationActive}
                                    userMenuClicked={this.HandleUserMenuToggle}
                                    userMenuStatus={this.state.userMenuActive}
                                    mobileNavigationHandler={this.HandleMobileNavigationToggle}>
                    {routes}
                </SiteFrame>
            </BrowserRouter>
        )
    }
};
const mapStateToProps = state => {
    return{
        isAuth : state.auth.token !== null,
        user : state.auth.userId
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onAutoLogin : () => dispatch(AutoLoginUser())
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(App);

