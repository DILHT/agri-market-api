# Agrimakert API

A RESTful API for an e-commerce platform with authentication, role-based access, and product management.

## Features

- User authentication (register, login)
- Role-based access control (`farmer`, `customer`)
- Product management (CRUD)
- Health check endpoint

## Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- dotenv
- cors

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/agrimakert-api.git
cd agrimakert-api
```
## Install dependencies:

```bash
npm 
```
## Create a .env file based on .env.example:

## Run the server:

```bash
npm run dev
```
## API Endpoints
### Health Check
```bash
GET /healthz
```
```bash
Response: { "status": "ok" }
```
### Authentication
```bash
POST /auth/register
POST /auth/login
```

### Products (Role-based access: only farmer can create/update/delete)
```bash
GET /products
GET /products/:id
POST /products
PUT /products/:id
DELETE /products/:id
```
## Example Product JSON
```bash
{
  "name": "Apple",
  "description": "Fresh red apples",
  "price": 1.5,
  "quantity": 100
}
```

## Database Setup
### Create PostgreSQL user and database:

```bash
CREATE USER username WITH PASSWORD 'pwd';
CREATE DATABASE dbname;
GRANT ALL PRIVILEGES ON DATABASE dbname TO username;
Grant permissions on public schema:


GRANT USAGE, CREATE ON SCHEMA public TO username;
ALTER SCHEMA public OWNER TO username;
```
### Ensure PostgreSQL is running.

Use JWT tokens for authentication.

Role-based access is enforced in middleware.

## License
### MIT