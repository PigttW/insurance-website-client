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
import {withStyles} from "@material-ui/core";
import ProviderTable from "./ProviderTable";
import {checkLogin} from "./actions/auth.action";
import {connect} from "react-redux";

const drawerWidth = 240;

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

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
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
                        this.props.history.push("/admin-login");
                    }
                });
        }

    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
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
                    <div className={classes.toolbar} />
                    <Divider />
                    <List>
                        <ListItem button key="plans" onClick={() => {
                            this.props.history.push("/add-plan");
                        }}>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add Plan" />
                        </ListItem>
                        <ListItem button key="providers" onClick={() => {
                            this.props.history.push("/admin");
                        }}>
                            <ListItemIcon>
                                <PeopleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Account Verified" />
                        </ListItem>
                        <ListItem button key="logout" onClick={() => {
                            this.props.history.push("/logout");
                        }}>
                            <ListItemIcon>
                                <PeopleOutlineIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                    <Divider />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <ProviderTable history={this.props.history} />
                </main>
            </div>
        );
    }
}

function mapStateToProps(appState) {
    return {
        loggedIn: appState.loggedIn
    };
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, {checkLogin})(Dashboard));
