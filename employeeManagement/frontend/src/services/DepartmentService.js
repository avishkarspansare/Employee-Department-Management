// src/services/DepartmentService.js
import axios from 'axios';

const DEPARTMENT_API_BASE_URL = "http://localhost:8080/api/v1/departments";

class DepartmentService {

    // 1) Get all departments (for dropdowns, debug, etc.)
    getDepartments() {
        return axios.get(DEPARTMENT_API_BASE_URL);
    }

    // 2) Create department (backend already checks "if exists")
    createDepartment(department) {
        return axios.post(DEPARTMENT_API_BASE_URL, department);
    }

    // 3) Find by name: /departments/search?name=IT
    findByName(name) {
        return axios.get(`${DEPARTMENT_API_BASE_URL}/search`, {
            params: { name }
        });
    }

    // 4) Count employees in a department: /departments/{id}/employees/count
    countEmployees(departmentId) {
        return axios.get(`${DEPARTMENT_API_BASE_URL}/${departmentId}/employees/count`);
    }
}

export default new DepartmentService();
