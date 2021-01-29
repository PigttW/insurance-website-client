import React from 'react';
import {connect} from "react-redux";
import Logout from "./Logout";
import {checkLogin} from "./actions/auth.action";

class LoginControl extends React.Component {

    componentDidMount() {
        if (this.props.loggedIn === null) {
            this.props.checkLogin();
        }
    }

    render() {
        return this.props.loggedIn ? <a className="btn btn-outline-primary" href="/logout">Logout</a> : <a className="btn btn-outline-primary" href="/login">Sign In</a>
    }
}
export default connect(({loggedIn}) => ({loggedIn}), {checkLogin})(LoginControl);
