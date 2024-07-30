**User Authentication with Express and Mongoose**
This repository provides a simple implementation of user authentication using Express and Mongoose. It includes endpoints for signing up, signing in, getting user details, and logging out.

**Features**
Sign Up: Create a new user account
Sign In: Authenticate a user and issue a token
Get User: Retrieve details of the authenticated user
Log Out: Log out the user by invalidating the token
**Prerequisites**
Node.js
MongoDB
**API Endpoints**
  **Sign Up**
URL: /signup
Method: POST

  **Sign In**
URL: /signin
Method: POST

  **Get User**
URL: /getuser
Method: GET
  **Log Out**
URL: /logout
Method: POST

**Implementation**
Setting Up Express and Mongoose
Install Dependencies:(express, mongoose, dotenv, bcrypt, cors, jsonwebtoken, email-validator,cookie-parser,nodemon)
  
Create the Server:
Define the User Model:
Create User Routes:
Create JWT Token
Create Auth Middleware:
