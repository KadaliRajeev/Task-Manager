# AI Task Manager – Full Stack Assessment

## Overview

This project is a full-stack Task Manager application built using:

- Backend: Python + Flask + SQLAlchemy
- Frontend: React (Vite)
- Database: SQLite
- AI Feature: Modular task description generation

The application allows users to:

- Create tasks
- View tasks
- Toggle completion status
- Delete tasks
- Generate AI-powered task descriptions

---

## Architecture

### Backend (Flask API)

- RESTful API structure
- SQLite relational database
- SQLAlchemy ORM
- Modular AI route (`/generate-description`)
- CORS enabled for frontend integration

### Frontend (React)

- Axios for API communication
- React hooks (useState, useEffect)
- Dark themed UI
- Real-time updates
- AI suggestion display

---

## AI Design Approach

The AI feature is implemented as a modular backend route:

