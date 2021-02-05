import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import {getProviders, updateProviderDetail} from "./actions/providers.action";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";

const columns = [
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'address1', headerName: 'Address1', width: 200 },
    { field: 'address2', headerName: 'Address2', width: 200 },
    { field: 'city', headerName: 'city', width: 130 },
    { field: 'state', headerName: 'State', width: 130 },
    { field: 'zip', headerName: 'Zip', width: 130 },
    { field: 'verified', headerName: 'Is Verified', width: 130 }
];

class ProviderTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editProviderDetail: {
                id: 0,
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                address1: "",
                address2: "",
                city: "",
                state: "",
                zip: "",
                specialty: {},
                verified: false
            }
        }
    }

    componentDidMount() {
        if (this.props.providers === null) {
            this.props.getProviders();
        }
    }

    handleVerifyClick(event) {
        if (this.state.editProviderDetail.id !== 0) {
            this.props.updateProviderDetail(this.state.editProviderDetail);
        }
        alert("successful!");
    }

    handleRowSelection(event) {
        console.log(event);
        if (event.isSelected) {
            const index = this.props.providers.findIndex(p => p.id === event.data.id);
            let updatedDetail = this.props.providers[index];
            updatedDetail.verified = true;
            this.setState({
                editProviderDetail: updatedDetail
            });
        } else {
            this.setState({
                editProviderDetail: {
                    id: 0,
                    firstName: "",
                    lastName: "",
                    phone: "",
                    email: "",
                    address1: "",
                    address2: "",
                    city: "",
                    state: "",
                    zip: "",
                    specialty: {},
                    verified: false
                }
            })
        }
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ height: 400, width: '100%' }}>
                        {this.props.providers && <DataGrid rows={this.props.providers}
                                                           columns={columns}
                                                           pageSize={5}
                                                           checkboxSelection
                                                           disableMultipleSelection={true}
                                                           onRowSelected={this.handleRowSelection.bind(this)} />}
                    </div>
                </div>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.handleVerifyClick.bind(this)}
                >
                    Verify
                </Button>
            </div>
        );

    }
}
function mapStateToProps(appState) {
    return {
        providers: appState.providers
    }
}

export default connect(mapStateToProps, {getProviders, updateProviderDetail})(ProviderTable);
