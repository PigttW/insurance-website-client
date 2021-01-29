import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import {login} from "./actions/auth.action";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {CssBaseline, Paper, withStyles} from "@material-ui/core";
import Link from "@material-ui/core/Link";

const styles = (theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/-uHVRvDr7pg)',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Login extends Component {

    onSubmit = (user) => {
        this.props.login(user, (res) => {
            if (res.data.success) {
                this.props.history.push('/account');
            }
        });
    }

    renderField({input, label, type}) {
        return (
            <div className="form-group">
                <label>
                    {label}
                    <input
                        type={type}
                        name={input.name}
                        className="form-control"
                        {...input}
                    />
                </label>
            </div>
        )
    }

    renderCheckbox({input, label, type}) {
        return (
            <div className="form-check">
                <label>
                    <input
                        type="checkbox"
                        name={input.name}
                        {...input}
                        className="form-check-input"
                    />
                    {label}
                </label>
            </div>
        )
    }


    render() {
        const { classes } = this.props;

        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={classes.form} noValidate>
                            <Field
                                name="username"
                                label="Username"
                                type="text"
                                component={this.renderField}
                                fullWidth
                            />
                            <Field
                                name="password"
                                label="Password"
                                type="password"
                                component={this.renderField}
                            />
                            <Field
                                name="remember-me"
                                label="Remember Me"
                                type="checkbox"
                                component={this.renderCheckbox}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>

                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        );
    }

}

function mapStateToProps(state) {
    return {
        initialValues: {
            username: '',
            password: ''
        }
    }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, {login})(
    reduxForm({
        form: 'LoginForm'
    })(Login))
);

