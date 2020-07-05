import React, {Component} from 'react';
import {connect } from 'react-redux';
import {logOutUser} from "../../store/actions/auth";
import {Redirect} from "react-router";
class LogOut extends Component{

    componentDidMount() {
        this.props.onLogOut();
    }
    render() {
        return (
            <Redirect to='/' />
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogOut : () => dispatch(logOutUser())
    }
};
export default connect(null,mapDispatchToProps)(LogOut);