# Student Management API

A simple Express.js REST API for managing student data with various endpoints to query student information.

## Features

- Get all students
- Get the topper student (highest CGPA)
- Calculate average CGPA of all students
- Get total student count
- Get student by ID
- Get students by branch

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Middleware:** CORS

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students` | Get all students |
| GET | `/students/topper` | Get student with highest CGPA |
| GET | `/students/average` | Get average CGPA of all students |
| GET | `/students/count` | Get total number of students |
| GET | `/students/:id` | Get student by ID |
| GET | `/students/branch/:branchName` | Get students by branch |

## Deployment

**Live URL:** https://assignment-01-bsp7.onrender.com/

**Postman Documentation:** https://documenter.getpostman.com/view/50839172/2sBXcGCyi4

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000`

## Sample Student Data

The API includes 10 sample students with the following fields:
- `id` - Unique identifier
- `name` - Student name
- `branch` - Branch (CSE, IT, ECE, AI, Data Science)
- `semester` - Current semester
- `cgpa` - CGPA score

## Example Requests

```bash
# Get all students
curl https://assignment-01-bsp7.onrender.com/students

# Get topper
curl https://assignment-01-bsp7.onrender.com/students/topper

# Get average CGPA
curl https://assignment-01-bsp7.onrender.com/students/average

# Get student by ID
curl https://assignment-01-bsp7.onrender.com/students/1

# Get students by branch
curl https://assignment-01-bsp7.onrender.com/students/branch/CSE
```
