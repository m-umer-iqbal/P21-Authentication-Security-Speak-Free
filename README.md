# Secret Project
A practice project focused on authentication and security concepts. Each level enhances how user credentials are handled.
## Level 1 — Plain Text
Stored email and password directly in the database.

## Level 2 — Database Encryption
Used the `mongoose-encryption` package to encrypt data directly in the database using an internal encryption algorithm and secret key.

## Level 3 — MD5 Hash
Used the `md5` package to hash passwords before saving.

## Level 4 — Bcrypt with Salt
Implemented `bcrypt` with 10 salt rounds to strengthen password security.

## Level 5 — Passport Authentication
Integrated `Passport.js`, `passport-local`, `passport-local-mongoose`, and `express-session` for secure session & cookie-based authentication.