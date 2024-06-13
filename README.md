# Amalitech File Server Project

Here's a README template for the  File Server Project:

---

# Document Distribution Platform

A Node.js and Express-based platform for distributing documents such as wedding cards, admission forms, and more. The platform allows users to sign up, log in, view and search for downloadable files, and send files via email. Admins can upload files and view statistics on downloads and email sends.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication: Signup, login, password reset, and email verification
- View and search downloadable files
- Send files via email
- Admin functionalities:
  - Upload files with title and description
  - View statistics on file downloads and email sends

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/document-distribution-platform.git
   cd document-distribution-platform
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

## Usage

### Running the server

To run the server in development mode with automatic restarts, use:
```sh
npx nodemon server.js
```

### Accessing the application

The server will be running on `http://localhost:3000`.

## API Endpoints

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

- **GET** `/users`
  - Description: Get all users

### File Routes

- **POST** `/files`
  - Description: Upload a new file
  - Body:
    ```json
    {
      "title": "File Title",
      "description": "File Description",
      "filePath": "path/to/file"
    }
    ```

- **GET** `/files`
  - Description: Get all files

- **POST** `/send-file`
  - Description: Send a file to an email
  - Body:
    ```json
    {
      "email": "recipient@example.com",
      "fileId": "60d21b4967d0d8992e610c85"
    }
    ```

### Admin Routes

- **POST** `/admin/upload`
  - Description: Admin route to upload files (requires authentication)
  - Body: Multipart/form-data with fields `title`, `description`, and `file`

- **GET** `/admin/stats`
  - Description: Get statistics about downloads and emails sent (requires authentication)

## Models

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
MONGODB_URI=mongodb://localhost:27017/mydatabase
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

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

Feel free to customize the README as needed for your specific project. This template provides a clear and organized structure that follows common GitHub conventions.
