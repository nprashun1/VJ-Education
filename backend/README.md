# Backend Architecture Guide

Welcome to the backend of the application! The codebase has been refactored into a **Model-View-Controller (MVC)** architecture to make it clean, scalable, and easy to understand.

Here is a breakdown of the file system and how everything connects.

## Directory Structure

```text
backend/
├── config/           # Configuration files (Database, File Uploads)
├── controllers/      # Business logic (What happens when a route is hit)
├── models/           # Database Schemas (How data is structured in MongoDB)
├── routes/           # API Endpoints (URLs that the frontend calls)
├── utils/            # Helper functions
└── server.js         # The main entry point of the application
```

---

## 1. `server.js` (The Entry Point)
This is the starting point of your backend. It doesn't contain any complex logic anymore. 
- It starts the Express server.
- It connects to the database by requiring `config/db.js`.
- It registers all the API routes (e.g., telling the server that any request starting with `/api/staff` should be handled by `routes/staffRoutes.js`).

## 2. `config/` (Configurations)
This folder holds files that set up external services.
- **`db.js`**: Connects to your MongoDB database. It also sets up `GridFS` buckets, which are used for storing large files like PDFs and Images directly in the database.
- **`multer.js`**: Configures `multer`, a tool used to accept file uploads (like resumes or photos) from the frontend. It holds them in memory temporarily before they are saved to the database.

## 3. `models/` (Data Structures)
Files in here define the structure (schemas) of your MongoDB database collections.
- **`Staff.js`**: Defines that a staff member must have a name, email, phone, and resume.
- **`Notice.js`**: Defines notices.
- **`Admission.js`**: Defines student admissions.
- **`Gallery.js`**: Defines gallery photos.

## 4. `routes/` (The Traffic Directors)
When the frontend makes an HTTP request (like `GET /api/staff`), the `server.js` passes it to the `staffRoutes.js` file.
- The route file acts like a traffic director. It says: *"Oh, you want to POST a new staff member? Let me send you to the `createStaff` function in the staff controller."*
- **Files**: `staffRoutes.js`, `noticeRoutes.js`, `admissionRoutes.js`, `galleryRoutes.js`.

## 5. `controllers/` (The Brains / Business Logic)
This is where the actual code execution happens. The controllers receive the request, talk to the `models` to save/fetch data, and then send a response back to the frontend.
- For example, in **`staffController.js`**, the `createStaff` function will:
  1. Check if the user provided a name and a resume.
  2. Upload the resume to the database using GridFS.
  3. Save the staff details using the `Staff` model.
  4. Send a success message back to the frontend.

## 6. `utils/` (Helpers)
Contains reusable helper scripts so you don't repeat code.
- **`gridfs.js`**: Contains the `uploadToGridFS` function. Since Staff, Notices, and Gallery all upload files to the database, this logic is written here once and shared across the controllers.

---

## How Data Flows (Example: Adding a Staff Member)

1. **Frontend** sends a POST request to `/api/staff` with a name, email, and PDF file.
2. **`server.js`** sees `/api/staff` and forwards it to **`routes/staffRoutes.js`**.
3. **`routes/staffRoutes.js`** sees it's a POST request. It first uses **`config/multer.js`** to read the PDF file, then forwards the request to the `createStaff` function in **`controllers/staffController.js`**.
4. **`controllers/staffController.js`** uses **`utils/gridfs.js`** to save the PDF to the database, and uses **`models/Staff.js`** to save the text details. It then replies to the frontend with a success message!
