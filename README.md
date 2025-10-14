# Secret Project  
A practice project focused on authentication and security concepts. Each level enhances how user credentials are handled, moving from basic to industry-standard authentication methods.

---

## Level 1 — Plain Text  
Stored user email and password directly in the database (insecure, for learning only).

---

## Level 2 — Database Encryption  
Used the `mongoose-encryption` package to encrypt user data directly in the database using an internal encryption algorithm and a secret key.

---

## Level 3 — MD5 Hash  
Used the `md5` package to hash passwords before saving them to the database.

---

## Level 4 — Bcrypt with Salt  
Implemented `bcrypt` with 10 salt rounds to hash passwords, increasing resistance against brute-force attacks.

---

## Level 5 — Passport Authentication  
Integrated `Passport.js`, `passport-local`, `passport-local-mongoose`, and `express-session` for secure session-based authentication and user management.

---

## Level 6 — OAuth (Google & Facebook Authentication)  
Enhanced the project with social login options using OAuth 2.0:

- **Google Authentication** via `passport-google-oauth20`
- **Facebook Authentication** via `passport-facebook`