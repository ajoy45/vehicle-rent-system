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



