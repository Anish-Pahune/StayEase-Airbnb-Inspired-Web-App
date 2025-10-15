# StayEase (Airbnb-Inspired Web App)

A full-stack web application inspired by **Airbnb**, built using **Node.js**, **Express.js**, **MongoDB**, and **EJS** templating.  
This project allows users to view, create, edit, and review property listings similar to Airbnb’s core functionality.

---

##  Features

-  User Authentication (Signup / Login / Logout)
-  CRUD Operations for Listings
-  Add and Manage Reviews
-  Error Handling & Validation
-  Flash Messages for Feedback
-  Responsive EJS Templates
-  Secure Password Hashing and Sessions

---

## Tech Stack

| Category        | Technologies Used                                     |
|-----------------|-------------------------------------------------------|
| **Frontend**    | HTML, CSS, JavaScript, EJS Templating                 |
| **Backend**     | Node.js, Express.js                                   |
| **Database**    | MongoDB                                               |
| **Other Tools** | Cloudinary, dotenv, express-session, Joi, Passport.js |

---

## Installation and Setup

### 1️⃣ Clone the Repository

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Setup Environment Variables

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/airbnbClone

# Session Secret
SECRET=mySuperSecretKey // Use any sequence of character

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret


## Database Initialization
node initData/index.js

## Run the Application
npm start

Then open your browser and visit:http://localhost:5500