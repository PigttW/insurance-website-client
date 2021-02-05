import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import {TextField, withStyles} from "@material-ui/core";
import ProviderTable from "./ProviderTable";
import {checkLogin} from "./actions/auth.action";
import {connect} from "react-redux";
import {DataGrid} from "@material-ui/data-grid";
import {addInsurance, getInsurances} from "./actions/insurances.action";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const drawerWidth = 240;

const columns = [
    {field: 'type', headerName: 'Type', width: 130},
    {field: 'outOfPocketMaximum', headerName: 'Out of Pocket Maximum', type: 'number', width: 200},
    {field: 'deductible', headerName: 'Deductible', type: 'number', width: 200},
    {field: 'monthlyRate', headerName: 'Monthly Rate', type: 'number', width: 200},
];

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
});

class AddPlan extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newPlan: {
                type: "",
                outOfPocketMaximum: 0,
                deductible: 0,
                monthlyRate: 0
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
                            if (p.type === 'admin') {
                                valid = true;
                            }
                        })
                    }

                    if (!valid) {
                        this.props.history.push("/adminlogin");
                    }
                });
        }

        if (!this.props.insurances) {
            this.props.getInsurances();
        }
    }

    handleFieldChange(event) {
        const {name, value} = event.target;
        if (name !== 'type') {
            this.state.newPlan[name] = + value;
        } else {
            this.state.newPlan[name] = value;
        }
        this.setState({
            newPlan: this.state.newPlan
        })
    }

    handleVerifyClick(event) {
        console.log(this.state.newPlan);
        this.props.addInsurance(this.state.newPlan);
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Admin Management
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar}/>
                    <Divider/>
                    <List>
                        <ListItem button key="plans" onClick={() => {
                            this.props.history.push("/add-plan");
                        }}>
                            <ListItemIcon>
                                <AddIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Add Plan"/>
                        </ListItem>
                        <ListItem button key="providers" onClick={() => {
                            this.props.history.push("/admin");
                        }}>
                            <ListItemIcon>
                                <PeopleOutlineIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Account Verified"/>
                        </ListItem>
                        <ListItem button key="logout" onClick={() => {
                            this.props.history.push("/logout");
                        }}>
                            <ListItemIcon>
                                <PeopleOutlineIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Logout"/>
                        </ListItem>
                    </List>
                    <Divider/>
                </Drawer>
                <Grid container spacing={5} alignItems="center" justify="center">
                    <Grid item md={12}>
                        <main className={classes.content}>
                            <div className={classes.toolbar}/>
                            <div style={{display: 'flex', height: '100%'}}>
                                <div style={{height: 400, width: '100%'}}>
                                    {this.props.insurances && <DataGrid rows={this.props.insurances}
                                                                        columns={columns}
                                                                        pageSize={5}/>}
                                </div>
                            </div>
                        </main>
                    </Grid>
                    <Grid item md={12}>
                        {<TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="type"
                            label="Plan Name"
                            name="type"
                            color="warning"
                            onChange={this.handleFieldChange.bind(this)}
                        />}
                    </Grid>
                    <Grid item md={12}>
                        {<TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="rate"
                            label="Monthly Rate"
                            name="monthlyRate"
                            color="warning"
                            onChange={this.handleFieldChange.bind(this)}
                        />}
                    </Grid>
                    <Grid item md={12}>
                        {<TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="deductible"
                            label="Deductible"
                            name="deductible"
                            color="warning"
                            onChange={this.handleFieldChange.bind(this)}
                        />}
                    </Grid>
                    <Grid item md={12}>
                        {<TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="maximum"
                            label="Out Of Pocket Maximum"
                            name="outOfPocketMaximum"
                            color="warning"
                            onChange={this.handleFieldChange.bind(this)}
                        />}
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.handleVerifyClick.bind(this)}
                    >
                        Add Plan
                    </Button>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(appState) {
    return {
        loggedIn: appState.loggedIn,
        insurances: appState.insurances
    };
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, {
    checkLogin,
    getInsurances,
    addInsurance
})(AddPlan));
