# Employee–Department Management 🚀

A small but mighty full‑stack app that lets you manage employees, departments, and who belongs where – powered by Spring Boot on the backend and React on the frontend.

---

## Why this project exists 💡

This app was built as a practice project to get hands‑on with a real Spring Boot + React stack before jumping onto client work.  
It gives you end‑to‑end CRUD flow, JPA relationships, React routing, and a clean service layer so you can reuse the patterns in bigger projects. 

---

## Tech Stack ⚙️ 

- **Backend:** Java, Spring Boot, Spring Web, Spring Data JPA.
- **Frontend:** React, React Router, Axios, Bootstrap.
- **Database:** MySQL (or any JPA‑compatible relational DB).
- **Build Tools:** Maven for backend, npm/yarn for frontend.

---

## What you can do 🎯

- Add, list, update, view, and delete employees from a web UI. 
- Create departments with unique names and prevent duplicates at the API level.   
- Assign employees to departments or keep them “On Bench” with no department set. 
- Fetch how many employees sit in each department using a dedicated count endpoint.  

---

## Project layout 🗂️

backend/
controller/ # REST controllers (EmployeeController, DepartmentController)
model/ # JPA entities (Employee, Department)
repository/ # Spring Data repositories
exception/ # ResourceNotFoundException, etc.
EmployeeManagementApplication.java

frontend/
components/ # React class components (list, view, update)
services/ # Axios wrappers (EmployeeService, DepartmentService)
index.js # React entrypoint
index.css # Global styling  

The backend owns the REST API, and the frontend talks to it via small, focused service files so your UI code stays clean.  

---

## Getting started in 2 terminals ⚡

### 1️⃣ Backend – Spring Boot API

1. Go to the backend folder (where `pom.xml` lives).

2. Set your DB config in `application.properties` or `application.yml`:  

spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

3. Run the API: 

mvn spring-boot:run

4. You now have a REST backend at: 

http://localhost:8080/api/v1

Key classes: 

- `EmployeeController` – `/api/v1/employees` CRUD endpoints.
- `DepartmentController` – `/api/v1/departments` + search + employee count. 
- `ResourceNotFoundException` – clean 404 when something is missing.

---

### 2️⃣ Frontend – React UI

1. Go to the frontend folder (where `package.json` lives).
2. Install dependencies: 

npm install

or
yarn install

3. Start the dev server:

npm start

or
yarn start

4. Open the app at: 

http://localhost:3000

The React app is already wired to call `http://localhost:8080/api/v1/...` through `EmployeeService.js` and `DepartmentService.js`. 

---

## Domain model 🧩

- **Employee** – `id`, `firstName`, `lastName`, `emailId`, optional `department`.  
- **Department** – `id`, unique `name`, list of `employees`.  
- Relationship: `Many Employees -> One Department` with `@ManyToOne` / `@OneToMany`, plus `@JsonIgnoreProperties` to avoid infinite JSON loops. 

This means you can safely fetch a department and see its employees, or fetch an employee and see its department, without blowing up the JSON serializer. 

---

## API cheat sheet 🔌

### Employees 

- `GET /api/v1/employees` – list all employees. 
- `POST /api/v1/employees` – create a new employee. 
- `GET /api/v1/employees/{id}` – get employee by id. 
- `PUT /api/v1/employees/{id}` – update employee. 
- `DELETE /api/v1/employees/{id}` – delete employee. 

Wrapped by `EmployeeService.js` in the frontend so components just call `EmployeeService.getEmployees()` and friends. 

### Departments

- `GET /api/v1/departments` – list all departments. 
- `POST /api/v1/departments` – create department (rejects duplicate names).
- `GET /api/v1/departments/{id}` – get department by id. [file:6][file:3]  
- `GET /api/v1/departments/search?name={name}` – search by name (case‑insensitive). 
- `GET /api/v1/departments/{id}/employees/count` – number of employees in that department.

All of these are consumed by `DepartmentService.js` so the React components stay focused on UI logic.

---

## Frontend flow 👀

- `ListEmployeeComponents.jsx` – main table with buttons to add, update, delete, and view employees.
- `UpdateEmployeeComponent.jsx` – edit form with department dropdown, supports “no department = bench”.
- `ViewEmployeeComponent.jsx` – read‑only details card that shows department name if set, otherwise “On Bench”. 
- Simple `withRouter` HOCs inject `navigate` / `params` so class components can still use React Router v6 features.

---

## Next steps / ideas 🚧 

- Add validation messages for required fields and invalid email addresses on both backend and frontend. 
- Plug in pagination and search on the list page once your dataset grows.
- Introduce authentication and role‑based access if you want to simulate a real client project.

Use this repo as your “playground” to try things before you pitch them in a production codebase. 
