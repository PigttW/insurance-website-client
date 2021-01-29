import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {blue, red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {checkLogin} from "./actions/auth.action";
import {getCurrentUserDetail, updateUserDetail} from "./actions/user_detail.action";

const useStyles = (theme) => ({
    root: {
        maxWidth: 500,
    },
    avatar: {
        backgroundColor: blue[500],
    },
});

class ProviderCard extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick(event) {
        // event.preventDefault();
        if (!this.props.loggedIn) {
            this.props.checkLogin();
        }
        if (!this.props.loggedIn) {
            alert("Please log in");
        } else {
            this.props.getCurrentUserDetail(this.props.loggedIn.id)
                .then(() => {
                    const healthTeam = this.props.userDetail.myHealthTeam;
                    const index = healthTeam.findIndex(p => p.id === this.props.provider.id);
                    if (index >= 0) {
                        alert(this.props.provider.firstName + " " + this.props.provider.lastName
                            + " is already in your health team.");
                    } else {
                        const editUserDetail = this.props.userDetail;
                        editUserDetail.myHealthTeam.push(this.props.provider);
                        this.props.updateUserDetail(editUserDetail);
                        alert("Successful!");
                    }
                });

        }


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
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon onClick={this.handleClick.bind(this)}/>
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
    updateUserDetail
})(ProviderCard));
