import React from 'react';
import {connect} from "react-redux";
import {checkLogin} from "./actions/auth.action";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import Header from "./Header";
import Footer from "./Footer";
import {getCurrentProviderDetail, updateCurrentProviderDetail} from "./actions/provider_detail.action";
import {getSpecialty} from "./actions/specialty.action";

class ProviderAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editProviderDetail: {
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
                specialty: {},
                verified: false
            }
        }
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            this.props.checkLogin()
                .then(() => {
                    let valid = false;
                    if (this.props.loggedIn) {
                        this.props.loggedIn.profiles.forEach(p => {
                            if (p.type === 'provider') {
                                valid = true;
                            }
                        })
                    } else {
                        this.props.history.push("/provider-login");
                    }
                    if (!valid) {
                        this.props.history.push("/provider-login");
                    }

                    if (this.props.loggedIn) {
                        this.props.getCurrentProviderDetail(this.props.loggedIn.id)
                            .then(() => {
                                this.setState({
                                    editProviderDetail: this.props.providerDetail
                                })
                            });
                    } else {
                        this.props.history.push("/provider-login");
                    }
                });
        }

        if (!this.props.specialties) {
            this.props.getSpecialty();
        }
    }

    handleConfirmClick(event) {
        this.props.updateCurrentProviderDetail(this.state.editProviderDetail);
        this.setState({
            editProviderDetail: this.props.providerDetail
        })
    }

    handleFieldChange(event) {
        const {name, value} = event.target;
        this.state.editProviderDetail[name] = value;
        this.setState({
            editProviderDetail: this.state.editProviderDetail
        })
    }

    handleSelectChange(event) {
        const {value} = event.target;
        const specialty = {
            id: +value
        };
        console.log(specialty);
        this.state.editProviderDetail["specialty"] = specialty;
        this.setState({
            editProviderDetail: this.state.editProviderDetail
        })
    }

    render() {
        let name = this.props.providerDetail && this.props.providerDetail.firstName + " " + this.props.providerDetail.lastName;
        let profile = this.props.providerDetail && <div className="container">
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
                        value={this.state.editProviderDetail.firstName}
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
                        value={this.state.editProviderDetail.lastName}
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
                        value={this.state.editProviderDetail.phone}
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
                        value={this.state.editProviderDetail.email}
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
                        value={this.state.editProviderDetail.address1}
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
                        value={this.state.editProviderDetail.address2}
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
                        value={this.state.editProviderDetail.city}
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
                        value={this.state.editProviderDetail.state}
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
                        value={this.state.editProviderDetail.zip}
                        onChange={this.handleFieldChange.bind(this)}
                    />}
                </Grid>
                <Grid container justify="center" alignItems="center">
                    <InputLabel id="demo-simple-select-label">Specialty</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.editProviderDetail.specialty ? this.state.editProviderDetail.specialty.type : ""}
                        onChange={this.handleSelectChange.bind(this)}
                    >
                        {this.props.specialties && this.props.specialties.map(s => {
                            return <MenuItem value={s.id} >{s.type}</MenuItem>
                        })}
                    </Select>
                </Grid>
                <Grid container justify="center" alignItems="center">
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.handleConfirmClick.bind(this)}
                    >
                        Confirm
                    </Button>
                </Grid>
                <Grid container justify="center" alignItems="center" />
                <Grid container justify="center" alignItems="center">
                    <a className="btn btn-outline-primary" href="/logout">Logout</a>
                </Grid>
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
        providerDetail: appState.providerDetail,
        loggedIn: appState.loggedIn,
        specialties: appState.specialties
    };
}

export default connect(mapStateToProps, {
    getCurrentProviderDetail,
    checkLogin,
    updateCurrentProviderDetail,
    getSpecialty
})(ProviderAccount);
