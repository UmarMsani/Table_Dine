# Table Dine Backend

### Project Description

The Table Dine backend is a Node.js application that provides an API for the frontend and admin panel of the Table Dine platform. It uses Express.js for handling HTTP requests and MongoDB for storing data.

### Installation

1.  Clone the repository:  `git clone https://github.com/UmarMsani/Table_Dine.git`
2.  Navigate to the project directory:  `cd backend`
3.  Install dependencies:  `npm install`
4.  Create a  `.env`  file in the root directory and add your MongoDB connection string and Stripe API key:
5. 
`MONGO_URI=<your_mongodb_connection_string>`

`STRIPE_API_KEY=<your_stripe_api_key>`
6.  npm install nodemailer
7.  Start the server:  `npm run server`

### API Endpoints

The backend provides the following API endpoints:

### Food

-   `GET /api/food`  - Get all food items
-   `POST /api/food/add`  - Add a new food item
-   `POST /api/food/remove`  - Remove a food item

### User

-   `POST /api/user/register`  - Register a new user
-   `POST /api/user/login`  - Log in a user

### Cart

-   `POST /api/cart/add`  - Add an item to the cart
-   `POST /api/cart/remove`  - Remove an item from the cart
-   `POST /api/cart/get`  - Get the user's cart

### Order

-   `POST /api/order/place`  - Place an order
-   `POST /api/order/verify`  - Verify an order
-   `POST /api/order/userorders`  - Get the user's orders
-   `GET /api/order/list`  - Get all orders

### Stripe

-   `POST /api/stripe/create-checkout-session`  - Create a Stripe checkout session

### Booking Table

-   `POST /api/booking/table`  - Book a table

### Contact Us

-   `POST /api/contact`  - Send a message through the contact form

### License

This project is licensed under the MIT License. See the  [LICENSE]()  file for details.

### Acknowledgments

-   [Express.js](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [Stripe](https://stripe.com/)

The **Table Dine Admin Panel** is a web application built with React and Vite. It provides a user-friendly interface for managing the booking and ordering process for Table Dine, a restaurant booking and food ordering platform.


### Features

- Manage restaurant tables and bookings.
- Add, edit, and remove menu items.
- Manage user accounts and permissions.
- View and manage orders.

### Installation

- Clone the repository: git clone https://github.com/UmarMsani/Table_Dine.gitNavigate to the project directory: ```cd admin```
- Install dependencies: ```npm install```
- Start the development server: ```npm run dev```

### Dependencies

- React
- Vite
- React Router
- React Hook Form