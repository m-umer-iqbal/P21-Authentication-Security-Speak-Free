# Secret Project
A practice project focused on authentication and security concepts. Each level enhances how user credentials are handled.

## Level 1 — Plain Text
Stored email and password directly in the database (for demo purposes only).

## Level 2 — MD5 Hash
Used the MD5 package to hash passwords before saving.

## Level 3 — Bcrypt with Salt
Implemented bcrypt with 10 salt rounds to strengthen password security.

## Level 4 — Passport Authentication
Integrated Passport.js, passport-local, passport-local-mongoose, and express-session for secure session & cookie-based authentication.