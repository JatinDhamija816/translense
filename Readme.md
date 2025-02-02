# Business and Owner Registration Backend

This project provides a backend solution for **Business Registration** and **Owner Registration**. It allows businesses to register along with an owner, linking both entities in the database.

## Features

- Business Registration with details such as name, address, opening/closing times, etc.
- Owner Registration with details like name, email, phone, and profile picture.
- Secure file upload for owner profile pictures (via Cloudinary).
- Data validation and error handling.
- Connected **Business** and **Owner** via `businessId`.

---

## Project Setup

### 1. Clone the repository:

```bash
git clone https://github.com/JatinDhamija816/translense
cd translense
```

### 2. Install Dependencies:

Ensure you have **Node.js** and **npm** installed, then install the necessary dependencies:

```bash
npm install
```

### 3. Setup Environment Variables:

Create a `.env` file in the root of the project and add the following variables:

```env
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=8000
```

- Replace `your_mongodb_connection_string` with your MongoDB connection string.
- Get your **Cloudinary** credentials from [Cloudinary](https://cloudinary.com/).

### 4. Run the Project Locally:

Once the environment variables are set, you can start the project with the following command:

```bash
npm start
```

The backend will be available at `http://localhost:8000`.

---

## Deployed Backend URL

The project is deployed on **Render** and is accessible at:

- **Backend URL**: `https://translense.onrender.com`

---

## API Endpoints

### 1. Business Registration

- **Endpoint**: `POST /api/v1/business`
- **Request Body**:
  ```json
  {
    "businessName": "Pizza Palace",
    "country": "USA",
    "state": "California",
    "city": "Los Angeles",
    "address": "1234 Elm St",
    "openingTime": "09:00 AM",
    "closingTime": "11:00 PM",
    "email": "contact@pizzapalace.com",
    "mobileNumber": "9876543210"
  }
  ```
- **Restaurant Image**: Upload the file as `restaurantImage` in the form-data in Postman.

### 2. Owner Registration

- **Endpoint**: `POST /api/v1/owner`
- **Request Body**:
  ```json
  {
    "fullName": "John Doe",
    "country": "USA",
    "state": "California",
    "city": "Los Angeles",
    "address": "1234 Elm St",
    "email": "john.doe@example.com",
    "mobileNumber": "9876543210",
    "businessId": "60b8d2956d5f7a59a46ec87c"
  }
  ```
- **Profile Pic**: Upload the file as `profilePic` in the form-data in Postman.

---

## Postman Collection

You can test the API using the following **Postman Collection**:

[Postman Collection URL](https://www.postman.com/hospital-food-management/workspace/translene/request/33183162-a85bfcb8-f462-45ad-9117-17970f866246?action=share&creator=33183162&ctx=documentation)

**To import the Postman Collection:**

1. Open **Postman**.
2. Click on **Import** in the top-left corner.
3. Choose **Link** and paste the collection URL.
4. Click **Import** to load the collection into Postman.

---

## Folder Structure

```bash
business-owner-registration/
│── src/
│   ├── config/
│   │   ├── cloudinaryConfig.js
│   │   ├── uploadProfilePic.js
│   │   ├── uploadRestaurantImages.js
|   |── controllers/
│   │   ├── businessRegister.controller.js
│   │   ├── ownerRegister.controller.js
|   |── db/
│   │   ├── index.js
|   |── middlewares/
│   │   ├── errorHandling.js
│   ├── models/
│   │   ├── business.model.js
│   │   ├── owner.model.js
│   ├── routes/
│   │   ├── business.routes.js
│   │   ├── owner.routes.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   ├── app.js
│   ├── index.js
│── .env
│── package.json
│── README.md
```

---

## License

This project is open-source and available under the **MIT License**.

---

## Contributors

- **Jatin** (Developer)

---
