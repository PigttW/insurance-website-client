import React from 'react';
import {getInsurances, sortInsurances} from "./actions/insurances.action";
import {connect} from "react-redux";
import PlanCard from "./PlanCard";
import Grid from "@material-ui/core/Grid";
import {CssBaseline} from "@material-ui/core";

class Plans extends React.Component {

    componentDidMount() {
        if (this.props.insurances === null) {
            this.props.getInsurances();
        }
    }

    handleClick(event) {

    }

    handleSelectChange(event) {
        this.props.sortInsurances(event.target.value);
        this.forceUpdate();
    }

    render() {
        return (
            <div className="container">
                <Grid container spacing={5}>
                    <Grid item md={10}>
                        <select className="form-select" aria-label="Default select example" onChange={this.handleSelectChange.bind(this)}>
                            <option selected>Sort by</option>
                            <option value="rate">Rate: low to high</option>
                            <option value="deductible">Deductible: low to high</option>
                            <option value="maximum">Maximum: low to high</option>
                        </select>
                    </Grid>
                    {
                        this.props.insurances && this.props.insurances.map(insurance => {
                            return (
                                <Grid item md={10}>
                                    <PlanCard plan={insurance} />
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(appState) {
    return {
        insurances: appState.insurances
    }
}
export default connect(mapStateToProps, {getInsurances, sortInsurances})(Plans);
