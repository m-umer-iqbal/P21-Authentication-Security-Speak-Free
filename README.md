# SECRETS - An Anonymous Secret Sharing Platform

A full-stack web application built with Node.js and Express that allows users to register, log in, and share secrets anonymously. This project served as a hands-on learning journey into backend security, progressively implementing industry-standard authentication techniques from basic to advanced.

## Focus: **Password Hashing & Authentication**

## 🚀 Features
- User Registration & Login System
- Anonymous Secret Sharing
- Session-Based Authentication
- OAuth 2.0 Social Login (Google & Facebook)
- Responsive UI with Bootstrap and CSS

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** Passport.js (Local, Google OAuth 2.0, Facebook)
- **Templating:** EJS
- **Frontend:** Bootstrap, CSS
- **Password Hashing:** bcrypt

## 📈 Learning & Implementation Journey
This project was built iteratively, with each level introducing a more secure and robust authentication method.

## Level 1: Plain Text Storage

- **Concept:** Basic user registration and login.
- **Implementation:** User credentials (email and password) were stored in the database as plain text.
- **Purpose:** To establish the foundational application flow and understand the inherent security risks.

## Level 2: Database Encryption

- **Concept:** Encryption at the database level.
- **Implementation:** Integrated the mongoose-encryption package to automatically encrypt and decrypt user data, including passwords, using a secret key.
- **Purpose:** To learn about encrypting data at rest.

## Level 3: Hashing with MD5

- **Concept:** Introduction to one-way password hashing.
- **Implementation:** Replaced encryption with the md5 package to hash passwords before saving them. This ensured passwords were not stored in a readable format.
- **Purpose:** To understand the fundamental concept of hashing and why it's superior to encryption for passwords.

## Level 4: Salting & Hashing with bcrypt

- **Concept:** Strengthening hashes against attacks using salt rounds.
- **Implementation:** Upgraded from MD5 to the bcrypt package with 10 salt rounds. This created unique hashes for every user, even with identical passwords, drastically increasing resistance to rainbow table and brute-force attacks.
- **Purpose:** To implement a modern, industry-standard password hashing algorithm.

## Level 5: Session Authentication with Passport.js

- **Concept:** Standardized authentication middleware and session management.
- **Implementation:** Integrated Passport.js with the passport-local strategy, passport-local-mongoose, and express-session. This provided a robust and secure way to manage user sessions and authentication states.
- **Purpose:** To learn a professional and scalable approach to authentication in Node.js.

## Level 6: OAuth 2.0 Social Authentication

- **Concept:** Third-party authentication.
- **Implementation:** Added social login capabilities using OAuth 2.0.
  - **Google Login:** via passport-google-oauth20
  - **Facebook Login:** via passport-facebook
- **Purpose:** To understand and implement third-party authentication, a critical feature in modern web applications.

## ⚙️ Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/your-username/secrets.git
cd secrets
```
2. Install dependencies
```bash
npm install
```
3. Set up environment variables
Create a .env file in the root directory and add your credentials:
```MONGO
SESSION_SECRET=<your_session_secret>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
FACEBOOK_APP_ID=<your_facebook_app_id>
FACEBOOK_APP_SECRET=<your_facebook_app_secret>
```
4. Run the application
```bash
npm start
```
The app will be running at http://localhost:3000.

## 🔮 Future Enhancements
1. Add a "Forgot Password" feature.
2. Implement role-based access control (RBAC).
