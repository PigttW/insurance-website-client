import React from 'react';
import {deleteProviderFromHealthTeam, getCurrentUserDetail, updateUserDetail} from "./actions/user_detail.action";
import {connect} from "react-redux";
import {checkLogin} from "./actions/auth.action";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import UserDetailProviderCard from "./UserDetailProviderCard";
import Header from "./Header";
import Footer from "./Footer";
import PlanCard from "./PlanCard";

class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editUserDetail: {
                id: 0,
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                address1: "",
                address2: "",
                city: "",
                state: "",
                zip: "",
                insurance: {},
                myHealthTeam: []
            }
        }
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            this.props.checkLogin()
                .then(() => {
                    if (this.props.loggedIn) {
                        this.props.getCurrentUserDetail(this.props.loggedIn.id)
                            .then(() => {
                                this.setState({
                                    editUserDetail: this.props.userDetail
                                })
                            });
                    } else {
                        this.props.history.push("/login");
                    }
                });
        }

    }

    handleConfirmClick(event) {
        this.props.updateUserDetail(this.state.editUserDetail);
        this.setState({
            editUserDetail: this.props.userDetail
        })
    }

    handleCancelClick(event) {
        this.state.editUserDetail["insurance"] = null;
        this.setState({
            editUserDetail: this.state.editUserDetail
        });
    }

    handleFieldChange(event) {
        const {name, value} = event.target;
        this.state.editUserDetail[name] = value;
        this.setState({
            editUserDetail: this.state.editUserDetail
        })
    }

    render() {
        let name = this.props.userDetail && this.props.userDetail.firstName + " " + this.props.userDetail.lastName;
        let profile = this.props.userDetail && <div className="container">
            <h2 align="center">{name}'s Account</h2>
            <Grid container spacing={5} alignItems="center" justify="center">
                <Grid item md={6}>
                    {<TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        color="warning"
                        value={this.state.editUserDetail.firstName}
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={6}>
                    {<TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        color="warning"
                        value={this.state.editUserDetail.lastName}
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={6}>
                    {<TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        color="warning"
                        value={this.state.editUserDetail.phone}
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={6}>
                    {<TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        color="warning"
                        value={this.state.editUserDetail.email}
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={12}>
                    {<TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="address1"
                        label="Address1"
                        name="address1"
                        color="warning"
                        value={this.state.editUserDetail.address1}
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={12}>
                    {<TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="address2"
                        label="Address2"
                        name="address2"
                        color="warning"
                        value={this.state.editUserDetail.address2}
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={4}>
                    {<TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        color="warning"
                        value={this.state.editUserDetail.city}
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={4}>
                    {<TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="state"
                        label="State"
                        name="state"
                        color="warning"
                        value={this.state.editUserDetail.state}
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={4}>
                    {<TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="zip"
                        label="Zip"
                        name="zip"
                        color="warning"
                        value={this.state.editUserDetail.zip}
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={12}>
                    <h4 align="center">My Plan:</h4>
                </Grid>
                <Grid item md={12}>
                    {this.props.userDetail.insurance ? <PlanCard plan={this.props.userDetail.insurance} show={false}></PlanCard> : ""}
                </Grid>
                <Grid container md={6} alignItems="center" justify="center">
                    {this.props.userDetail.insurance ? <a className="btn btn-warning" href="/plans">CHANGE</a> : ""}
                </Grid>
                <Grid container md={6} alignItems="center" justify="center">
                    {this.props.userDetail.insurance ? <button className="btn btn-danger"
                                                               onClick={this.handleCancelClick.bind(this)}
                    >CANCEL
                    </button> : ""}
                </Grid>
                <Grid item md={12}>
                    <h4 align="center">My Health Team:</h4>
                </Grid>
                {
                    this.state.editUserDetail.myHealthTeam.map(p => {
                        return <Grid item md={5}>
                            <UserDetailProviderCard provider={p} history={this.props.history}/>
                        </Grid>;
                    })
                }

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.handleConfirmClick.bind(this)}
                >
                    Confirm
                </Button>
            </Grid>
        </div>;

        return (
            <React.Fragment>
                <Header />
                {profile}
                <Footer />
            </React.Fragment>
        )
    }
}

function mapStateToProps(appState) {
    return {
        userDetail: appState.userDetail,
        loggedIn: appState.loggedIn
    };
}

export default connect(mapStateToProps, {
    getCurrentUserDetail,
    checkLogin,
    updateUserDetail,
    deleteProviderFromHealthTeam
})(Account);
