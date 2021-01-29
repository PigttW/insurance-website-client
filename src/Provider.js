import React from 'react';
import {filterProvidersByName, filterProvidersByType, getProviders} from "./actions/providers.action";
import {connect} from "react-redux";
import {BottomNavigation, BottomNavigationAction, makeStyles, TextField} from "@material-ui/core";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CancelIcon from '@material-ui/icons/Cancel';
import {Autocomplete} from "@material-ui/lab";
import {getSpecialty} from "./actions/specialty.action";
import providerCard from "./ProviderCard";
import ProviderCard from "./ProviderCard";
import Grid from "@material-ui/core/Grid";

class Provider extends React.Component {;

    constructor(props) {
        super(props);
        this.state = {
            option: "reset",
            typeValue: "",
            nameValue: ""
        }
    }

    componentDidMount() {
        if (this.props.providers === null) {
            this.props.getProviders();
        }

        if (this.props.specialties === null) {
            this.props.getSpecialty();
        }
    }

    handleChange = (event, value) => {
        this.setState({
            option: value
        })
    }

    handleAutoCompleteChange = (event, value) => {
        this.props.getProviders()
            .then(() => {
                this.setState({
                    typeValue: value
                }, () => {
                    this.props.filterProvidersByType(this.state.typeValue === null ? "NULL" : this.state.typeValue.type);
                });
            });

    }

    handleTextFieldChange = (event) => {
        let {value} = event.target;
        this.props.getProviders()
            .then(() => {
                this.setState({
                    nameValue: value
                }, () => {
                    this.props.filterProvidersByName(this.state.nameValue === null ? "NULL" : this.state.nameValue);
                });
            });
    }

    render() {
        const {value} = this.state;
        const classes = makeStyles({
            root: {
                width: 500,
            },
        });

        let findByType = this.state.option === "type" && this.props.specialties && <Autocomplete
            id="combo-box-demo"
            options={this.props.specialties}
            getOptionLabel={(option) => option.type}
            style={{width: 300}}
            onChange={this.handleAutoCompleteChange}
            renderInput={(params) => <TextField {...params} label="Find By Type" variant="outlined"/>}
        />

        let findByName = this.state.option === "name" && <TextField
            id="standard-basic"
            label="Find By Name"
            variant="outlined"
            onChange={this.handleTextFieldChange.bind(this)}/>

        return (
            <React.Fragment>
                <div className="container">
                    <BottomNavigation
                        value={value}
                        onChange={this.handleChange}
                        showLabels
                    >
                        <BottomNavigationAction label="Find By Type" value="type" icon={<LocalHospitalIcon/>}/>
                        <BottomNavigationAction label="Find By Name" value="name" icon={<AccountBoxIcon/>}/>
                    </BottomNavigation>
                    {findByType}
                    {findByName}
                    <Grid container spacing={5}>
                        {
                            this.props.providers && this.props.providers.map(provider => {
                                return (
                                    <Grid item md={10}>
                                        <ProviderCard provider={provider}></ProviderCard>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(appState) {
    return {
        providers: appState.providers,
        specialties: appState.specialties
    };
}

export default connect(mapStateToProps, {getProviders, getSpecialty, filterProvidersByType, filterProvidersByName})(Provider);
