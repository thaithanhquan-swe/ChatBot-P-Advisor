# 🎓 ChatBot P-Advisor - Hệ Thống Chatbot & Tư Vấn Tuyển Sinh Thông Minh

**ChatBot P-Advisor** là giải pháp nền tảng tư vấn tuyển sinh tự động hóa thế hệ mới dành cho Học viện / Trường đại học. Hệ thống kết hợp giữa **Trí tuệ nhân tạo (Spring AI / Gemini / OpenAI)** theo mô hình **RAG (Retrieval-Augmented Generation)**, **Trích xuất văn bản & OCR đa định dạng**, cùng hệ thống **Chat thời gian thực (Realtime WebSocket)** giúp kết nối liền mạch giữa Thí sinh / Phụ huynh và Ban tư vấn tuyển sinh (Advisor / Admin).

---

## 🌟 Tính Năng Nổi Bật

### 1. 🤖 Chatbot AI & Tri Thức RAG (Retrieval-Augmented Generation)
- Trả lời tự động các thắc mắc về điểm chuẩn, ngành học, học phí, đề án tuyển sinh và thủ tục nhập học.
- Truy xuất thông tin chính xác từ hai nguồn dữ liệu chính: **FAQ (Câu hỏi thường gặp)** và **Tài liệu chính thức (Documents)**.
- Bảo mật thông tin nội bộ: Tự động che giấu tên tệp, đường dẫn hệ thống, ID nội bộ và ưu tiên trích xuất link nguồn chuẩn web (`http://` / `https://`).
- Hỗ trợ câu hỏi đính kèm hình ảnh (Multimodal Vision Prompting).

### 2. 📄 Trích Xuất Tài Liệu & Nhận Diện Văn Bản OCR (Multimodal Doc/OCR)
- Tự động trích xuất nội dung từ các định dạng tài liệu phong phú: `.pdf`, `.docx`, `.txt`, `.png`, `.jpg`, `.jpeg`.
- Tích hợp **Apache Tika** kết hợp **Tess4J (Tesseract OCR Engine)** cho phép đọc dữ liệu từ cả tệp scan/ảnh quét song ngữ Việt - Anh (`vie+eng`).

### 3. 💬 Chuyển Giao & Chat Realtime Với Ban Tư Vấn (Staff Handover)
- Thí sinh / Phụ huynh có thể gửi yêu cầu kết nối trực tiếp với Tư vấn viên (Advisor).
- Ban tư vấn nhận thông báo tức thì qua **WebSocket** (`/ws/admin/chat`), tiếp nhận phiên chat và trò chuyện trực tiếp thời gian thực.
- Hỗ trợ Ban tư vấn chuyển lại phiên chat cho Chatbot AI khi cuộc tư vấn hoàn tất.

### 4. 📋 Quản Lý Yêu Cầu Tư Vấn (Consultation Request)
- Cho phép thí sinh gửi biểu mẫu yêu cầu tư vấn chi tiết (họ tên, email, số điện thoại, nội dung thắc mắc).
- Phân công, theo dõi và xử lý yêu cầu theo các trạng thái: `PENDING` ➔ `ASSIGNED` ➔ `RESOLVED`.

### 5. 🔐 Bảo Mật & Quản Lý Tài Khoản Multi-Role
- Phân quyền chi tiết 4 cấp độ: **ADMIN**, **ADVISOR**, **USER** (Đã đăng ký) và **GUEST** (Khách vãng lai).
- Xác thực an toàn với **JWT (JSON Web Token)** & **Firebase Authentication** (Google Sign-In).
- Kích hoạt tài khoản qua Email verification và Khôi phục mật khẩu (Password Reset Token via Mail SMTP).

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

### Frontend (`/client`)
- **Core**: React 19, Vite.
- **Styling**: Tailwind CSS v4, shadcn/ui components, Lucide Icons, `@fontsource-variable/geist`.
- **State & Routing**: React Router DOM v7, React Hooks.
- **Network & Realtime**: Axios, Native WebSocket / Custom Protocol.
- **Auth**: Firebase Client SDK.

### Backend (`/server`)
- **Core**: Java 21 LTS, Spring Boot 3.4 / 4.1.
- **AI Integration**: Spring AI (OpenAI Compatible API / Gemini 3.5 Flash Lite).
- **Document & OCR Processing**: Apache Tika 3.2, Tess4J 5.20 (Tesseract OCR), Apache PDFBox 3.0.
- **Security**: Spring Security 6, OAuth2 Resource Server, JWT (Nimbus JOSE + JWT), Firebase Admin SDK.
- **Database & Mapping**: MySQL 8.0+, Spring Data JPA, MapStruct 1.6, Lombok.
- **Realtime & Mail**: Spring WebSocket, Spring Mail (Gmail SMTP).

---

## 📁 Cấu Trúc Dự Án

```text
ChatBot-P-Advisor/
├── client/                     # Mã nguồn Frontend (React + Vite + Tailwind)
│   ├── src/
│   │   ├── components/         # Các UI components dùng chung (shadcn/ui)
│   │   ├── layouts/            # Layouts (AdminLayout, PublicLayout, AuthLayout)
│   │   ├── pages/              # Trang giao diện ((admin), (auth), (public))
│   │   ├── services/           # Gọi API backend (Axios services)
│   │   └── utils/              # Các hàm tiện ích
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Mã nguồn Backend (Spring Boot + Java 21)
│   ├── src/main/java/com/example/server/
│   │   ├── configuration/      # Cấu hình Spring Security, Cors, Jwt, Async, WebSocket
│   │   ├── controller/         # REST API Controllers
│   │   ├── dto/                # Request & Response DTOs
│   │   ├── entity/             # JPA Entities (User, ChatSession, Document, FAQ,...)
│   │   ├── enums/              # Enum định nghĩa trạng thái & vai trò
│   │   ├── exception/          # Global Exception Handler & ErrorCode
│   │   ├── repository/         # Spring Data JPA Repositories
│   │   ├── service/            # Business Logic & Spring AI RAG Integration
│   │   └── websocket/          # WebSocket Handler cho Ban tư vấn
│   ├── src/main/resources/     # File cấu hình application.properties
│   └── pom.xml
│
├── docs/                       # Thư mục chứa tài liệu kỹ thuật chi tiết
│   ├── architecture.md         # Kiến trúc hệ thống & Luồng dữ liệu
│   ├── api.md                  # Tài liệu danh mục API RESTful & WebSocket
│   ├── database.md             # Thiết kế CSDL & Sơ đồ ERD
│   ├── business-rules.md       # Quy tắc nghiệp vụ & Phân quyền
│   └── setup.md                # Hướng dẫn cài đặt & vận hành môi trường
│
├── uploads/                    # Thư mục lưu trữ tệp đính kèm & tài liệu RAG
└── README.md                   # Tài liệu tổng quan dự án (File này)
```

---

## 📚 Tài Liệu Kỹ Thuật Chi Tiết (`/docs`)

Để hiểu rõ hơn về kiến trúc, cách khởi chạy cũng như chi tiết kỹ thuật của hệ thống, vui lòng tham khảo các tài liệu trong thư mục [`docs/`](file:///d:/4tech/project/ChatBot%20P-Advisor/docs):

- 🏗️ [**Architecture Documentation (`docs/architecture.md`)**](file:///d:/4tech/project/ChatBot%20P-Advisor/docs/architecture.md): Tổng quan kiến trúc hệ thống, sơ đồ các tầng, luồng xử lý RAG & OCR, tích hợp WebSocket thời gian thực.
- 🔌 [**API Documentation (`docs/api.md`)**](file:///d:/4tech/project/ChatBot%20P-Advisor/docs/api.md): Danh sách toàn bộ các API Endpoints, Request/Response payload mẫu, Mã lỗi `ErrorCode` và giao thức WebSocket.
- 🗄️ [**Database Documentation (`docs/database.md`)**](file:///d:/4tech/project/ChatBot%20P-Advisor/docs/database.md): Sơ đồ ERD, thiết kế cấu trúc các bảng MySQL, các tập Enum và quy định chỉ mục (Index).
- 📜 [**Business Rules Documentation (`docs/business-rules.md`)**](file:///d:/4tech/project/ChatBot%20P-Advisor/docs/business-rules.md): Các quy tắc nghiệp vụ về phân quyền, quy tắc AI Assistant, luồng chuyển giao Staff Handover, giới hạn tài khoản vãng lai.
- ⚙️ [**Setup & Deployment Guide (`docs/setup.md`)**](file:///d:/4tech/project/ChatBot%20P-Advisor/docs/setup.md): Hướng dẫn chi tiết từng bước cài đặt môi trường (JDK 21, MySQL, Tesseract OCR), biến môi trường và chạy ứng dụng.

---

## ⚡ Khởi Chạy Nhanh (Quick Start)

### 1. Khởi tạo Cơ sở dữ liệu MySQL
Tạo database MySQL:
```sql
CREATE DATABASE chatbot_p_advisor CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Khởi chạy Backend Server
```bash
cd server
# Chạy dự án qua Maven Wrapper (yêu cầu JDK 21)
./mvnw spring-boot:run
```
*Backend API chạy tại: `http://localhost:8080/chatbot-advisor`*

### 3. Khởi chạy Frontend Client
```bash
cd client
# Cài đặt thư viện dependencies
npm install

# Chạy server phát triển (Vite Dev Server)
npm run dev
```
*Frontend App chạy tại: `http://localhost:5173`*

---

## 📄 Giấy Phép & Bản Quyền (License)

Dự án được phát triển cho mục đích Tư vấn tuyển sinh. Mọi quyền được bảo lưu © 2026 **ChatBot P-Advisor Team**.
