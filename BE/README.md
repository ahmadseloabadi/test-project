# Ahmad Selo Abadi

# Routers

- CARS (only access by admin or superadmin)

1. Get list cars (GET) = http://localhost:8000/api/cars
2. Get car by id (GET) = http://localhost:8000/api/cars/:id
3. Create car (POST) = http://localhost:8000/api/cars
4. Delete car by id (DELETE) = http://localhost:8000/api/cars/:id
5. Update car by id (PATCH) = http://localhost:8000/api/cars/:id

- USERS (only access by superadmin)

1. Get list users (GET) = http://localhost:8000/api/users
2. Get user by id (GET) = http://localhost:8000/api/users/:id
3. Create user (POST) = http://localhost:8000/api/users
4. Delete user by id (DELETE) = http://localhost:8000/api/users/:id
5. Update user by id (PATCH) = http://localhost:8000/api/users/:id

# Getting Started

## Instalation

1. Clone the repo
2. Installation package
   ```sh
   npm install
   ```
3. Config db & cloudinary
   - setting config db & cloudinary pada file .env-example dan rubah menjadi .env
   - migrate cars and users table and seeders
   ```sh
   - knex migrate:up 20231108162219_create_cars.ts
   - knex migrate:up 20231117101034_create_users.ts
   - npm run seed
   ```
4. Run
   ```sh
   npm run dev
   ```
