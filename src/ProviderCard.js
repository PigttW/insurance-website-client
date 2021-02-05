import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {blue, red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {CardActions, Collapse, TextField, withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {checkLogin} from "./actions/auth.action";
import {getCurrentUserDetail, updateUserDetail} from "./actions/user_detail.action";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from "clsx";
import {addComment, getComments} from "./actions/comment.action";

const useStyles = (theme) => ({
    root: {
        maxWidth: 600,
        alignItems: 'center'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: blue[500],
    },
});

class ProviderCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            comment: "",
            comments: this.props.comments,
            color: this.props.color
        };
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            this.props.checkLogin();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            comments: nextProps.comments,
            color: nextProps.color
        });
    }

    handleFieldChange(event) {
        const {value} = event.target;
        this.state.comment = value;
        this.setState({
            comment: this.state.comment
        })
    }

    handleExpandClick = () => {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    handleCommentClick(event) {
        let today = new Date();
        let time = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " +today.getHours()
            + ':' + today.getMinutes();

        const newComment = {
            text: this.state.comment,
            time: time,
            user: {
                id: this.props.loggedIn.id
            },
            providerDetail: {
                id: this.props.provider.id
            }
        }
        this.props.addComment(newComment);
        this.setState({
            comment: ""
        })
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
                            <FavoriteIcon color="secondary" onClick={this.handleClick.bind(this)}/>
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
                <CardActions disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {
                            this.state.comments && this.state.comments.map(c => {
                                    return <Typography paragraph>
                                        {c.user.username} - {c.time} : {c.text}
                                    </Typography>
                                })
                        }
                        {
                            this.props.loggedIn && <Typography>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="city"
                                    label="Your Comment"
                                    name="comment"
                                    color="warning"
                                    value={this.state.comment}
                                    autoFocus
                                    onChange={this.handleFieldChange.bind(this)}
                                />
                                <button className="btn btn-outline-primary" onClick={this.handleCommentClick.bind(this)}>COMMENT</button>
                            </Typography>
                        }
                    </CardContent>
                </Collapse>
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
    addComment
})(ProviderCard));
