import React, { Component } from 'react';
// 1. Import the hooks needed for the wrapper
import { useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

// 2. Create the HOC wrapper function
// This function injects 'params' as a prop
function withRouter(Component) {
    return function WrappedComponent(props) {
        const params = useParams();
        // Pass params to the class component
        return <Component {...props} params={params} />;
    };
}

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // 3. Get 'id' from 'this.props.params' (injected by HOC)
            id: this.props.params.id,
            employee: {}
        };
    }

    componentDidMount(){
        // This logic is unchanged and works because this.state.id is set correctly
        EmployeeService.getEmployeeById(this.state.id).then( res => {
            this.setState({employee: res.data});
        });
    }

    render() {
        const { employee } = this.state;
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Individual Employee Details</h3>
                    <div className = "card-body">
                        <div className="row">
                            <label> <b> Employee ID: </b> </label>
                            <div> { this.state.employee.id } </div>
                        </div>
                        <div className = "row">
                            <label> <b>First Name: </b> </label>
                            <div> { this.state.employee.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> <b>Last Name: </b> </label>
                            <div> { this.state.employee.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> <b> Email ID: </b> </label>
                            <div> { this.state.employee.emailId }</div>
                        </div>
                        <div className="row">
                            <label> <b> Department: </b></label>
                            <div>{employee.department ? employee.department.name : '—'}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// 4. Export the wrapped component
export default withRouter(ViewEmployeeComponent);