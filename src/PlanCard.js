import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {Divider, makeStyles, withStyles} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import {connect} from "react-redux";
import {checkLogin} from "./actions/auth.action";
import {getCurrentUserDetail, updateUserDetail} from "./actions/user_detail.action";

const styles = theme => ({
    root: {
        borderRadius: 12,
        minWidth: 256,
        textAlign: 'center',
    },
    header: {
        textAlign: 'center',
        spacing: 10,
    },
    list: {
        padding: '20px',
    },
    button: {
        margin: theme.spacing(1),
    },
    action: {
        display: 'flex',
        justifyContent: 'space-around',
    },
});

class PlanCard extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick(event) {
        if (!this.props.loggedIn) {
            this.props.checkLogin();
        }
        if (!this.props.loggedIn) {
            alert("Please log in");
        } else {
            this.props.getCurrentUserDetail(this.props.loggedIn.id)
                .then(() => {
                    const insurance = this.props.userDetail.insurance;
                    if (insurance && insurance.id === this.props.plan.id) {
                        alert("You already enrolled in this plan");
                    } else {
                        const editUserDetail = this.props.userDetail;
                        editUserDetail.insurance = this.props.plan;
                        this.props.updateUserDetail(editUserDetail);
                        alert("Successful!");
                    }
                });

        }
    }

    render() {
        const name = this.props.plan.type;
        const outOfPocketMaximum = this.props.plan.outOfPocketMaximum;
        const deductible = this.props.plan.deductible;
        const monthlyRate = this.props.plan.monthlyRate;
        const {classes} = this.props;

        return (
            <Card className={classes.root}>
                <CardHeader title={name} align="center" className={classes.header}/>
                <Divider variant="middle"/>
                <CardContent>
                    <Typography variant="h6" align="center">
                        Monthly Rate: $ {monthlyRate}
                    </Typography>
                    <div className={styles.list}>
                        <Typography align="center">Out Of Pocket Maximum: {outOfPocketMaximum}</Typography>
                        <Typography align="center">Deductible: {deductible}</Typography>
                    </div>
                </CardContent>
                <Divider variant="middle"/>
                <CardActions className={classes.action}>
                    <Button variant="contained" color="primary" className={classes.button}
                            onClick={this.handleClick.bind(this)}>
                        CHOOSE
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

function mapStateToProps(appState) {
    return {
        loggedIn: appState.loggedIn,
        userDetail: appState.userDetail
    };
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, {
    checkLogin,
    getCurrentUserDetail,
    updateUserDetail
})(PlanCard));
