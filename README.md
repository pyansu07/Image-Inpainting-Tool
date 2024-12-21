# Image Inpainting Tool

This project is an Image Inpainting Tool built with React for the frontend and FastAPI for the backend. It allows users to upload images and generate masks for inpainting.

## Live - https://image-inpainting-tool-1.onrender.com

## Table of Contents
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Running the Project Locally](#running-the-project-locally)
- [Libraries Used](#libraries-used)

## Technologies Used
- **Frontend**: React, TypeScript
- **Backend**: FastAPI, Python
- **Database**: MongoDB (MongoDB Atlas)

## Getting Started

### Prerequisites
- Node.js
- Python
- MongoDB (for database)

## Running the Project Locally

### Frontend (React)

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/image-inpainting-tool.git
   cd image-inpainting-tool
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:<port>`. `//visible on your terminal`

### Backend (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd server
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

## Libraries Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Fabric.js**: A JavaScript library for working with HTML5 canvas.
- **Lucide React**: A collection of icons for React.

### Backend
- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python.
- **Pydantic**: Data validation and settings management using Python type annotations.
- **Uvicorn**: A lightning-fast ASGI server for Python.
- **Pymongo**: A Python driver for MongoDB.

### Database
- **MongoDB**: A NoSQL database for storing metadata of images.
