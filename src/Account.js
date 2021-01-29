import React from 'react';
import {getCurrentUserDetail, updateUserDetail} from "./actions/user_detail.action";
import {connect} from "react-redux";
import {checkLogin} from "./actions/auth.action";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import UserDetailProviderCard from "./UserDetailProviderCard";

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
            },
            isFirstNameEdit: false,
            isLastNameEdit: false,
            isPhoneEdit: false,
            isEmailEdit: false,
            isAddress1Edit: false,
            isAddress2Edit: false,
            isCityEdit: false,
            isStateEdit: false,
            isZipEdit: false,
            isMyHealthTeamEdit: false
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

    handleEditClick(event) {
        const {name} = event.target;
        if (name === "firstName") {
            this.setState({
                isFirstNameEdit: true
            });
        } else if (name === "lastName") {
            this.setState({
                isLastNameEdit: true
            });
        } else if (name === "phone") {
            this.setState({
                isPhoneEdit: true
            });
        } else if (name === "email") {
            this.setState({
                isEmailEdit: true
            });
        } else if (name === "address1") {
            this.setState({
                isAddress1Edit: true
            });
        } else if (name === "address2") {
            this.setState({
                isAddress2Edit: true
            });
        } else if (name === "city") {
            this.setState({
                isCityEdit: true
            });
        } else if (name === "state") {
            this.setState({
                isStateEdit: true
            });
        } else if (name === "zip") {
            this.setState({
                isZipEdit: true
            });
        }
    }

    handleConfirmClick(event) {
        this.props.updateUserDetail(this.state.editUserDetail)
            .then(() => {
                this.setState({
                    isFirstNameEdit: false,
                    isLastNameEdit: false,
                    isPhoneEdit: false,
                    isEmailEdit: false,
                    isAddress1Edit: false,
                    isAddress2Edit: false,
                    isCityEdit: false,
                    isStateEdit: false,
                    isZipEdit: false,
                    isMyHealthTeamEdit: false
                })
            });
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
            <Grid container spacing={5}>
                <Grid item md={10}>
                    {!this.state.isFirstNameEdit ? <p>First Name: {this.state.editUserDetail.firstName} <button
                        onClick={this.handleEditClick.bind(this)}
                        type="button"
                        name="firstName"
                        className="btn btn-warning"
                    >EDIT</button></p> : <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        color="warning"
                        value={this.state.editUserDetail.firstName}
                        autoFocus
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={10}>
                    {!this.state.isLastNameEdit ? <p>Last Name: {this.state.editUserDetail.lastName} <button
                        onClick={this.handleEditClick.bind(this)}
                        type="button"
                        name="lastName"
                        className="btn btn-warning"
                    >EDIT</button></p> : <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        color="warning"
                        value={this.state.editUserDetail.lastName}
                        autoFocus
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={10}>
                    {!this.state.isPhoneEdit ? <p>Phone: {this.state.editUserDetail.phone} <button
                        onClick={this.handleEditClick.bind(this)}
                        type="button"
                        name="phone"
                        className="btn btn-warning"
                    >EDIT</button></p> : <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        color="warning"
                        value={this.state.editUserDetail.phone}
                        autoFocus
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={10}>
                    {!this.state.isEmailEdit ? <p>Email: {this.state.editUserDetail.email} <button
                        onClick={this.handleEditClick.bind(this)}
                        type="button"
                        name="email"
                        className="btn btn-warning"
                    >EDIT</button></p> : <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        color="warning"
                        value={this.state.editUserDetail.email}
                        autoFocus
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={10}>
                    {!this.state.isAddress1Edit ? <p>Address1: {this.state.editUserDetail.address1} <button
                        onClick={this.handleEditClick.bind(this)}
                        type="button"
                        name="address1"
                        className="btn btn-warning"
                    >EDIT</button></p> : <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="address1"
                        label="Address1"
                        name="address1"
                        color="warning"
                        value={this.state.editUserDetail.address1}
                        autoFocus
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={10}>
                    {!this.state.isAddress2Edit ? <p>Address2: {this.state.editUserDetail.address2} <button
                        onClick={this.handleEditClick.bind(this)}
                        type="button"
                        name="address2"
                        className="btn btn-warning"
                    >EDIT</button></p> : <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="address2"
                        label="Address2"
                        name="address2"
                        color="warning"
                        value={this.state.editUserDetail.address2}
                        autoFocus
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={10}>
                    {!this.state.isCityEdit ? <p>City: {this.state.editUserDetail.city} <button
                        onClick={this.handleEditClick.bind(this)}
                        type="button"
                        name="city"
                        className="btn btn-warning"
                    >EDIT</button></p> : <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        color="warning"
                        value={this.state.editUserDetail.city}
                        autoFocus
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={10}>
                    {!this.state.isStateEdit ? <p>State: {this.state.editUserDetail.state} <button
                        onClick={this.handleEditClick.bind(this)}
                        type="button"
                        name="state"
                        className="btn btn-warning"
                    >EDIT</button></p> : <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="state"
                        label="State"
                        name="state"
                        color="warning"
                        value={this.state.editUserDetail.state}
                        autoFocus
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={10}>
                    {!this.state.isZipEdit ? <p>Zip: {this.state.editUserDetail.zip} <button
                        onClick={this.handleEditClick.bind(this)}
                        type="button"
                        name="zip"
                        className="btn btn-warning"
                    >EDIT</button></p> : <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="zip"
                        label="Zip"
                        name="zip"
                        color="warning"
                        value={this.state.editUserDetail.zip}
                        autoFocus
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid item md={10}>
                    <p>My Plan: {this.props.userDetail.insurance ? this.props.userDetail.insurance.type : ""}
                    <a className="btn btn-warning" href="/plans">CHANGE</a> <button className="btn btn-danger"
                                                                                    onClick={this.handleCancelClick.bind(this)}
                        >CANCEL</button></p>
                </Grid>
                <Grid item md={10}>
                    <h4 align="center">My Health Team:</h4>
                </Grid>
                {
                    this.state.editUserDetail.myHealthTeam.map(p => {
                        return <Grid item md={5}>
                            <UserDetailProviderCard provider={p} />
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
                {profile}
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

export default connect(mapStateToProps, {getCurrentUserDetail, checkLogin, updateUserDetail})(Account);
