# 🔌 API Documentation - ChatBot P-Advisor

Tài liệu này cung cấp danh mục chi tiết toàn bộ các RESTful API Endpoints, giao thức WebSocket thời gian thực, quy chuẩn dữ liệu Request/Response và bảng mã lỗi chuẩn (`ErrorCode`) của hệ thống **ChatBot P-Advisor**.

---

## 1. Quy Chuẩn API Request & Response (API Envelopes)

Tất cả các API RESTful trong hệ thống đều thống nhất cấu trúc Response dạng JSON bọc trong lớp `ApiResponse<T>` hoặc `PageResponse<T>`.

### 1.1. Cấu Trúc Standard API Response (`ApiResponse<T>`)
```json
{
  "code": 1000,
  "message": "Thành công",
  "result": { ... }
}
```
- `code` *(int)*: Mã trạng thái nội bộ. Giá trị `1000` mặc định là thành công. Các mã khác đại diện cho các lỗi cụ thể (xem phần Mã lỗi).
- `message` *(string)*: Thông điệp phản hồi (thường dùng thông báo thành công hoặc lỗi chi tiết).
- `result` *(T)*: Dữ liệu kết quả trả về (Object, Array hoặc null).

### 1.2. Cấu Trúc Tranh Phân Trang (`PageResponse<T>`)
Dành cho các API truy vấn danh sách có phân trang:
```json
{
  "code": 1000,
  "result": {
    "currentPage": 1,
    "totalPages": 5,
    "pageSize": 10,
    "totalElements": 48,
    "data": [ { ... }, { ... } ]
  }
}
```

### 1.3. Headers Xác Thực (Authentication Header)
Đối với các endpoint yêu cầu quyền đăng nhập, thêm Header:
```http
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

---

## 2. Chi Tiết Danh Mục RESTful API Endpoints

### 2.1. Authentication Controller (`/auth`)

| Endpoint | Method | Security | Mô tả |
| :--- | :--- | :--- | :--- |
| `/auth/register` | `POST` | Public | Đăng ký tài khoản người dùng mới (gửi email kích hoạt) |
| `/auth/verify-email` | `POST` | Public | Xác thực email đăng ký thông qua Token |
| `/auth/login` | `POST` | Public | Đăng nhập bằng Email/Username & Mật khẩu |
| `/auth/firebase` | `POST` | Public | Đăng nhập/Đăng ký nhanh qua Firebase Google Sign-In |
| `/auth/refresh_token` | `POST` | Public | Làm mới Access Token khi đã hết hạn |
| `/auth/logout` | `POST` | Public | Đăng xuất (Vô hiệu hóa Refresh/Access Token) |
| `/auth/introspect` | `POST` | Public | Kiểm tra tính hợp lệ của Token |
| `/auth/forgot-password` | `POST` | Public | Gửi yêu cầu đặt lại mật khẩu qua Email |
| `/auth/reset-password` | `POST` | Public | Đặt lại mật khẩu mới bằng Token từ Email |

#### Request Mẫu - Đăng Nhập (`POST /auth/login`):
```json
{
  "username": "user123",
  "password": "Password123@"
}
```
#### Response Mẫu (`POST /auth/login`):
```json
{
  "code": 1000,
  "result": {
    "token": "eyJhbGciOiJIUzUxMiJ9...",
    "authenticated": true
  }
}
```

---

### 2.2. User Management Controller (`/users`)

| Endpoint | Method | Security | Mô tả |
| :--- | :--- | :--- | :--- |
| `/users/me` | `GET` | Authenticated | Lấy thông tin cá nhân của người dùng đang đăng nhập |
| `/users` | `GET` | `ADMIN` | Quản lý danh sách người dùng (lọc, tìm kiếm, phân trang) |
| `/users/statistics` | `GET` | `ADMIN` | Thống kê số lượng người dùng theo vai trò, ngày tạo |
| `/users/{id}` | `GET` | `ADMIN` | Lấy chi tiết thông tin người dùng theo ID |
| `/users/{userId}` | `PUT` | `ADMIN` | Cập nhật thông tin/vai trò người dùng theo ID |

---

### 2.3. Role Management Controller (`/roles`)

| Endpoint | Method | Security | Mô tả |
| :--- | :--- | :--- | :--- |
| `/roles` | `POST` | `ADMIN` | Tạo vai trò mới hệ thống |
| `/roles` | `GET` | `ADMIN` | Lấy danh sách các vai trò hệ thống |
| `/roles/{roleId}` | `DELETE` | `ADMIN` | Xóa vai trò theo ID |

---

### 2.4. Chat Session Controller (`/chat-sessions`)

| Endpoint | Method | Security | Mô tả |
| :--- | :--- | :--- | :--- |
| `/chat-sessions` | `POST` | Public / Auth | Khởi tạo phiên chat mới (Cho Guest hoặc User) |
| `/chat-sessions/{sessionToken}` | `GET` | Public / Auth | Lấy thông tin chi tiết phiên chat theo Token |
| `/chat-sessions/me/history` | `GET` | Authenticated | Lấy lịch sử các phiên chat của User đang đăng nhập |
| `/chat-sessions/{sessionToken}/attach` | `POST` | Authenticated | Gắn kết phiên chat của Guest vào tài khoản vừa đăng nhập |
| `/chat-sessions/{sessionToken}/questions` | `POST` | Public | Trừ lượt hỏi của phiên chat Guest (Giới hạn lượt hỏi) |
| `/chat-sessions/{sessionToken}/request-staff` | `POST` | Public / Auth | Gửi yêu cầu kết nối với Tư vấn viên (Staff Handover) |
| `/chat-sessions/staff/waiting` | `GET` | `ADMIN, ADVISOR` | Danh sách các phiên chat đang chờ Tư vấn viên tiếp nhận |
| `/chat-sessions/staff/registered-users` | `GET` | `ADMIN, ADVISOR` | Danh sách các phiên chat của người dùng đã đăng nhập |
| `/chat-sessions/staff/assigned-to-me` | `GET` | `ADMIN, ADVISOR` | Danh sách các phiên chat đang giao cho Staff hiện tại |
| `/chat-sessions/staff/{sessionId}/assign` | `POST` | `ADMIN, ADVISOR` | Tư vấn viên nhận quản lý phiên chat |
| `/chat-sessions/staff/{sessionId}/return-to-bot` | `POST` | `ADMIN, ADVISOR` | Trả lại phiên chat cho Chatbot AI xử lý tiếp |
| `/chat-sessions/{sessionToken}` | `DELETE` | Public / Auth | Xóa phiên chat theo Session Token |

---

### 2.5. Chat Messages Controller (`/chat-messages`)

| Endpoint | Method | Content-Type | Security | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `/chat-messages/{sessionToken}` | `POST` | `multipart/form-data` | Public / Auth | Gửi tin nhắn từ người dùng (Có thể kèm ảnh) & nhận phản hồi từ AI |
| `/chat-messages/{sessionToken}` | `GET` | `application/json` | Public / Auth | Lấy danh sách tin nhắn của một phiên chat |
| `/chat-messages/staff/{sessionId}` | `POST` | `multipart/form-data` | `ADMIN, ADVISOR` | Ban tư vấn gửi tin nhắn trả lời thí sinh |

---

### 2.6. Document Management Controller (`/documents`)

| Endpoint | Method | Content-Type | Security | Mô tả |
| :--- | :--- | :--- | :--- | :--- |
| `/documents` | `POST` | `multipart/form-data` | `ADMIN, ADVISOR` | Tải lên tài liệu mới (Tự động trích xuất Tika / Tess4J OCR) |
| `/documents` | `GET` | `application/json` | `ADMIN, ADVISOR` | Tra cứu danh sách tài liệu tri thức (Phân trang, Lọc) |
| `/documents/{id}` | `GET` | `application/json` | `ADMIN, ADVISOR` | Lấy thông tin chi tiết một tài liệu |
| `/documents/{id}` | `PUT` | `application/json` | `ADMIN, ADVISOR` | Cập nhật tiêu đề, mô tả, nội dung trích xuất của tài liệu |
| `/documents/{id}` | `DELETE` | `application/json` | `ADMIN, ADVISOR` | Xóa tài liệu khỏi hệ thống |

---

### 2.7. FAQ & Category Controllers (`/faq` & `/faq-categories`)

#### Danh Mục FAQ (`/faq-categories`)
| Endpoint | Method | Security | Mô tả |
| :--- | :--- | :--- | :--- |
| `/faq-categories` | `POST` | `ADMIN, ADVISOR` | Tạo danh mục FAQ mới |
| `/faq-categories` | `GET` | Public | Lấy danh sách toàn bộ danh mục FAQ |
| `/faq-categories/{id}` | `GET` | Public | Lấy chi tiết danh mục theo ID |
| `/faq-categories/{id}` | `PUT` | `ADMIN, ADVISOR` | Cập nhật danh mục FAQ |
| `/faq-categories/{id}` | `DELETE` | `ADMIN, ADVISOR` | Xóa danh mục FAQ |

#### Câu Hỏi Thường Gặp (`/faq`)
| Endpoint | Method | Security | Mô tả |
| :--- | :--- | :--- | :--- |
| `/faq` | `POST` | `ADMIN, ADVISOR` | Tạo câu hỏi FAQ mới |
| `/faq` | `GET` | Public | Lấy danh sách FAQ đã xuất bản (`PUBLISHED`) |
| `/faq/{id}` | `GET` | Public | Xem chi tiết FAQ theo ID |
| `/faq/management` | `GET` | `ADMIN, ADVISOR` | Quản lý danh sách FAQ (bao gồm cả DRAFT/ARCHIVED) |
| `/faq/{id}` | `PUT` | `ADMIN, ADVISOR` | Cập nhật câu hỏi và câu trả lời FAQ |
| `/faq/{id}` | `DELETE` | `ADMIN, ADVISOR` | Xóa câu hỏi FAQ |

---

### 2.8. Consultation Requests Controller (`/consultation-requests`)

| Endpoint | Method | Security | Mô tả |
| :--- | :--- | :--- | :--- |
| `/consultation-requests` | `POST` | Public | Thí sinh gửi form đăng ký tư vấn trực tiếp |
| `/consultation-requests` | `GET` | `ADMIN, ADVISOR` | Danh sách yêu cầu tư vấn (Lọc trạng thái, ngày tạo) |
| `/consultation-requests/{id}/assign` | `POST` | `ADMIN, ADVISOR` | Nhận xử lý yêu cầu tư vấn |
| `/consultation-requests/{id}/resolve` | `POST` | `ADMIN, ADVISOR` | Đánh dấu yêu cầu tư vấn đã giải quyết xong |

---

## 3. Giao Thức WebSocket Realtime (`/ws/admin/chat`)

Hệ thống cung cấp Endpoint WebSocket giao tiếp thời gian thực dành riêng cho Ban tư vấn (Advisor / Admin):
- **URL**: `ws://localhost:8080/chatbot-advisor/ws/admin/chat`

### 3.1. Luồng Xác Thực (Handshake & Authentication)
Sau khi thiết lập kết nối WebSocket thành công, Client phải gửi payload xác thực trong vòng 5 giây:
- **Client ➔ Server (Authenticate Request)**:
```json
{
  "type": "AUTHENTICATE",
  "token": "eyJhbGciOiJIUzUxMiJ9..."
}
```
- **Server ➔ Client (Authenticated Response)**:
```json
{
  "type": "AUTHENTICATED"
}
```

### 3.2. Các Sự Kiện Broadcast Từ Server (Realtime Event Payloads)
Khi có thay đổi dữ liệu chat, Server sẽ broadcast event tới tất cả các tài khoản Ban tư vấn đang kết nối:

```json
{
  "type": "STAFF_REQUESTED",
  "sessionId": "4a2b9c1d-8e7f-4a0b-9c8d-7e6f5a4b3c2d"
}
```

#### Các giá trị `type` sự kiện WebSocket:
- `CHAT_SESSION_CREATED`: Khởi tạo phiên chat mới.
- `STAFF_REQUESTED`: Người dùng yêu cầu gặp tư vấn viên.
- `USER_MESSAGE_SENT`: Người dùng vừa gửi tin nhắn mới.
- `STAFF_MESSAGE_SENT`: Ban tư vấn vừa phản hồi tin nhắn.
- `STAFF_ASSIGNED`: Đã có tư vấn viên tiếp nhận phiên chat.
- `RETURNED_TO_BOT`: Đã trả lại phiên chat cho AI Chatbot.

---

## 4. Danh Mục Mã Lỗi Chuẩn (`ErrorCode`)

Khi có lỗi xảy ra, hệ thống trả về mã lỗi trong trường `code` cùng HTTP Status tương ứng:

| Code | Message | HTTP Status | Mô tả lỗi |
| :--- | :--- | :--- | :--- |
| `1000` | Success | `200 OK` | Thực thi thành công |
| `9999` | Uncategorized error | `500 Internal Error` | Lỗi hệ thống không xác định |
| `1001` | Uncategorized error | `400 Bad Request` | Khóa truyền vào không hợp lệ |
| `1002` | User existed | `400 Bad Request` | Tên đăng nhập / Email đã tồn tại |
| `1003` | Username invalid | `400 Bad Request` | Tên đăng nhập không đúng định dạng |
| `1004` | Password invalid | `400 Bad Request` | Mật khẩu không đúng định dạng |
| `1005` | User not existed / Role not existed | `404 Not Found` | Không tìm thấy Người dùng / Vai trò |
| `1006` | Unauthenticated | `401 Unauthorized` | Chưa đăng nhập hoặc Token hết hạn |
| `1007` | You do not have permission | `403 Forbidden` | Không có quyền truy cập endpoint |
| `1009` | Email is invalid | `400 Bad Request` | Địa chỉ email không đúng định dạng |
| `1010` | Reset token is invalid or expired | `400 Bad Request` | Token khôi phục mật khẩu không hợp lệ/hết hạn |
| `1012` | FAQ category not found | `404 Not Found` | Không tìm thấy danh mục FAQ |
| `1015` | FAQ not found | `404 Not Found` | Không tìm thấy câu hỏi FAQ |
| `1019` | Verification link is invalid or expired | `400 Bad Request` | Link xác thực email không hợp lệ hoặc hết hạn |
| `1020` | Email has not been verified | `403 Forbidden` | Tài khoản chưa kích hoạt qua Email |
| `1021` | Document not found | `404 Not Found` | Không tìm thấy tài liệu tri thức |
| `1025` | Chat session not found | `404 Not Found` | Không tìm thấy phiên chat |
| `1027` | Guest question limit reached | `401 Unauthorized` | Đã hết lượt hỏi miễn phí cho Guest |
| `1028` | Chat session belongs to another user | `409 Conflict` | Phiên chat thuộc về người dùng khác |
| `1030` | Chat session has already been assigned | `409 Conflict` | Phiên chat đã có tư vấn viên khác tiếp nhận |
| `1031` | Chat session is not assigned to you | `403 Forbidden` | Phiên chat chưa được phân công cho bạn |
| `1033` | AI service is temporarily unavailable | `530 Service Unavailable` | Lỗi kết nối dịch vụ Gemini/OpenAI API |
| `1044` | Firebase authentication failed | `401 Unauthorized` | Xác thực ID Token Firebase thất bại |
