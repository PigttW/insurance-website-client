import React, {Component} from 'react';
import {connect} from 'react-redux';
import {checkLogin} from "./actions/auth.action";

export default function (ExistingComponent) {

    class WrapperHOCComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        static getDerivedStateFromProps(props, state) {
            if (!props.loggedIn) {
                props.checkLogin()
                    .then(() => {
                        if (props.loggedIn) {
                            return state;
                        } else {
                            props.history.push("/login");
                            return state;
                        }
                    });
            }
        }

        render() {
            return (
                <ExistingComponent {...this.props} />
            );
        }
    }

    function mapStateToProps({loggedIn}) {
        return {loggedIn};
    }

    return connect(mapStateToProps, {checkLogin})(WrapperHOCComponent);
}
