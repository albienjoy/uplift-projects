# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Donation backend API

## Description
This is a backend API that tracks donations from people. This is meant to the one of the building blocks for a future website where Filipinos can donate clothes that can either be reworked (for selling, with a percentage of profits going to charitable causes) or donated. 

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
If you have any questions about this API, please reach out to me at gitlab/albien.joy.






## Donation Tracking API
This is a secure RESTful backend API for managing user accounts, donations, and addresses.
Built with Node.js, Express 5, and MongoDB (Mongoose), with session-based authentication using cookies.

## Features

User authentication (Register, Login, Logout)
Session-based auth using cookies
MongoDB integration via Mongoose
Three main collections:
users
donations
addresses

Security hardening with Helmet
Rate limiting to prevent abuse
CORS configuration

## Tech Stack
Node.js
Express 5
MongoDB + Mongoose
Express Session + connect-mongo
Helmet (security headers)
bcrypt (password hashing)
Jest + Supertest (testing)

## Dependencies
"dependencies": {
  "bcrypt": "^6.0.0",
  "connect-mongo": "^6.0.0",
  "cors": "^2.8.6",
  "dotenv": "^17.2.4",
  "express": "^5.2.1",
  "express-rate-limit": "^8.2.1",
  "express-session": "^1.19.0",
  "helmet": "^8.1.0",
  "jest": "^30.2.0",
  "mongoose": "^9.1.6",
  "supertest": "^7.2.2"
}

## Project Structure
.
├── configs/
│   ├── db.js
│   ├── limiter.js
│
├── models/
│   ├── User.js
│   ├── Donation.js
│   ├── Address.js
│
├── routes/
│   ├── userRoutes.js
│   ├── donationRoutes.js
│   ├── addressRoutes.js
│
├── controllers/
│   ├── userController.js
│   ├── donationController.js
│   ├── addressController.js
│
├── middlewares/
│   ├── authMiddleware.js
│
├── tests/
│
├── app.js
├── server.js
└── .env

## Database Models
1. Users

Stores authentication and account information.

Typical fields:

name

email (unique)

password (hashed using bcrypt)

createdAt

2. Donations

Tracks donation records.

Typical fields:

donor (ObjectId → User)

amount / item

photo (string URL)

status

timestamps

3. Addresses

Stores address details linked to users or donations.

Typical fields:

user (ObjectId → User)

street

city

province

postalCode

## Authentication Flow

This API uses session-based authentication:

express-session creates a session

Sessions are stored in MongoDB via connect-mongo

A secure HTTP-only cookie stores the session ID

Passwords are hashed using bcrypt

Auth Endpoints
Method	Route	Description
POST	/api/v1/users/register	Register new user
POST	/api/v1/users/login	Login user
POST	/api/v1/users/logout	Logout user

Donation Endpoints
Method	Route	Description
GET	/api/v1/donations	Get all donations
POST	/api/v1/donations	Create donation (auth required)
GET	/api/v1/donations/:id	Get donation by ID
PUT	/api/v1/donations/:id	Update donation
DELETE	/api/v1/donations/:id	Delete donation

Address Endpoints
Method	Route	Description
GET	/api/v1/addresses	Get all addresses
POST	/api/v1/addresses	Create address
PUT	/api/v1/addresses/:id	Update address
DELETE	/api/v1/addresses/:id	Delete address
🛡 Security

This application implements multiple layers of security:

1. Helmet

Adds secure HTTP headers:

Content Security Policy

XSS protection

Frameguard

HSTS

MIME sniffing protection

import helmet from "helmet";
app.use(helmet());

2. Rate Limiting

Prevents brute-force attacks and API abuse using express-rate-limit.

3. Password Hashing

All passwords are hashed with bcrypt before storage.

4. Session Storage

Sessions are securely stored in MongoDB via connect-mongo.

## Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
NODE_ENV=development

## Testing
Testing has not yet been implemented but can be done using:

Jest
Supertest

Run tests:
npm test


Tests cover:

Authentication

CRUD operations

Protected routes

Error handling

## Installation & Setup
1. Clone the repository
git clone https://github.com/yourusername/donation-api.git
cd donation-api

2. Install dependencies
npm install

3. Configure environment variables

Create .env file as shown above.

4. Start the server

Development:
npm run dev


## API Base URL
http://localhost:5555/api

##Example Request (Login)
POST /api/v1/users/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}


Response:

{
  "message": "Login successful"
}


A session cookie will be returned in the response headers.

## Future Improvements

Role-based authorization (admin/user)

Email verification

Password reset flow

API documentation via Swagger

Cloud storage for uploads (AWS S3 / Cloudinary)

Docker support

## Roadmap
Future development would allow the following features:
- status of donation pick-up will be provided for each entry
- users can upload photos of their donations
- users can update the details of donations that haven't been picked up yet

Future development would also allow volunteers for quality checking the clothes, reworking them, or selling them to sign up. 

## Contributing
Contributions are not open at this moment.

## Authors and acknowledgment
This was developed as a backend REST API for a donation tracking system by Albien Sison.
Thanks to Uplift instructor, Jaypee Hindang, for giving me the tools and knowledge to make this.

