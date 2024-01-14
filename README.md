# Minimalist Node.js API with MySQL and TypeORM

This project is a lightweight Node.js API utilizing MySQL as the database and TypeORM as the Object-Relational Mapping (ORM) framework.

## Getting Started

### Prerequisites

Ensure you have the following installed before running the project:

- Node.js (stable version)
- MySQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/yourproject.git

   ```

2. Navigate to Project Folder
   cd yourproject

3. Install dependencies:
   npm install

4. Usage
   To start the project in development mode, run:
   npm run start:dev

The API will be accessible at http://localhost:3000/api.

Environment Variables
Ensure you have the following environment variables configured:

SECRET_KEY: Your secret key for application security.
DB_HOST: MySQL database host (e.g., localhost).
DB_PORT: MySQL database port (e.g., 3306).
DB_USERNAME: MySQL database username.
DB_PASSWORD: MySQL database password.
DB_NAME: MySQL database name.
DB_SYNC: Set to true for automatic database synchronization (useful in development).
NODE_ENV: Set to development.
