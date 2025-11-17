import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ListEmployeeComponents from './components/ListEmployeeComponents';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import DepartmentComponent from './components/DepartmentComponent';
import HeaderComponents from './components/HeaderComponents';
import FooterComponents from './components/FooterComponents';

function App() {
  return (
    <Router>
      <HeaderComponents />

      <div className="container">
        <Routes>
          {/* Employees as default */}
          <Route path="/" element={<ListEmployeeComponents />} />
          <Route path="/employees" element={<ListEmployeeComponents />} />

          {/* Employee CRUD */}
          <Route path="/add-employee" element={<CreateEmployeeComponent />} />
          <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />} />
          <Route path="/view-employee/:id" element={<ViewEmployeeComponent />} />

          {/* Department screen (add + find) */}
          <Route path="/departments" element={<DepartmentComponent />} />
        </Routes>
      </div>

      <FooterComponents />
    </Router>
  );
}

export default App;
