# Intelligent Tax Filing Web Application

## Overview
This project is a full-stack web application that provides intelligent tax filing assistance by integrating a React front-end, a Flask backend, and AI-powered tax advice using the OpenAI API.

## Setup Instructions

### Frontend
1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies with `pip install -r requirements.txt`.
3. Set your OpenAI API key in the environment variable `OPENAI_API_KEY`.
4. Run the Flask app using `python app.py`.

### Docker
1. Ensure Docker is installed.
2. Run `docker-compose up --build` from the project root.
3. The frontend is available at [http://localhost:3000](http://localhost:3000) and the backend at [http://localhost:5000](http://localhost:5000).

### CI/CD
This project uses GitHub Actions for continuous integration. See `.github/workflows/ci.yml` for details.

## Presentation
A short presentation explaining the project, challenges faced, and solutions implemented is available [here](#).

