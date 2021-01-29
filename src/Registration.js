import React from "react";
import Container from "@material-ui/core/Container";
import {CssBaseline, makeStyles, TextField, withStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Alert} from "@material-ui/lab"
import {connect} from "react-redux";
import {signup} from "./actions/user.action";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            new_user: {
                username: '',
                password: '',
                repeat_password: ''
            },
            isPasswordValid: true,
            isModelVisible: false,
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        let new_user = {
            username: this.state.new_user["username"],
            password: this.state.new_user["password"],
            profiles: [
                {
                    id: 2,
                    type: "user"
                }
            ]
        }
        console.log(new_user);
        console.log()

        if (this.state.isPasswordValid) {
            this.props.signup(new_user, (res) => {
                if (res.data) {
                    this.props.history.push('/login');
                } else {
                    alert("something error please try again!")
                }
            });
        } else {
            alert("Password is not valid!")
        }
    };

    handleChange(event) {
        let {name, value} = event.target;
        this.state.new_user[name] = value;
        this.setState({
            new_user: this.state.new_user
        });

        if (this.state.new_user["password"] !== this.state.new_user["repeat_password"]) {
            this.setState({isPasswordValid: false});
        } else {
            this.setState({isPasswordValid: true});
        }

        console.log(this.state.new_user);
    };

    render() {
        const { classes } = this.props;

        let checkPassword = !this.state.isPasswordValid && <Alert severity="error">Passwords are not same!</Alert>
        let checkSuccessful = this.state.isModelVisible && <Alert severity="error">Something error happens, please try again!</Alert>
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit.bind(this)} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="repeat_password"
                                    label="Repeat Password"
                                    type="password"
                                    id="repeat_password"
                                    autoComplete="current-password"
                                    onChange={this.handleChange.bind(this)}
                                />
                            </Grid>
                        </Grid>
                        {checkPassword}
                        {checkSuccessful}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Signup
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}
export default withStyles(styles, { withTheme: true })(connect(null, {signup})(Signup));
