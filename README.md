# Document Distribution Platform - Amalitech Project

A Node.js and Express-based platform for distributing documents such as wedding cards, admission forms, and more. The platform allows users to sign up, log in, view and search for downloadable files, and send files via email. Admins can upload files and view statistics on downloads and email sends.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Environment Variables](#environment-variables)
- [Frontend](#frontend)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication: Signup, login, password reset and verification
- View and search downloadable files
- Send files via email
- Admin functionalities:
  - Upload files with title and description
  - View statistics on file downloads and email sends

## Installation

### Backend

1. Clone the repository:
   ```sh
   git clone https://github.com/StrongStone6661/amalitech-file-server-project.git
   cd amalitech-file-server-project/backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the necessary environment variables (see [Environment Variables](#environment-variables)).

4. Start the server:
   ```sh
   npm start
   ```

### Frontend

1. Navigate to the `main` directory:
   ```sh
   cd amalitech-file-server-project
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

### Running the server

To run the server in development mode with automatic restarts, use:
```sh
npx nodemon index.js
```

### Accessing the application

The backend server will be running on `http://localhost:3001` and the frontend development server will be running on `http://localhost:5173`.

## API Endpoints

### Admin Routes

  - **POST** `/admin/signup`
    - Description: Create a new user : **Note** : This route does not have a frontend route
    - **How to setup admin:** Run this route using tools like Postman and setup an admin since this route doesn't have a frontend
    - Body:
      ```json
      {
        "name": "Admin Name",
        "email": "admin@example.com",
        "password": "password123"
      }
      ```
  - **POST** `/admin/login`
    - Description: Admin login with only password
    - Body:
      ```json
      {
        "password": "Admin Password",
      }
      ```

  - **POST** `/admin/upload`
    - Description: Admin route to upload files (requires authentication)
    - Body: Multipart/form-data with fields `title`, `description`, and `file`

  - **GET** `/api/data/allfiles`
    - Description: this route gets all the uploaded files with it stats

### User Routes

- **POST** `/users`
  - Description: Create a new user
  - Body:
    ```json
    {
      "name": "User Name",
      "email": "user@example.com",
      "password": "password123"
    }
    ```

### File Routes

- **POST** `/upload/singlefile`
  - Description: Upload a new file
  - Body:
    ```json
    {
      "title": "File Title",
      "description": "File Description",
      "filePath": "path/to/file"
    }
    ```

- **GET** `/api/data/allfiles`
  - Description: Get all files

- **POST** `/email/sendemail/:filename`
  - Description: Send a file to an email
  - Body:
    ```json
    {
      "email": "recipient@example.com",
      "filename": "60d21b4967d0d8992e610c85"
    }
    ```
- **GET** `/manage/delete/:id`
  - Description: Delete a an uploaded file

- **GET** `/api/download/:filename`
  - Description: Allow the user to download a file


## Models

### Admin Model
- `name`: String, required
- `email`: String, required, unique
- `password`: String, required


### User Model

- `name`: String, required
- `email`: String, required, unique
- `password`: String, required

### File Model

- `title`: String, required
- `description`: String, required
- `filePath`: String, required
- `downloads`: Number, default 0
- `emailsSent`: Number, default 0

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```plaintext
MONGODB_URI=mongodb://localhost:27017/mydatabase or atlas link
PORT=3001
EMAIL_USER=your-email@gmail.com (gmail)
EMAIL_PASS=your-email-password (gmail)
JWT_SECRET=your-secret-jwt
```

## Frontend

### Routes

- `/`: Login
- `/signup`: Signup
- `/password-forget`: Forgot Password
- `/reset-password/:token`: Reset Password
- `/admin-login`: Admin Login
- `/admin`: Admin Dashboard
- `/feedpage`: Feed Page 

### Setup

1. Navigate to the `main` directory and install dependencies:
   ```sh
   cd amalitech-file-server-project
   npm install
   ```

2. Start the Vite development server:
   ```sh
   npm run dev
   ```

The frontend will be running on `http://localhost:5173`.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
