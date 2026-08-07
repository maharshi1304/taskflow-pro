# 🚀 TaskFlow Pro

A modern Task Management Application built using React, Vite, Tailwind CSS, Context API and Docker.

The application supports complete CRUD operations with a live JSON API, Docker containers, Docker Compose orchestration, GitLab CI/CD pipeline and production deployment.

---

## 🌐 Live Demo

Frontend
https://taskflow-pro-99a6.vercel.app/

Backend API

https://taskflow-json-api.onrender.com/tasks


## ✨ Features

- User Login
- Dashboard
- Task CRUD
- Search Tasks
- Filter Tasks
- Sort Tasks
- Priority Management
- Due Date Tracking
- Dashboard Statistics
- CSV Import
- CSV Export
- Dark Mode
- API Status Indicator
- Docker Support
- Docker Compose
- GitLab CI/CD
- Responsive UI

## 🛠 Tech Stack

Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Context API
- React Toastify

Backend

- JSON Server

DevOps

- Docker
- Docker Compose
- GitLab CI/CD
- GitLab Runner
- AWS EC2

Deployment

- Vercel
- Render

## 🏗 Project Architecture

TaskFlow Pro ko frontend, API, containerization aur CI/CD layers me divide kiya gaya hai.

```text
┌─────────────────────────────────────────────────────────────┐
│                         END USER                            │
│                                                             │
│  Recruiter / Developer opens the live TaskFlow Pro website │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ HTTPS Request
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND — VERCEL                        │
│                                                             │
│  React + Vite + Tailwind CSS                                │
│                                                             │
│  Responsibilities:                                          │
│  • Login and protected routes                              │
│  • Dashboard and task cards                                │
│  • Search, filter and sort                                 │
│  • Add, edit, complete and delete tasks                    │
│  • CSV import and export                                   │
│  • Dark mode and responsive layout                         │
│                                                             │
│  Axios uses:                                                │
│  VITE_API_BASE_URL=https://taskflow-json-api.onrender.com   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ REST API Requests
                               │
                               │ GET    /tasks
                               │ POST   /tasks
                               │ PATCH  /tasks/:id
                               │ DELETE /tasks/:id
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND API — RENDER                       │
│                                                             │
│  Dockerized JSON Server API                                 │
│                                                             │
│  Responsibilities:                                          │
│  • Receive frontend requests                               │
│  • Return task data                                        │
│  • Create new tasks                                        │
│  • Update task information                                 │
│  • Delete tasks                                            │
│                                                             │
│  Runtime file:                                              │
│  /app/data/db.json                                          │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ Read / Write
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                       TASK DATA                             │
│                                                             │
│  JSON database structure:                                  │
│                                                             │
│  {                                                          │
│    "tasks": [...]                                           │
│  }                                                          │
│                                                             │
│  Used for portfolio CRUD demonstration                      │
└─────────────────────────────────────────────────────────────┘


# Note:=> Exaplanation
1. User opens the Vercel frontend.

2. React loads tasks by calling:

   GET https://taskflow-json-api.onrender.com/tasks

3. The Render API reads data from db.json.

4. JSON data is returned to the React application.

5. TaskContext stores the response in React state.

6. Dashboard components display the latest task data.

7. When the user adds, edits, completes or deletes a task,
   Axios sends the corresponding REST request.

8. After a successful API response, React state is updated
   without reloading the complete page.

   🐳 Local Docker Architecture
   For local container-based testing, the frontend and API run as separate Docker services.

                         Developer's Browser
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
          http://localhost:8080       http://localhost:5001/tasks
                    │                           │
                    ▼                           ▼
┌─────────────────────────────┐   ┌─────────────────────────────┐
│   FRONTEND CONTAINER        │   │      API CONTAINER          │
│                             │   │                             │
│ React production build      │   │ Node.js                     │
│ served by Nginx             │   │ JSON Server                 │
│                             │   │                             │
│ Container port: 80          │   │ Container port: 5001        │
│ Host port: 8080             │   │ Host port: 5001             │
└──────────────┬──────────────┘   └──────────────┬──────────────┘
               │                                 │
               │ Axios REST requests             │
               └─────────────────┬───────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │ Docker Named Volume     │
                    │                         │
                    │ taskflow-api-data       │
                    │ mounted at /app/data    │
                    │                         │
                    │ Preserves local tasks   │
                    └─────────────────────────┘

⚙ GitLab CI/CD Architecture
Every push to the GitLab repository triggers the self-hosted CI/CD runner.

┌───────────────────────┐
│ Developer changes code│
└───────────┬───────────┘
            │
            │ git add
            │ git commit
            │ git push
            ▼
┌───────────────────────┐
│ GitLab Repository     │
└───────────┬───────────┘
            │
            │ Pipeline triggered
            ▼
┌───────────────────────────────────────────────┐
│ Self-hosted GitLab Runner on AWS EC2          │
│                                               │
│ Executor: Docker                              │
│ Runner tags: docker, taskflow, aws            │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
        ┌─────────────────────────────────┐
        │ 1. Install dependencies         │
        │                                 │
        │ Frontend: npm ci                │
        │ API: npm ci                     │
        └───────────────┬─────────────────┘
                        │
                        ▼
        ┌─────────────────────────────────┐
        │ 2. Code validation              │
        │                                 │
        │ Frontend lint                   │
        │ API syntax validation           │
        └───────────────┬─────────────────┘
                        │
                        ▼
        ┌─────────────────────────────────┐
        │ 3. Frontend production build    │
        │                                 │
        │ npm run build                   │
        │ dist artifact created           │
        └───────────────┬─────────────────┘
                        │
                        ▼
        ┌─────────────────────────────────┐
        │ 4. Frontend Docker verification │
        │                                 │
        │ Build frontend image            │
        │ Start Nginx container           │
        │ Validate Nginx configuration    │
        │ Check rendered index page       │
        └───────────────┬─────────────────┘
                        │
                        ▼
        ┌─────────────────────────────────┐
        │ 5. API Docker verification      │
        │                                 │
        │ Build API image                 │
        │ Start API container             │
        │ Call /tasks endpoint            │
        │ Verify valid JSON response      │
        └───────────────┬─────────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │ Pipeline Passed  │
              │ All jobs green   │
              └──────────────────┘

🔄 Complete Project Workflow:

Developer updates React or API code
                │
                ▼
Code is pushed to GitLab
                │
                ▼
GitLab Runner installs, validates and builds the project
                │
                ▼
Frontend and API Docker images are verified
                │
                ▼
Pipeline becomes green
                │
                ▼
Vercel serves the live React frontend
                │
                ▼
React sends requests to the Render JSON API
                │
                ▼
Render API performs CRUD operations on task data


# Folder Structure:
taskflow-pro

│

├── api-server

├── public

├── src

│

├── components

├── pages

├── context

├── hooks

├── utils

├── services

│

├── Dockerfile

├── compose.yaml

├── nginx.conf

└── README.md


## Installation
Clone Repository
git clone <repo>
cd taskflow-pro
Install dependencies
npm install
Run
npm run dev


## Docker
Frontend

docker build -t taskflow-pro .

docker run -p 8080:80 taskflow-pro


## Docker Compose:
docker compose up -d --build

Frontend

http://localhost:8080

Backend

http://localhost:5001/tasks


## Deployment:
Frontend
Vercel
Backend
Render
CI/CD
GitLab Runner

## API:
GET /tasks
POST /tasks
PATCH /tasks/:id
DELETE /tasks/:id

##Screenshot:
Home
Dashboard
Dark Mode
Docker
GitLab Pipeline

## 👨‍💻 Author
Maharshi
B.Tech CSE
Frontend Developer
DevOps Enthusiast
GitLab CI/CD
Docker
React
Vite

## 👨‍💻 Author
Maharshi
B.Tech CSE
Frontend Developer
DevOps Enthusiast
GitLab CI/CD
Docker
React
Vite
