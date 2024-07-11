# Blog API

## How the Script Works

Here's a breakdown of the `package.json` scripts and dependencies for your `blog-api` project:

### Scripts

1. **`start`**: This script runs the application using Node.js by executing the compiled JavaScript file located in the `dist` directory.

   ```json
   "start": "node dist/app.js"
   ```

2. **`dev`**: This script runs the application using `nodemon`, which automatically restarts the application whenever file changes are detected. This is useful for development.

   ```json
   "dev": "nodemon dist/app.js"
   ```

3. **`build`**: This script uses the TypeScript compiler (`tsc`) to watch for file changes and compile TypeScript files into JavaScript files. The `--watch` flag makes it continuously watch for changes.
   ```json
   "build": "npx tsc --watch"
   ```

### Dependencies

- **`bcryptjs`**: A library to hash and compare passwords securely.
- **`cors`**: A middleware to enable Cross-Origin Resource Sharing (CORS) in Express applications.
- **`dotenv`**: A module to load environment variables from a `.env` file into `process.env`.
- **`express`**: A web framework for Node.js used to build web applications and APIs.
- **`jsonwebtoken`**: A library to create and verify JSON Web Tokens (JWTs) for authentication.
- **`mongoose`**: An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a straightforward, schema-based solution to model application data.

### DevDependencies

- **`@types/*`**: TypeScript type definitions for various packages to enable type checking and IntelliSense in development.
- **`ts-node`**: A TypeScript execution environment and REPL for Node.js.
- **`typescript`**: The TypeScript language itself.

## Brief Explanation of the Application

Here's an overview of the provided `app.ts` file, which is the main entry point of your application:

1. **Importing Modules**:

   - `express`: To create the Express application.
   - `mongoose`: To connect to the MongoDB database.
   - `dotenv`: To load environment variables from a `.env` file.
   - `cors`: To enable CORS.
   - Routes: Importing route handlers for posts, authentication, and user-related operations.

   ```typescript
   import express from 'express';
   import mongoose from 'mongoose';
   import { config } from 'dotenv';
   import cors from 'cors';
   import post from './routes/post';
   import auth from './routes/auth';
   import user from './routes/user';
   ```

2. **Initialize Express App**:

   - Create an Express application instance.
   - Load environment variables using `dotenv`.
   - Define the port number from environment variables or use the default value of 5000.

   ```typescript
   const app = express();
   config();
   const PORT = process.env.PORT || 5000;
   ```

3. **Middleware**:

   - `express.json()`: Middleware to parse JSON bodies in incoming requests.
   - `cors()`: Middleware to enable CORS for all incoming requests.

   ```typescript
   app.use(express.json());
   app.use(cors());
   ```

4. **Routes**:

   - Define the routes for posts, authentication, and user-related operations, and associate them with their respective route handlers.

   ```typescript
   app.use('/api/posts', post);
   app.use('/api/auth', auth);
   app.use('/api/users', user);
   ```

5. **Connect to MongoDB**:

   - Connect to the MongoDB database using the URI from the environment variables.
   - Log a success message once connected.
   - Start the Express server on the defined port.

   ```typescript
   const uri = process.env.MONGODB_URI as string;
   mongoose
     .connect(uri)
     .then(() => {
       console.log('Connected to MongoDB');
       app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
     })
     .catch((error) =>
       console.error('Error connecting to MongoDB:', error.message)
     );
   ```

## How the Application Works

1. **Setup and Configuration**:

   - Environment variables are loaded from a `.env` file.
   - The application connects to a MongoDB database using Mongoose.
   - Middleware is set up to handle JSON parsing and CORS.

2. **Routes and Controllers**:

   - The application defines routes for handling posts (`/api/posts`), user authentication (`/api/auth`), and user management (`/api/users`).
   - Each route is associated with its respective controller functions that define the logic for handling requests and responses.

3. **Database Operations**:

   - Mongoose models (`User` and `Post`) are used to interact with the MongoDB database.
   - CRUD operations are implemented in the controllers to create, read, update, and delete data.

4. **Authentication**:
   - JWT tokens are used for user authentication.
   - Middleware ensures that routes requiring authentication are protected and only accessible to authenticated users.

This setup provides a structured and efficient way to build and manage a blog API with essential features such as user authentication, post creation, and CRUD operations.
