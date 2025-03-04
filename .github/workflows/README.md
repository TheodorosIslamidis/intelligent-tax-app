# CI/CD Pipeline for Intelligent Tax App

This repository includes a GitHub Actions CI/CD pipeline configuration that automates building, testing, and containerizing both the frontend and backend of the Intelligent Tax App. The pipeline is designed to run on pushes or pull requests targeting the `master` branch.

## Overview

The pipeline performs the following tasks:

- **Repository Checkout:** Retrieves the latest version of your code.
- **Node.js Setup & Frontend Build:** Configures Node.js (version 22) to install dependencies and build the frontend located in the `./frontend` directory.
- **Docker Image Builds:** Creates Docker images for both the backend (`intelligent-tax-app-backend`) and frontend (`intelligent-tax-app-frontend`).
- **Python Setup & Backend Testing:** Sets up Python (version 3.11), installs necessary Python packages from the backend's `requirements.txt`, and runs tests using `pytest`.

## Triggering Events

The pipeline is triggered under the following conditions:

- **Push Events:** When changes are pushed to the `master` branch.
- **Pull Request Events:** When a pull request is opened or updated targeting the `master` branch.

## Pipeline Breakdown

### 1. Checkout Repository
- **Action:** `actions/checkout@v3`
- **Purpose:** Clones the repository so that subsequent steps have access to the code.

### 2. Setup Node.js
- **Action:** `actions/setup-node@v3`
- **Node.js Version:** 22
- **Purpose:** Prepares the environment for building the frontend application.

### 3. Build Frontend
- **Directory:** `./frontend`
- **Commands:**
  - `npm install`
  - `npm run build`
- **Purpose:** Installs frontend dependencies and builds the static assets.

### 4. Build Backend Docker Image
- **Command:** `docker build -t intelligent-tax-app-backend ./backend`
- **Purpose:** Packages the backend service into a Docker image.

### 5. Build Frontend Docker Image
- **Command:** `docker build -t intelligent-tax-app-frontend ./frontend`
- **Purpose:** Packages the frontend into a Docker image for deployment.

### 6. Setup Python
- **Action:** `actions/setup-python@v4`
- **Python Version:** 3.11
- **Purpose:** Sets up Python for running backend tests.

### 7. Install Dependencies
- **Directory:** `backend`
- **Command:** `pip install -r requirements.txt`
- **Purpose:** Installs required Python packages for the backend.

### 8. Run Tests
- **Directory:** `backend`
- **Command:** `python -m pytest`
- **Purpose:** Executes backend tests to ensure code integrity.

## Environment Variables

- **OPENAI_API_KEY:**  
  This variable is set using GitHub Secrets. Ensure that you have configured `OPENAI_API_KEY` in your repository settings under _Settings > Secrets_.

## Requirements

- **Docker:** Ensure Docker is installed and accessible in the build environment.
- **Node.js & NPM:** Required for building the frontend.
- **Python & pip:** Required for backend dependency management and testing.
- **Dockerfiles:** Present in both the `frontend` and `backend` directories.

## Customization

You can modify this pipeline to suit your project's needs by:
- Adjusting Node.js or Python versions.
- Updating build and test commands.
- Changing working directories if your project structure differs.
- Adding additional steps such as deployment or code linting.

## Contributing

If you have improvements, bug fixes, or feature suggestions for the CI/CD process, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

This README serves as documentation for the CI/CD pipeline configuration, guiding developers through its functionality and configuration options. Enjoy seamless automation with your Intelligent Tax App!
