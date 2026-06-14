import React, { useState, useEffect } from "react";
import DepartmentService from "../services/DepartmentService";

function DepartmentComponent() {
  // Add form state
  const [newDeptName, setNewDeptName] = useState("");
  const [addMessage, setAddMessage] = useState("");

  // Find form state
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchMessage, setSearchMessage] = useState("");
  const [employeeCount, setEmployeeCount] = useState(null);

  // All departments and filtered suggestions
  const [allDepartments, setAllDepartments] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Load all departments once for suggestions
  useEffect(() => {
    DepartmentService.getDepartments()
      .then((res) => setAllDepartments(res.data))
      .catch(() => setAllDepartments([]));
  }, []);

  // Handle Add Department
  const handleAddDepartment = async (e) => {
    e.preventDefault();
    setAddMessage("");

    const trimmed = newDeptName.trim();
    if (!trimmed) {
      setAddMessage("Please enter a department name.");
      return;
    }

    try {
      const res = await DepartmentService.createDepartment({ name: trimmed });
      setAddMessage(
        `Department "${res.data.name}" created with id ${res.data.id}.`
      );
      setNewDeptName("");

      // also refresh allDepartments so new dept appears in suggestions
      const listRes = await DepartmentService.getDepartments();
      setAllDepartments(listRes.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const msg = error.response.data.error || "Department already exists.";
        setAddMessage(msg);
      } else {
        setAddMessage("Error creating department.");
      }
    }
  };

  // Handle typing in the search box and update suggestions
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchName(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const lower = value.toLowerCase();

    const filtered = allDepartments.filter((dept) =>
      dept.name.toLowerCase().includes(lower)
    );

    setSuggestions(filtered);
  };

  // Handle Find Department (when clicking the Find button)
  const handleFindDepartment = async (e) => {
    e.preventDefault();
    setSearchMessage("");
    setSearchResult(null);
    setEmployeeCount(null);

    const trimmed = searchName.trim();
    if (!trimmed) {
      setSearchMessage("Please enter a department name to search.");
      return;
    }

    try {
      const res = await DepartmentService.findByName(trimmed);
      const dept = res.data;
      setSearchResult(dept);
      setSearchMessage("");

      const countRes = await DepartmentService.countEmployees(dept.id);
      setEmployeeCount(countRes.data.employeeCount);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSearchMessage("Department not found.");
      } else {
        setSearchMessage("Error searching for department.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-8 offset-md-2">
          <h3 className="text-center mb-4">Department Management</h3>

          {/* Section 1: Add Department */}
          <div className="card mb-4">
            <div className="card-header">Add Department</div>
            <div className="card-body">
              <form className="form-inline" onSubmit={handleAddDepartment}>
                <div
                  className="form-group mr-2"
                  style={{ display: "flex", width: "100%" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Department name"
                    value={newDeptName}
                    onChange={(e) => setNewDeptName(e.target.value)}
                    style={{ flex: 1, marginRight: "8px" }}
                  />
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </form>
              {addMessage && <p className="mt-2">{addMessage}</p>}
            </div>
          </div>

          {/* Section 2: Find Department */}
          <div className="card">
            <div className="card-header">Find Department</div>
            <div className="card-body">
              <form className="form-inline" onSubmit={handleFindDepartment}>
                <div
                  className="form-group mr-2"
                  style={{ display: "flex", width: "100%" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={handleSearchChange}
                    style={{ flex: 1, marginRight: "8px" }}
                  />
                  <button
                    type="submit"
                    className={
                      searchName.trim()
                        ? "btn btn-success"
                        : "btn btn-secondary"
                    }
                  >
                    Find
                  </button>
                </div>
              </form>

              {/* Suggestions list shown while typing */}
              {suggestions.length > 0 && (
                <div
                  className="list-group mt-2"
                  style={{ maxHeight: "150px", overflowY: "auto" }}
                >
                  {suggestions.map((dept) => (
                    <button
                      type="button"
                      key={dept.id}
                      className="list-group-item list-group-item-action"
                      onClick={async () => {
                        // Fill input with selected name
                        setSearchName(dept.name);
                        setSuggestions([]);

                        // Optionally run same logic as clicking Find
                        try {
                          const res = await DepartmentService.findByName(
                            dept.name
                          );
                          const d = res.data;
                          setSearchResult(d);
                          setSearchMessage("");
                          const countRes =
                            await DepartmentService.countEmployees(d.id);
                          setEmployeeCount(countRes.data.employeeCount);
                        } catch (error) {
                          if (error.response && error.response.status === 404) {
                            setSearchMessage("Department not found.");
                          } else {
                            setSearchMessage("Error searching for department.");
                          }
                        }
                      }}
                    >
                      {dept.name}
                    </button>
                  ))}
                </div>
              )}

              {searchMessage && <p className="mt-2">{searchMessage}</p>}

              {searchResult && (
                <div className="mt-3">
                  <h5>Department Details</h5>
                  <p>
                    <strong>Id:</strong> {searchResult.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {searchResult.name}
                  </p>
                  {employeeCount !== null && (
                    <p>
                      <strong>Employees:</strong> {employeeCount}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepartmentComponent;
