# 📚 Library Management System

Assalamu Alaikum! I am Md. Abu Sufian. I have developed this project using ***Node.js***, ***Express.js***, ***TypeScript*** and ***MongoDB***. It is a RESTful API that works for creating,deleteing,updateing,filtering  related summaries of books in a library. This project was a great experience for developing my backend skills.

---
## Project Objectives

- Learn proper schema design using Mongoose
- Enforce business logic (e.g., don't lend if there is no copy)
- Create summarized reports using aggregation pipeline
- Create error handling and custom error formatter
- Get used to using model static/instance methods

---


## What are the features?
This application is mainly divided into two parts: Book Management and Borrow Book. Here I  can add new books, view all books, get information about a specific book, update or delete books.

In the Borrow Book section, a user can borrow a certain number of books for a certain period of time. As books are lent, the number of books decreases. If there is not enough, then the loan cannot be made. Also, a summary is available, which shows how many times each book has been Borrow.

### Backend logic

- Validation Errors are displayed in a beautiful format
- ObjectId is validated in all APIs
- `available` field is updated using Model Static Method
- Schema Middleware is used (pre/post save)

---


##  Technologies I used For This Project
- Node.js – Backend runtime
- Express.js – For building APIs For this Project
- TypeScript – For writing type-safe and advanced code
- MongoDB (Mongoose) – Database and schema modeling
- dotenv – For managing secret configuration files


---
## API Routes
Book Management related API:

GET /api/books → View all books and also filtering a book like ```?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=6``` this.

GET /api/books/:id → View specific books by Id

POST /api/books → Add new books

PATCH /api/books/:id → Update books

DELETE /api/books/:id → Delete books

Borrow related API:
POST /api/borrow → To lend books

GET /api/borrow → View summary (using Aggregation)
---

###  Query Parameters:
- filter: Genre (eg: FICTION, SCIENCE)

- sortBy: createdAt, title etc

- sort: asc or desc

- limit: number (eg: 5)
---
## How to use this 

```
POST /api/books
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

When create the book It will be Response like this 

```
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```
#### 📚 Borrow a Book – Example Request Body
To borrow a book, send a POST request with the following JSON structure:
```
{
  "book": "68563a984146378401c2543d",
  "quantity": 3,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

Field Descriptions:
- bookId: The unique ID of the book you want to borrow.
- borrowedQuantity: Number of copies you want to borrow.
- dueDate: The expected return date.

#### Borrow Book – Success Response
```
{
    "success": true,
    "message": "Book borrowed successfully",
    "data": {
        "book": "68563a984146378401c2543d",
        "quantity": 3,
        "dueDate": "2025-07-18T00:00:00.000Z",
        "_id": "6856ee63200ce3bf9cdd2dc0",
        "createdAt": "2025-06-21T17:39:47.548Z",
        "updatedAt": "2025-06-21T17:39:47.548Z",
        "__v": 0
    }
}

```
When a book is successfully borrowed, the response returns a success flag set to true and a confirmation message. Inside the data object, book is the ID of the borrowed book, and quantity shows how many copies were borrowed. The dueDate indicates when the book should be returned. Additional fields like _id, createdAt, and updatedAt provide metadata about the borrow record, while __v is used internally by Mongoose for versioning.
## Last word

This project is a part of my backend development learning and I created it as my assignment. Through the project, I was able to gain practical knowledge of Node.js, Express.js, TypeScript, and MongoDB. In addition, I also gained practical experience in schema design, data validation, API design, and aggregation.
