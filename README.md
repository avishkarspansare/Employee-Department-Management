# Employee–Department Management 🚀 [web:44][file:1]

A small but mighty full‑stack app that lets you manage employees, departments, and who belongs where – powered by Spring Boot on the backend and React on the frontend. [web:43][file:11]  

---

## Why this project exists 💡 [web:54][file:7]

This app was built as a practice project to get hands‑on with a real Spring Boot + React stack before jumping onto client work. [web:44][file:7]  
It gives you end‑to‑end CRUD flow, JPA relationships, React routing, and a clean service layer so you can reuse the patterns in bigger projects. [web:45][file:12]  

---

## Tech Stack ⚙️ [web:49][file:7]

- **Backend:** Java, Spring Boot, Spring Web, Spring Data JPA. [web:45][file:7]  
- **Frontend:** React, React Router, Axios, Bootstrap. [web:44][file:13]  
- **Database:** MySQL (or any JPA‑compatible relational DB). [web:49][file:7]  
- **Build Tools:** Maven for backend, npm/yarn for frontend. [web:43][file:13]  

---

## What you can do 🎯 [web:69][file:1]

- Add, list, update, view, and delete employees from a web UI. [web:69][file:11]  
- Create departments with unique names and prevent duplicates at the API level. [web:47][file:6]  
- Assign employees to departments or keep them “On Bench” with no department set. [file:3][file:5]  
- Fetch how many employees sit in each department using a dedicated count endpoint. [web:49][file:6]  

---

## Project layout 🗂️ [web:44][file:7]

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

[web:44][file:1]  

The backend owns the REST API, and the frontend talks to it via small, focused service files so your UI code stays clean. [web:43][file:12]  

---

## Getting started in 2 terminals ⚡ [web:44][web:49]

### 1️⃣ Backend – Spring Boot API [web:45][file:7]

1. Go to the backend folder (where `pom.xml` lives). [web:45][file:7]  

2. Set your DB config in `application.properties` or `application.yml`: [web:49][file:7]  

spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

3. Run the API: [web:45][file:7]  

mvn spring-boot:run

4. You now have a REST backend at: [web:47][file:1]  

http://localhost:8080/api/v1

Key classes: [web:45][file:1]  

- `EmployeeController` – `/api/v1/employees` CRUD endpoints. [file:1][file:12]  
- `DepartmentController` – `/api/v1/departments` + search + employee count. [file:6][file:9]  
- `ResourceNotFoundException` – clean 404 when something is missing. [file:2][file:1]  

---

### 2️⃣ Frontend – React UI [web:44][file:13]

1. Go to the frontend folder (where `package.json` lives). [web:44][file:13]  
2. Install dependencies: [web:44][file:13]  

npm install

or
yarn install

3. Start the dev server: [web:44][file:13]  

npm start

or
yarn start

4. Open the app at: [web:44][file:13]  

http://localhost:3000

The React app is already wired to call `http://localhost:8080/api/v1/...` through `EmployeeService.js` and `DepartmentService.js`. [web:44][file:9]  

---

## Domain model 🧩 [web:45][file:3]

- **Employee** – `id`, `firstName`, `lastName`, `emailId`, optional `department`. [file:5][file:1]  
- **Department** – `id`, unique `name`, list of `employees`. [file:3][file:6]  
- Relationship: `Many Employees -> One Department` with `@ManyToOne` / `@OneToMany`, plus `@JsonIgnoreProperties` to avoid infinite JSON loops. [web:49][file:3]  

This means you can safely fetch a department and see its employees, or fetch an employee and see its department, without blowing up the JSON serializer. [web:49][file:5]  

---

## API cheat sheet 🔌 [web:49][file:1]

### Employees [file:1][file:12]

- `GET /api/v1/employees` – list all employees. [file:1][file:11]  
- `POST /api/v1/employees` – create a new employee. [file:1][file:12]  
- `GET /api/v1/employees/{id}` – get employee by id. [file:1][file:14]  
- `PUT /api/v1/employees/{id}` – update employee. [file:1][file:15]  
- `DELETE /api/v1/employees/{id}` – delete employee. [file:1][file:11]  

Wrapped by `EmployeeService.js` in the frontend so components just call `EmployeeService.getEmployees()` and friends. [web:44][file:12]  

### Departments [file:6][file:9]

- `GET /api/v1/departments` – list all departments. [file:6][file:9]  
- `POST /api/v1/departments` – create department (rejects duplicate names). [file:6][file:8]  
- `GET /api/v1/departments/{id}` – get department by id. [file:6][file:3]  
- `GET /api/v1/departments/search?name={name}` – search by name (case‑insensitive). [file:6][file:9]  
- `GET /api/v1/departments/{id}/employees/count` – number of employees in that department. [file:6][file:9]  

All of these are consumed by `DepartmentService.js` so the React components stay focused on UI logic. [web:44][file:9]  

---

## Frontend flow 👀 [web:69][file:11]

- `ListEmployeeComponents.jsx` – main table with buttons to add, update, delete, and view employees. [web:69][file:11]  
- `UpdateEmployeeComponent.jsx` – edit form with department dropdown, supports “no department = bench”. [web:69][file:15]  
- `ViewEmployeeComponent.jsx` – read‑only details card that shows department name if set, otherwise “On Bench”. [file:14][file:5]  
- Simple `withRouter` HOCs inject `navigate` / `params` so class components can still use React Router v6 features. [web:19][file:11]  

---

## Next steps / ideas 🚧 [web:45][web:54]

- Add validation messages for required fields and invalid email addresses on both backend and frontend. [web:49][file:1]  
- Plug in pagination and search on the list page once your dataset grows. [web:45][file:11]  
- Introduce authentication and role‑based access if you want to simulate a real client project. [web:44][file:7]  

Use this repo as your “playground” to try things before you pitch them in a production codebase. [web:60][file:1]  
