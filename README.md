# 🐳 Docker Workshop — Starter App

App Node.js mẫu dùng cho workshop **"From Code to Cloud"** tại FPT University Đà Nẵng.

## 📁 Cấu trúc

```
starter-app/
├── src/
│   └── index.js          # Express server
├── package.json
├── package-lock.json
└── README.md
```

## ▶️ Chạy Local

```bash
# 1. Cài dependencies
npm install

# 2. Chạy app
npm start

# 3. Mở browser → http://localhost:3000
```

## 📋 API Endpoints

| Method | Path | Mô tả |
|--------|------|--------|
| GET | `/` | Trang chủ — Hello message |
| GET | `/health` | Health check |
| GET | `/api/info` | Thông tin hệ thống |
| GET | `/api/students` | Danh sách SV |
| GET | `/api/students/:id` | SV theo ID |


github.com/tdlinh0100
