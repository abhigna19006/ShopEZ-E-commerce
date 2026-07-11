# ShopEZ E-Commerce

## Overview
ShopEZ is a MERN-stack e-commerce web application designed to provide a simple, secure, and user-friendly online shopping experience. It combines React for the frontend, Node.js + Express for the backend, and MongoDB for database storage.

## Project Scope
The documentation folder contains a complete phase-wise record of the ShopEZ project, including:
- Ideation & brainstorming
- Problem statements and empathy mapping
- Project design and solution architecture
- Requirement analysis and technology stack
- Project planning and development milestones
- User acceptance testing

## Key Features
- User registration and login with JWT authentication
- Product listing and browsing
- Search and product detail views
- Shopping cart management
- Add/remove/update product quantity
- Place orders and order confirmation
- Responsive UI and intuitive navigation

## Architecture Summary
- Frontend: React.js (Vite) with component-based pages for Home, Products, Cart, Login, Register, Orders, and Admin views.
- Backend: Node.js and Express.js handling REST APIs, authentication, cart operations, and order management.
- Database: MongoDB with Mongoose models for users, products, carts, and orders.

## Documentation Summary
The provided documentation includes:
- **Project Documentation**: introduction, purpose, architecture, setup instructions, folder structure, and environment requirements.
- **Brainstorming & Ideation**: problem identification, idea prioritization, and feature grouping.
- **Requirements Analysis**: functional and non-functional requirements, user stories, and data flow diagrams.
- **Project Design**: problem-solution fit, proposed solution, and solution architecture.
- **Project Planning**: timeline and sprint planning.
- **User Acceptance Testing**: test cases and verification of core functionality.

## Setup Instructions
1. Install prerequisites: Node.js, npm, MongoDB, and a modern browser.
2. Open the project in Visual Studio Code.
3. Install frontend dependencies:
   - `cd client`
   - `npm install`
4. Install backend dependencies:
   - `cd server`
   - `npm install`
5. Configure the backend environment variables for MongoDB and JWT.
6. Start the server:
   - `cd server`
   - `npm start`
7. Start the client:
   - `cd client`
   - `npm run dev`
8. Open the application in your browser at the displayed localhost URL.

## Folder Structure
- `client/` - React frontend application.
- `server/` - Express backend application.
- `ShopEZ -E-Commerce  Document-20260711T064647Z-2-001/ShopEZ -E-Commerce  Document/` - project documentation files.

## Notes
- The documentation supports understanding project requirements, design decisions, and testing strategy.
- Future improvements may include payment integration, order tracking, product reviews, and wishlist features.
