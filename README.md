# Keploy Fellowship To-Do API

This is a simple RESTful To-Do List API built with Node, Express, and Supbase (PostgreSQL). You can create, read, update, and delete todo items. This project was built as part of the Keploy Fellowship.

---

## Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: Supabase (hosted PostgreSQL)

---

## Supabase Setup

1. Go to [https://supabase.com](https://supabase.com) and create a free project.
2. In the **Table Editor**, create a new table called `todos` with the following columns:

| Column       | Type      | Notes                       |
| ------------ | --------- | --------------------------- |
| `id`         | bigint    | Primary key, auto-increment |
| `title`      | text      | Task title                  |
| `completed`  | bool      | Default: `false`            |
| `created_at` | timestamp | Default: `now()`            |

3. Go to **Project Settings → API** and copy:

   - **SUPABASE_URL**
   - **anon public key** (public API key)

4. Create a `.env` file in your `server/` folder:

```env
SUPABASE_URL=your project url
SUPABASE_KEY=your api key
PORT=3000
```

---

## Server Setup

1. git clone this repository

2. cd server

3. npm install

4. node index.js

---

## API Endpoints

1. GET /todos
   Returns all items in the todo list.
2. POST /todos
   Create a new todo item. Required field title.
3. PUT /todos/:id
   Update the id-specified item.
4. DELETE /todos/:id
   Delete the id-specified item.

---

## Testing Frameworks/Tools

1. Jest was used for testing coverage, with a unit test file, integration test file, and api test file.
2. Supertest was used for API testing.
3. Here is the test screenshot:

![alt text](https://file%2B.vscode-resource.vscode-cdn.net/Users/wittenpan/Desktop/Screenshot%202025-06-23%20at%209.34.00%E2%80%AFPM.png?version%3D1750736682123)
