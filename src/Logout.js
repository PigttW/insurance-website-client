import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from "./actions/auth.action";

class Logout extends Component {

    handleLogout = () => {
        this.props.logout((res) => {
            if (res.data && res.data.success) {
                this.props.history.push('/login');
            }
        });
    }

    render() {
        return (
            <div>
                <h2>Logout</h2>
                <button className="btn btn-danger" onClick={this.handleLogout}>Click to Logout</button>
            </div>
        );
    }

}
export default connect(null, {logout})(Logout);
