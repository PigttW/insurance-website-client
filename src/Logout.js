import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from "./actions/auth.action";
import Footer from "./Footer";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";

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
                <Header />
                <Grid container spacing={5} justify="center" alignItems="center">
                    <button className="btn btn-danger" onClick={this.handleLogout}>Click to Logout</button>
                </Grid>
                <Footer />
            </div>
        );
    }

}
export default connect(null, {logout})(Logout);
