import React, { useState, useEffect } from 'react';   // add useEffect here
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import DepartmentService from '../services/DepartmentService';  // new import

// Convert to a functional component
function CreateEmployeeComponent() {

    // Initialize state using the useState hook
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');

    const [departments, setDepartments] = useState([]);   // dropdown options
    const [departmentId, setDepartmentId] = useState(''); // selected id or ''
    
    // Initialize the navigate function from React Router v6
    const navigate = useNavigate();

    // Load departments when component mounts
    useEffect(() => {
        DepartmentService.getDepartments()
        .then(res => setDepartments(res.data))
        .catch(() => setDepartments([]));
    }, []);

    // Event handlers are now simple functions
    const changeFirstNameHandler = (event) => {
        setFirstName(event.target.value);
    }
    
    const changeLastNameHandler = (event) => {
        setLastName(event.target.value);
    }

    const changeEmailIdHandler = (event) => {
        setEmailId(event.target.value);
    }

    const saveEmployee = (e) => {
        e.preventDefault();
        const department = departmentId ? { id: departmentId } : null;
        let employee = {
            firstName,
            lastName,
            emailId,
            department: department
        };
        console.log('employee => ' + JSON.stringify(employee));

        // Call the service and use the navigate hook for redirection
        EmployeeService.createEmployee(employee).then( res => {
            navigate('/employees');
        });
    }

      const cancel = () => {
    navigate('/employees');
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h3 className="text-center">Add Employee</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> First Name: </label>
                  <input
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label> Last Name: </label>
                  <input
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label> Email Id: </label>
                  <input
                    placeholder="Email Address"
                    name="emailId"
                    className="form-control"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </div>

                {/* New Department dropdown */}
                <div className="form-group">
                  <label> Department: </label>
                  <select
                    className="form-control"
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value || '')}
                  >
                    {/* empty option → employee on bench */}
                    <option value="">
                      -- No department (bench) --
                    </option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="btn btn-success"
                  onClick={saveEmployee}
                  style={{ marginTop: '10px' }}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={cancel}
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

export default CreateEmployeeComponent;
