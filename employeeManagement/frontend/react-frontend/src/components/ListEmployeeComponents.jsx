import React, { Component } from "react";
// 1. Import the hook needed for the wrapper
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

// 2. DEFINE THE WRAPPER FUNCTION (This was missing)
// This function creates a new component that passes in the 'navigate' prop
function withRouter(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class ListEmployeeComponents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
    };
    this.addEmployee = this.addEmployee.bind(this);
    this.Department = this.Department.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.viewEmployee = this.viewEmployee.bind(this); // Added missing bind
  }

  // These functions now work because 'this.props.navigate'
  // will be provided by the wrapper.
  addEmployee() {
    this.props.navigate("/add-employee");
  }

  Department() {
    this.props.navigate("/departments");
  }

  editEmployee(id) {
    this.props.navigate(`/update-employee/${id}`);
  }

  deleteEmployee(id) {
    EmployeeService.deleteEmployee(id).then((res) => {
      this.setState({
        employees: this.state.employees.filter(
          (employee) => employee.id !== id
        ),
      });
    });
  }

  viewEmployee(id) {
    this.props.navigate(`/view-employee/${id}`);
  }

  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      this.setState({ employees: res.data });
    });
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center"> Employee List in My Company</h2>
        
        <div className="mb-2">
          {" "}
          <button className="btn btn-primary me-1" onClick={this.addEmployee}>
            {" "}
            Add Employee{" "}
          </button>
          <button className="btn btn-primary ms-1" onClick={this.Department}>
            {" "}
            Department{" "}
          </button>
        </div>
        <br></br>

        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Employee ID:</th>
                <th>First Name: </th>
                <th>Last Name: </th>
                <th>Email ID: </th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map((employee) => (
                <tr key={employee.id}>
                  <td> {employee.id} </td>
                  <td> {employee.firstName} </td>
                  <td> {employee.lastName} </td>
                  <td> {employee.emailId} </td>
                  <td>
                    <button
                      onClick={() => this.editEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      {" "}
                      Update
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteEmployee(employee.id)}
                      className="btn btn-danger"
                    >
                      Delete{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.viewEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      View{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
// We export the component wrapped by our HOC
export default withRouter(ListEmployeeComponents);
