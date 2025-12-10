# 🚗Vehicle Rental Management API


**Short description:** A RESTful API to manage vehicles, bookings, users and admin operations for a vehicle rental system.

**Live Demo:** https://as-2-vrs.vercel.app/


---

## Features
- Role-based access (admin, customer)
- Booking creation, update, cancellation
- Vehicle registration & management
- User registration and signin
- Get all user, delete and update user
- Vehicles createVehicles,getAllVehicles,getSingleVehicle,updateVehicles,deleteVehicle
- Booking createBooking,getAllBooking,updateBooking
- JWT authentication & authorization

## Tech stack
- Node.js + Express + typescript
- PostgreSQL
- JWT for auth
## Setup & Usage Instructions
### 1. Prerequisites
Ensure the following dependencies are installed on your system:

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **PostgreSQL** 
- **Git** (for version control)
### 2. Clone the Repository
 
```bash
git clone <repository-url>
cd <project-folder>


 ```
### 3. Install Dependencies
```bash
npm install
# or
yarn install

```
### 4. Environment Variables
```bash
PORT=5000
CONNECTION_STR=postgresql://neondb_owner:npg_1NjKFuWfZ2Og@ep-dry-sky-a8pesl25-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require

```
### 5. Start the Development Server
```bash
npm run dev
```
### 6. Build for Production
```bash
npm run build
```
### 7. API Usage
```bash
Authentication
POST	/api/v1/auth/signup	  Public
POST	/api/v1/auth/signin	  Public

Vehicles
 POST	/api/v1/vehicles	Admin only
 GET	/api/v1/vehicles	Public
 GET	/api/v1/vehicles/:vehicleId	Public
 PUT	/api/v1/vehicles/:vehicleId	 Admin only
 DELETE	/api/v1/vehicles/:vehicleId	 Admin only

 Users
 GET	/api/v1/users	Admin only
 PUT	/api/v1/users/:userId	Admin or Own
 DELETE	/api/v1/users/:userId	Admin only

 Bookings
 POST	/api/v1/bookings	Customer or Admin
 GET	/api/v1/bookings	Role-based
 PUT	/api/v1/bookings/:bookingId	Role-based
```
### 8.Required Headers:
```bash
Bearer <jwt_token>
admin:  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkpvaG4gRG9lMiIsImVtYWlsIjoiam9obi5kb2UyQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzY1MjA2MjAxLCJleHAiOjE3NjU4MTEwMDF9.XBMkv31aA2nB1NWlPhPW9iFQ4gmkvAWCLIKHPu_6zqg

customer:  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkpvaG4gRG9lMyIsImVtYWlsIjoiam9objMuZG9lMkBleGFtcGxlLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc2NTIwNjI1MywiZXhwIjoxNzY1ODExMDUzfQ.tJIjyBgrWxw-ppV4wFXDvToGsAIEIBfJ9OrzM4uq1fo




