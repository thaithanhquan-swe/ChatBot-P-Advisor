# Hướng dẫn cài đặt và chạy ChatBot P-Advisor

Tài liệu này hướng dẫn một thành viên mới chuẩn bị môi trường, cấu hình, chạy backend/frontend và dùng Swagger để kiểm tra API.

## 1. Chuẩn bị môi trường

| Thành phần | Phiên bản khuyến nghị | Mục đích |
| --- | --- | --- |
| JDK | 21 | Chạy backend Spring Boot. |
| Node.js | 18 trở lên | Chạy frontend Vite. |
| npm | Đi kèm Node.js | Cài thư viện frontend. |
| MySQL | 8 trở lên | Cơ sở dữ liệu chính. |
| Tesseract OCR | 5.x | Tùy chọn; đọc tài liệu scan/ảnh. |

Kiểm tra nhanh:

```powershell
java -version
node --version
npm --version
mysql --version
```

## 2. Cấu hình backend

### 2.1. Tạo cơ sở dữ liệu

Đăng nhập MySQL và chạy:

```sql
CREATE DATABASE chatbot_p_advisor
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

### 2.2. Tạo cấu hình cục bộ

Tạo tệp `server/src/main/resources/application-local.properties`. Tệp này đã nằm trong `.gitignore`; không commit tệp có thông tin bí mật.

```properties
# Máy chủ
app.config.server-port=8080
app.config.context-path=/chatbot-advisor
app.config.application-name=chatbot-advisor-api
app.config.frontend-url=http://localhost:5173

# MySQL
app.config.datasource-url=jdbc:mysql://localhost:3306/chatbot_p_advisor?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
app.config.datasource-driver=com.mysql.cj.jdbc.Driver
app.config.datasource-username=root
app.config.datasource-password=<MAT_KHAU_MYSQL>
app.config.jpa-ddl-auto=update
app.config.jpa-show-sql=true

# JWT: dùng chuỗi ngẫu nhiên mạnh, tối thiểu 64 ký tự
app.config.jwt-signer-key=<JWT_SIGNER_KEY>
app.config.jwt-valid-duration=3600
app.config.jwt-refreshable-duration=604800

# Email (điền khi cần chức năng xác thực email/đặt lại mật khẩu)
app.config.mail-host=smtp.gmail.com
app.config.mail-port=587
app.config.mail-username=<EMAIL_GUI>
app.config.mail-password=<GOOGLE_APP_PASSWORD>
app.config.mail-smtp-auth=true
app.config.mail-starttls-enable=true

# Lưu tệp và OCR
app.document.storage-location=uploads/documents
app.chat-message.storage-location=uploads/chat-messages
app.system-config.storage-location=uploads/system-config
app.document.ocr.enabled=true
app.document.ocr.languages=vie+eng
app.document.ocr.data-path=tessdata
app.document.ocr.max-pages=30

# Firebase (cần cho đăng nhập Google)
app.firebase.project-id=<FIREBASE_PROJECT_ID>
app.firebase.service-account-path=classpath:<TEN_FILE_SERVICE_ACCOUNT>.json
```

Thiết lập API key AI bằng biến môi trường, không ghi vào tệp cấu hình. Trên PowerShell của phiên terminal hiện tại:

```powershell
$env:OPENAI_API_KEY = "<API_KEY>"
$env:OPENAI_CHAT_MODEL = "gpt-4o-mini"
```

Nếu dùng Gemini qua API tương thích OpenAI, cấu hình thêm URL base và model phù hợp trong `application-local.properties` hoặc biến môi trường triển khai. Kiểm tra nhà cung cấp để dùng đúng model/API key.

### 2.3. Thiết lập OCR (tùy chọn)

Tạo thư mục `server/tessdata/`, sau đó đặt `vie.traineddata` và `eng.traineddata` vào đó. Nếu không dùng OCR, đặt `app.document.ocr.enabled=false`.

## 3. Cấu hình frontend

Tại thư mục `client/`, tạo tệp `.env.local` từ `.env.example`:

```powershell
Copy-Item .env.example .env.local
```

Điền các giá trị cần thiết:

```env
VITE_API_URL=http://localhost:8080/chatbot-advisor
VITE_FIREBASE_API_KEY=<FIREBASE_WEB_API_KEY>
VITE_FIREBASE_AUTH_DOMAIN=<PROJECT_ID>.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=<PROJECT_ID>
VITE_FIREBASE_APP_ID=<FIREBASE_APP_ID>
```

Firebase chỉ cần thiết nếu sử dụng đăng nhập Google. Dù không dùng Firebase, `VITE_API_URL` vẫn bắt buộc để frontend gọi backend.

## 4. Chạy dự án

Mở hai terminal từ thư mục gốc dự án.

### Terminal 1: backend

Windows:

```powershell
cd server
.\mvnw.cmd spring-boot:run
```

Linux/macOS:

```bash
cd server
./mvnw spring-boot:run
```

Khi log cho biết ứng dụng đã khởi động, kiểm tra API tại `http://localhost:8080/chatbot-advisor`.

### Terminal 2: frontend

```powershell
cd client
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị trên terminal, thông thường là `http://localhost:5173`.

### Kiểm tra nhanh sau khi chạy

1. Mở Swagger UI theo URL ở phần dưới.
2. Gọi `POST /auth/login` bằng một tài khoản đã có.
3. Dùng token nhận được để gọi `GET /users/me`.
4. Mở frontend và thử gửi một tin nhắn chatbot.

## 5. Sử dụng Swagger / OpenAPI

Swagger được cung cấp bởi `springdoc-openapi`. Backend phải chạy trước khi truy cập các URL sau:

| Tài nguyên | URL mặc định |
| --- | --- |
| Swagger UI | `http://localhost:8080/chatbot-advisor/swagger-ui/index.html` |
| OpenAPI JSON | `http://localhost:8080/chatbot-advisor/v3/api-docs` |

### Gọi API công khai

1. Mở Swagger UI.
2. Chọn endpoint, ví dụ `POST /auth/login`.
3. Nhấn **Try it out**.
4. Nhập request body rồi nhấn **Execute**.
5. Xem `Response body`, `Response headers` và lệnh cURL mà Swagger sinh ra.

### Gọi API cần JWT

1. Gọi `POST /auth/login` để lấy giá trị `result.token`.
2. Nhấn nút **Authorize** ở đầu trang Swagger.
3. Ở mục `bearerAuth`, dán **chỉ JWT token**; Swagger tự thêm tiền tố `Bearer` khi gửi request.
4. Nhấn **Authorize**, đóng hộp thoại và gọi endpoint có biểu tượng khóa.
5. Muốn đổi tài khoản hoặc xóa token, mở lại **Authorize** và nhấn **Logout**.

`@SecurityRequirement(name = "bearerAuth")` được đặt trên từng endpoint cần xác thực. Vì vậy Swagger chỉ hiển thị yêu cầu token tại những endpoint đó; quyền `ADMIN`/`ADVISOR` vẫn được backend kiểm tra thực tế.

Nếu nhận `401 Unauthorized`, kiểm tra token đã hết hạn/chưa được nhập. Nếu nhận `403 Forbidden`, token hợp lệ nhưng tài khoản không có role phù hợp.

## 6. Kiểm thử và đóng gói

```powershell
# Backend
cd server
.\mvnw.cmd test
.\mvnw.cmd clean package

# Frontend
cd ..\client
npm run lint
npm run build
```

File JAR được tạo trong `server/target/`; frontend build được tạo trong `client/dist/`.

## 7. Sự cố thường gặp

| Hiện tượng | Cách xử lý |
| --- | --- |
| Backend không kết nối được MySQL | Kiểm tra MySQL đã chạy, tên database, user/password và `app.config.datasource-url`. |
| Frontend bị CORS | Bảo đảm `VITE_API_URL` và `app.config.frontend-url` dùng đúng URL/port; khởi động lại backend sau khi đổi cấu hình. |
| Swagger trả 404 | Kiểm tra backend đã chạy, context path là `/chatbot-advisor` và dùng URL `/swagger-ui/index.html`. |
| Swagger trả 401/403 | Đăng nhập lại, nhập JWT qua **Authorize** và kiểm tra role của tài khoản. |
| OCR không đọc được tiếng Việt | Kiểm tra `vie.traineddata`, `eng.traineddata` và `app.document.ocr.data-path`. |
| Đăng nhập Firebase lỗi | Kiểm tra các biến `VITE_FIREBASE_*`, project ID và đường dẫn tệp Firebase Service Account. |
