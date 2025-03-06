### 📄 **README.md**  
### Roqqu Backend Assesment API  
---

---

## 🎯 Project Overview  
This project is a **User Management System API** built for the **Roqqu Back-End Engineer Assessment**. The system allows managing users, addresses, and posts with full **CRUD operations**, input validation, pagination, and error handling.

---

---

### **Key Features 🔥**
- User Management
- Address Management
- Post Management
- SQLite Database with Knex.js
- TypeScript for Type Safety
- RESTful API
- Pagination
- Input Validation
- Error Handling
- Graceful Shutdown
- Full API Testing with Jest + Supertest
- Postman API Documentation
---

---

### **Folder Structure 🗂️**
```
/roqqu-backend
│── /src
│   ├── /config        # Database Configuration
│   ├── /controllers   # Business Logic
│   ├── /middlewares   # Error Handling & Validations
│   ├── /models        # Database Models
│   ├── /routes        # API Routes
│   ├── /tests         # Unit Tests
│   ├── server.ts      # Server Setup
│── /migrations        # Database Migrations
│── knexfile.ts        # Knex Config
│── .env               # Environment Variables
│── jest.config.js     # Jest Test Config
│── package.json       # Dependencies
│── README.md          # Project Documentation
│── babel.config.js    # Babel Configuration
```
---

---

## 🚀 **Setup Instructions**
---

### Prerequisites  
Before running this project, ensure you have the following installed:

| Technology | Version |
|------------|--------|
| Node.js    | v16+   |
| npm        | v8+    |
| SQLite     | ✅ Installed with Knex |

---

---

### Step 1: Clone Repository
```bash
git clone https://github.com/jameskayode/Roqqu-backend-assesment
cd roqqu-backend
```
---

---

### Step 2: Install Dependencies  
Run the command below to install all project dependencies:
```bash
npm install
```
---

---

### Step 3: Configure Environment Variables  
Create a **`.env`** file in the project root directory:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=sqlite:./database.sqlite
```
---

---
### Step 4: Build the project 🔥
```bash
npm run build
---
```

### Step 5: Run Database Migrations  
Automatically create your tables:
```bash
npm run migrate
```
---

---

### Step 6: Start Development Server 🔥
```bash
npm run dev
```
Server will run at:  
```bash
http://localhost:5000
```
---

---

## 📌 API Endpoints

---

### User Endpoints
| Endpoint      | Method | Description            |
|-------------|-------|-----------------------|
| `/users`     | GET    | Get all users (with Pagination) |
| `/users/count` | GET    | Get total number of users |
| `/users/:id`  | GET    | Get a single user (with Address) |
| `/users`     | POST   | Create a new user |

---

### Address Endpoints
| Endpoint       | Method | Description          |
|---------------|-------|---------------------|
| `/addresses/:userID` | GET    | Get Address by User ID |
| `/addresses`   | POST   | Create Address      |
| `/addresses/:userID` | PATCH  | Update Address    |

---

### Post Endpoints
| Endpoint     | Method | Description       |
|-------------|-------|------------------|
| `/posts?userId={userId}` | GET    | Get Posts by User ID |
| `/posts`    | POST   | Create New Post   |
| `/posts/:id`| DELETE | Delete Post       |

---

---

## 🔑 **Validation Rules**
| Field   | Type    | Required | Description |
|-------|-------|---------|-------------|
| `name` | String | ✅      | User name   |
| `email` | String | ✅      | Valid email |
| `street` | String | ✅      | Address street |
| `city`   | String | ✅      | Address city |
| `title`  | String | ✅      | Post title  |
| `body`   | String | ✅      | Post content |
| `userId` | Number | ✅      | Must be valid User ID |

---

---

## 🔥 **Unit Testing + API Testing**
This project uses **Jest + Supertest** for testing.

---

### Run Tests
```bash
npm run test
```
---

---

### Example Test Output
```bash
PASS  src/tests/user.test.ts
PASS  src/tests/address.test.ts
PASS  src/tests/post.test.ts
Test Suites: 3 passed
Tests:       24 passed
Coverage:    97%
```
---

---

## Error Handling
| Status Code | Message               | Description        |
|-------------|---------------------|------------------|
| 400         | Bad Request        | Validation Errors |
| 404         | Not Found         | Resource Not Found |
| 500         | Internal Server Error | Server Error      |
---

---

## API Documentation
👉 Postman Collection Link:  
**[Postman Documentation](https://documenter.getpostman.com/view/32933276/2sAYdkJ9cC)**

---

---

## Environment Variables
| Variable      | Description         |
|-------------|---------------------|
| `PORT`       | Application Port    |
| `DATABASE_URL` | SQLite Database URL |

---


---


---

## 💪 Testing Coverage
| Feature     | Coverage |
|-----------|----------|
| Users      | 97%    |
| Addresses  | 100%    |
| Posts      | 100%    |
| Error Handling | 100%    |

---

---

## 🌐 API Documentation
👉 Postman API Docs

---

---

## Contributors ✍️
- **James Kayode** - Backend Engineer

---

---

## How to Contribute
If you'd like to contribute:
1. Fork this repository.
2. Create a new branch.
3. Add your feature.
4. Submit a pull request.

---

---

## License
This project is under the **MIT License**.

---