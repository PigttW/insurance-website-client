import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {blue, red} from '@material-ui/core/colors';
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {checkLogin} from "./actions/auth.action";
import {deleteProviderFromHealthTeam, getCurrentUserDetail, updateUserDetail} from "./actions/user_detail.action";
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = (theme) => ({
    root: {
        maxWidth: 500,
    },
    avatar: {
        backgroundColor: blue[500],
    },
});

class UserDetailProviderCard extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick(event) {
        // event.preventDefault();
        if (!this.props.loggedIn) {
            this.props.checkLogin();
        }
        this.props.getCurrentUserDetail(this.props.loggedIn.id)
            .then(() => {
                this.props.deleteProviderFromHealthTeam(this.props.userDetail.id, this.props.provider);
            });
        this.props.history.push("/account");
    }

    render() {
        const {classes} = this.props;
        const name = this.props.provider.firstName + " " + this.props.provider.lastName;
        const subheader = this.props.provider.specialty.type;
        const body = this.props.provider.address2 + " " + this.props.provider.address1 + "," + this.props.provider.city
            + "," + this.props.provider.state + "," + this.props.provider.zip + " | " + this.props.provider.phone

        return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            P
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="add to favorites" onClick={this.handleClick.bind(this)}>
                            <CancelIcon color="secondary" />
                        </IconButton>
                    }
                    title={name}
                    subheader={subheader}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {body}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

function mapStateToProps(appState) {
    return {
        loggedIn: appState.loggedIn,
        userDetail: appState.userDetail
    };
}

export default withStyles(useStyles)(connect(mapStateToProps, {
    checkLogin,
    getCurrentUserDetail,
    updateUserDetail,
    deleteProviderFromHealthTeam
})(UserDetailProviderCard));
