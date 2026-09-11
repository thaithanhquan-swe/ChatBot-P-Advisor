# ⚙️ Setup & Deployment Guide - ChatBot P-Advisor

Tài liệu này hướng dẫn chi tiết từng bước chuẩn bị môi trường, cấu hình biến môi trường, khởi chạy hệ thống ở môi trường phát triển (Development) cũng như đóng gói triển khai (Production) cho dự án **ChatBot P-Advisor**.

---

## 1. Yêu Cầu Tiền Đề (System Prerequisites)

Trước khi bắt đầu cài đặt, hãy đảm bảo máy tính/server của bạn đã được cài đặt các công cụ sau:

- **Java Development Kit (JDK)**: **JDK 21 LTS** (Khuyên dùng OpenJDK 21 hoặc Oracle JDK 21).
- **Build Tool**: **Maven 3.9+** (Đã tích hợp sẵn `mvnw` trong dự án).
- **Node.js Environment**: **Node.js 18.x trở lên** & **npm 9.x+**.
- **Database Engine**: **MySQL 8.0+** hoặc MariaDB 10.5+.
- **OCR Engine (Tesseract)**: Thư viện **Tesseract OCR v5.x** kèm dữ liệu ngôn ngữ tiếng Việt & tiếng Anh (`vie.traineddata`, `eng.traineddata`).

---

## 2. Cấu Hình Cơ Sở Dữ Liệu MySQL

### Bước 2.1. Tạo Database
Mở MySQL Client (MySQL Workbench, DBeaver hoặc Command Line) và chạy lệnh SQL:

```sql
CREATE DATABASE chatbot_p_advisor 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
```

---

## 3. Cấu Hình Backend Server (`/server`)

### Bước 3.1. Cấu hình file `application-local.properties`
Chỉnh sửa file `server/src/main/resources/application-local.properties` để thiết lập thông số kết nối:

```properties
# Server Port & Context Path
app.config.server-port=8080
app.config.context-path=/chatbot-advisor
app.config.application-name=chatbot-advisor-api

# MySQL Database Configuration
app.config.datasource-url=jdbc:mysql://localhost:3306/chatbot_p_advisor?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
app.config.datasource-driver=com.mysql.cj.jdbc.Driver
app.config.datasource-username=root
app.config.datasource-password=your_mysql_password
app.config.jpa-ddl-auto=update
app.config.jpa-show-sql=true

# JWT Token Security (Thay thế bằng chuỗi bí mật tối thiểu 64 ký tự)
app.config.jwt-signer-key=ybCAfgVhcqoNUieblt5TucacDf7a66Pyo95bm6CZjcRevhtrDD99be7YozxogRfV
app.config.jwt-valid-duration=3600
app.config.jwt-refreshable-duration=604800

# Client App URL (CORS Frontend)
app.config.frontend-url=http://localhost:5173
app.config.password-reset-expiration-minutes=15
app.config.email-verification-expiration-minutes=1440

# Firebase Admin SDK Configuration
app.firebase.project-id=chatbot-p-advisor
app.firebase.service-account-path=classpath:chatbot-p-advisor-firebase-adminsdk-fbsvc-1a5c1e7e19.json

# Gmail SMTP Mail Service (Sử dụng App Password của Google)
app.config.mail-host=smtp.gmail.com
app.config.mail-port=587
app.config.mail-username=your_email@gmail.com
app.config.mail-password=your_gmail_app_password
app.config.mail-smtp-auth=true
app.config.mail-starttls-enable=true

# Spring AI / Google Gemini / OpenAI Configuration
spring.ai.openai.api-key=YOUR_GEMINI_OR_OPENAI_API_KEY
spring.ai.openai.chat.base-url=https://generativelanguage.googleapis.com/v1beta/openai
spring.ai.openai.chat.model=gemini-3.5-flash-lite

# Tesseract OCR Configuration
app.document.ocr.enabled=true
app.document.ocr.languages=vie+eng
app.document.ocr.data-path=tessdata
app.document.ocr.max-pages=30
```

> [!IMPORTANT]
> - Nếu sử dụng **Google Gemini API**, cấu hình `spring.ai.openai.chat.base-url=https://generativelanguage.googleapis.com/v1beta/openai` giúp Spring AI gọi Gemini API theo giao thức tương thích OpenAI.
> - File Service Account của Firebase (`chatbot-p-advisor-firebase-adminsdk-....json`) phải được đặt trong thư mục `server/src/main/resources/`.

---

## 4. Cấu Hình Frontend Client (`/client`)

Tạo hoặc chỉnh sửa file `client/.env.local`:

```env
# Backend Base API Endpoint
VITE_API_BASE_URL=http://localhost:8080/chatbot-advisor

# Firebase Client Web Config
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=chatbot-p-advisor.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=chatbot-p-advisor
VITE_FIREBASE_STORAGE_BUCKET=chatbot-p-advisor.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

---

## 5. Cài Đặt Dữ Liệu Tesseract OCR (`tessdata`)

Để tính năng OCR đọc tài liệu và ảnh quét tiếng Việt hoạt động:
1. Tải hai tệp dữ liệu ngôn ngữ Tesseract:
   - `vie.traineddata` (Tiếng Việt)
   - `eng.traineddata` (Tiếng Anh)
2. Tạo thư mục `tessdata/` tại thư mục gốc Backend hoặc trỏ đường dẫn trong `app.document.ocr.data-path`.
3. Đặt hai tệp `.traineddata` vào thư mục `tessdata/`.

---

## 6. Khởi Chạy Môi Trường Phát Triển (Development)

### Bước 6.1. Khởi chạy Backend Server
Mở Cửa sổ Dòng lệnh / Terminal tại thư mục `server/`:

- **Trên Windows**:
  ```cmd
  cd server
  .\mvnw.cmd spring-boot:run
  ```
- **Trên Linux / macOS**:
  ```bash
  cd server
  ./mvnw spring-boot:run
  ```
*Backend khởi chạy thành công tại: `http://localhost:8080/chatbot-advisor`*

### Bước 6.2. Khởi chạy Frontend Client
Mở Cửa sổ Dòng lệnh / Terminal thứ hai tại thư mục `client/`:

```bash
cd client
# Cài đặt thư viện phụ thuộc
npm install

# Khởi chạy Vite Dev Server
npm run dev
```
*Frontend ứng dụng truy cập tại: `http://localhost:5173`*

---

## 7. Đóng Gói & Triển Khai Production

### 7.1. Đóng gói Backend thành tệp JAR
Tại thư mục `server/`:
```bash
./mvnw clean package -DskipTests
```
File thực thi JAR sẽ tạo ra tại `server/target/server-0.0.1-SNAPSHOT.jar`.

Chạy ứng dụng Production:
```bash
java -jar -DSPRING_PROFILES_ACTIVE=prod target/server-0.0.1-SNAPSHOT.jar
```

### 7.2. Đóng gói Frontend tĩnh
Tại thư mục `client/`:
```bash
npm run build
```
Thư mục `client/dist/` chứa toàn bộ mã nguồn HTML/JS/CSS tĩnh đã được tối ưu hóa. Bạn có thể upload thư mục này lên Nginx, Apache hoặc Static Hosting (Vercel, Netlify).

---

## 8. Xử Lý Sự Cố Thường Gặp (Troubleshooting & FAQs)

### ❓ Lỗi 1: CORS Error khi Frontend gọi API Backend
- **Nguyên nhân**: Mới đổi Port Frontend nhưng chưa cập nhật trong config Backend.
- **Khắc phục**: Kiểm tra thuộc tính `app.config.frontend-url` trong `application-local.properties` đảm bảo trùng khớp chính xác với URL Frontend (ví dụ `http://localhost:5173`).

### ❓ Lỗi 2: OCR Tesseract Crash / Không trích xuất được tiếng Việt
- **Nguyên nhân**: Thiếu tệp `vie.traineddata` hoặc sai đường dẫn `tessdata`.
- **Khắc phục**: Kiểm tra logs server. Đảm bảo thư mục `tessdata/` chứa đúng file `vie.traineddata` và `eng.traineddata`.

### ❓ Lỗi 3: Firebase Admin SDK Init Failure
- **Nguyên nhân**: Không tìm thấy tệp JSON Service Account trong `src/main/resources/`.
- **Khắc phục**: Tải tệp mới từ Firebase Console -> Project Settings -> Service Accounts -> Generate new private key và lưu vào `server/src/main/resources/`.

### ❓ Lỗi 4: Không nhận được thông báo WebSocket trên Admin Dashboard
- **Nguyên nhân**: Chưa kết nối thành công hoặc chưa gửi payload xác thực `AUTHENTICATE`.
- **Khắc phục**: Mở DevTools phần Network -> WS, kiểm tra kết nối `/ws/admin/chat` đã nhận message `{"type":"AUTHENTICATED"}` chưa.
