# Smart Field System - Frontend

This is the frontend portion of the **Smart Field System**, an application built to handle agricultural field coordination and workflow management. 

Below is an outline of the step-by-step process I followed to build and structure this frontend from scratch.

##  Development Steps

### 1. Scaffolding the React App
To start the project with a fast, modern build environment, I initialized the repository using **Vite** combined with the React template. This provided me with instant hot module replacement (HMR), a lightweight server, and standard ESLint configurations right out of the box.

### 2. Organizing the Directory Structure
I structured the `src` directory cleanly based on functionality to keep the application scalable and easy to maintain over time:
- **`src/Pages/`**: Contains the root page views, primarily the `Home.jsx` access gateway.
- **`src/Components/`**: Houses the main role-specific interfaces, specifically the `Admin.jsx` and `Agent.jsx` dashboards.
- **`src/Context/`**: Dedicated entirely to managing global application state (`AuthContext.jsx`).

### 3. Implementing Global Authentication State
Because different users (Coordinators vs. Agents) require entirely different dashboard views, I created an `AuthContext` using React's native Context API. This enabled me to:
- Globally handle and retain the current user payload (along with their JWT) once the backend verifies them.
- Conveniently pass the `login`, `logout`, and current `user role` downward to any component without cumbersome prop drilling.

### 4. Designing the Authentication Interface (`Home.jsx`)
I developed `Home.jsx` to serve as the unified landing page which toggles between **User Registration** and **Login**. During the development lifecycle of this page, I:
- Initially constructed a visual "temporary bypass" just to test how routing would behave based on selected roles.
- Later completely replaced the mock bypass with proper `fetch` sequences pointing to our deployed Node.js backend endpoints (`/api/register` and `/api/login`).
- Hardened it by resolving a few cross-origin configuration integration errors, ultimately resulting in secure and reliable storage of user credentials onto the cloud Aiven MySQL database.

### 5. Configuring Client-Side Routing
I brought in `react-router-dom` to smoothly navigate the UI without browser reloads. In `App.jsx`, I defined specific protected paths:
- **`/`**: Defaulting to the `Home` authentication portal.
- **`/admin`**: Redirecting coordinators to the `AdminDashboard` component upon valid auth.
- **`/agent`**: Directing agents directly into their specific `AgentDashboard` instance.
- I explicitly included a wildcard catch-all route `<Route path="*" element={<Navigate to="/" />} />` at the bottom to neatly handle invalid URLs and force non-authenticated users back home.

### 6. Building Role-Based Dashboards
Lastly, I executed the heavy lifting inside `Components/Admin.jsx` and `Components/Agent.jsx`:
- Built React layouts capable of dynamically mapping fields to their current growing/harvesting statuses based on REST API responses from our smart field server.
- Ensured seamless fetch calls handle the heavy flow of task distributions directly managed natively in React hook (`useEffect` and `useState`) lifecycles.

##  Stack & Tools Used

- **Framework**: React 19
- **Build Ecosystem**: Vite + React Compiler Plugins
- **Routing**: React Router DOM (v7)
- **Styling**: Standard isolated CSS models (`App.css` and `index.css`)
