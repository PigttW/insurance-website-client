import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Grid from "@material-ui/core/Grid";
import {CssBaseline, withStyles} from "@material-ui/core";

const styles = (theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/O-RKu3Aqnsw)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
});

class Home extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Header />
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item md={12} className={classes.image}>
                    </Grid>
                </Grid>
                <Footer />
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(Home);
