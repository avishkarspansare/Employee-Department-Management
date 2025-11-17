import React, { Component } from 'react';

// 1. Import the hooks we need for the wrapper
import { useNavigate, useParams } from 'react-router-dom';

import EmployeeService from '../services/EmployeeService';
import DepartmentService from '../services/DepartmentService';

// 2. Create the HOC wrapper function
// This function injects 'navigate' and 'params' as props
function withRouter(Component) {
    return function WrappedComponent(props) {
        const navigate = useNavigate();
        const params = useParams();
        return <Component {...props} navigate={navigate} params={params} />;
    };
}

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
            departments: [],       // list of all departments
            departmentId: ''       // selected department id
        };

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        // Load current employee
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            let employee = res.data;
            this.setState({
                firstName: employee.firstName,
                lastName: employee.lastName,
                emailId: employee.emailId,
                departmentId: employee.department ? employee.department.id : ''
            });
        });

        // Load all departments for dropdown
        DepartmentService.getDepartments().then((res) => {
            this.setState({ departments: res.data });
        });
    }

    updateEmployee(e) {
        e.preventDefault();

        // Build department object only if one is selected
        const department = this.state.departmentId
            ? { id: this.state.departmentId }
            : null;

        let employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId,
            department: department
        };

        console.log('employee => ' + JSON.stringify(employee));

        EmployeeService.updateEmployee(employee, this.state.id).then((res) => {
            this.props.navigate('/employees');
        });
    }

    changeFirstNameHandler(event) {
        this.setState({ firstName: event.target.value });
    }

    changeLastNameHandler(event) {
        this.setState({ lastName: event.target.value });
    }

    changeEmailIdHandler(event) {
        this.setState({ emailId: event.target.value });
    }

    changeDepartmentHandler(event) {
        this.setState({ departmentId: event.target.value });
    }

    cancel() {
        this.props.navigate('/employees');
    }

    render() {
        return (
            <div>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center">Update Employee</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> First Name: </label>
                                        <input
                                            placeholder="First Name"
                                            name="firstName"
                                            className="form-control"
                                            value={this.state.firstName}
                                            onChange={this.changeFirstNameHandler}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label> Last Name: </label>
                                        <input
                                            placeholder="Last Name"
                                            name="lastName"
                                            className="form-control"
                                            value={this.state.lastName}
                                            onChange={this.changeLastNameHandler}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label> Email Id: </label>
                                        <input
                                            placeholder="Email Address"
                                            name="emailId"
                                            className="form-control"
                                            value={this.state.emailId}
                                            onChange={this.changeEmailIdHandler}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label> Department: </label>
                                        <select
                                            className="form-control"
                                            value={this.state.departmentId}
                                            onChange={this.changeDepartmentHandler}
                                        >
                                            <option value="">
                                                -- Select Department --
                                            </option>
                                            {this.state.departments.map((dept) => (
                                                <option key={dept.id} value={dept.id}>
                                                    {dept.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        className="btn btn-success"
                                        onClick={this.updateEmployee}
                                        style={{ marginTop: '10px' }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={this.cancel}
                                        style={{ marginLeft: '10px', marginTop: '10px' }}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// 3. Export the wrapped component
export default withRouter(UpdateEmployeeComponent);
