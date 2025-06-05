# 📘 Chappy - Chapter Performance API

**Chappy** is a RESTful API for managing chapter data in an educational dashboard. It supports filtering, pagination, admin uploads, Redis caching, and rate limiting.

---

## 🚀 Features

- Get all chapters with filters and pagination
- Get chapter by ID
- Admin-only upload of chapters via JSON file
- Redis caching (1 hour) for GET requests
- Cache invalidation when chapters are added
- Rate limiting: 30 requests/minute per IP using Redis

---

## 🛠 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Redis (for caching and rate-limiting)
- Multer (for file uploads)
- Express-Rate-Limit + RedisStore

---

## 📦 API Endpoints

| Method | Route                  | Description                        | Access     |
|--------|------------------------|------------------------------------|------------|
| GET    | `/api/v1/chapters`     | Get all chapters with filters      | Public     |
| GET    | `/api/v1/chapters/:id` | Get a specific chapter by ID       | Public     |
| POST   | `/api/v1/chapters`     | Upload chapters via JSON file      | Admin only |

---

## 🧪 Filters (GET `/api/v1/chapters`)

Supports the following query parameters:
- `class`
- `unit`
- `subject`
- `status`
- `weakChapters`
- `page` (default: 1)
- `limit` (default: 10)

---

## 🔐 Admin Upload

- Only authenticated admins can upload chapters : for now a dummy admin check is passed via body
- Upload a `.json` file via `multipart/form-data`
- Valid chapters are inserted
- Invalid chapters are returned in the response

---

## 📤 Deployment

- Deployed at: [chappy](http://13.53.130.41/)
- MongoDB: Cloud (e.g., MongoDB Atlas)
- Redis: Cloud (e.g., Redis Upstash, Railway)

---

## 🔃 Redis Caching

- GET `/api/v1/chapters` is cached for 1 hour
- Cache is invalidated on successful chapter upload

---

## 🛡 Rate Limiting

- 30 requests/minute per IP address
- Uses Redis for shared limit store

---

## 🧰 Setup Instructions

```bash
git clone https://github.com/yourname/chappy.git
cd chappy
npm install
