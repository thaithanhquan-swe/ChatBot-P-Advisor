# ChatBot P-Advisor

ChatBot P-Advisor là hệ thống tư vấn tuyển sinh gồm chatbot AI, kho tri thức RAG, quản lý tài liệu/FAQ, tiếp nhận yêu cầu tư vấn và chat thời gian thực giữa thí sinh với tư vấn viên.

## Thành phần dự án

| Thư mục | Công nghệ | Vai trò |
| --- | --- | --- |
| `client/` | React 19, Vite, Tailwind CSS | Giao diện người dùng và trang quản trị. |
| `server/` | Java 21, Spring Boot, MySQL | REST API, xác thực JWT, WebSocket, RAG và OCR. |
| `docs/` | Markdown | Tài liệu kiến trúc, API, cơ sở dữ liệu và vận hành. |

## Yêu cầu trước khi chạy

- JDK 21
- Node.js 18 trở lên và npm
- MySQL 8 trở lên
- Tesseract OCR 5 (nếu cần đọc PDF scan/ảnh)
- API key OpenAI-compatible/Gemini để sử dụng chatbot AI

## Chạy nhanh ở môi trường phát triển

1. Tạo cơ sở dữ liệu:

   ```sql
   CREATE DATABASE chatbot_p_advisor
   CHARACTER SET utf8mb4
   COLLATE utf8mb4_unicode_ci;
   ```

2. Cấu hình backend theo [hướng dẫn thiết lập](docs/setup.md#2-cấu-hình-backend). Không đưa API key, mật khẩu MySQL, SMTP hoặc Firebase Service Account vào Git.

3. Mở một terminal tại `server/` và chạy:

   ```powershell
   .\mvnw.cmd spring-boot:run
   ```

   API mặc định: `http://localhost:8080/chatbot-advisor`

4. Mở terminal khác tại `client/`, tạo `.env.local` từ `.env.example`, rồi chạy:

   ```powershell
   npm install
   npm run dev
   ```

   Giao diện mặc định: `http://localhost:5173`

## Swagger / OpenAPI

Sau khi backend khởi động, truy cập:

- Swagger UI: `http://localhost:8080/chatbot-advisor/swagger-ui/index.html`
- OpenAPI JSON: `http://localhost:8080/chatbot-advisor/v3/api-docs`

Các API yêu cầu JWT đã được đánh dấu biểu tượng khóa trong Swagger. Xem hướng dẫn đăng nhập, nhập token và thử API tại [Sử dụng Swagger](docs/setup.md#5-sử-dụng-swagger--openapi).

## Tài liệu

- [Hướng dẫn cài đặt, cấu hình và chạy dự án](docs/setup.md)
- [Danh mục API, xác thực và WebSocket](docs/api.md)
- [Kiến trúc hệ thống](docs/architecture.md)
- [Cơ sở dữ liệu](docs/database.md)
- [Quy tắc nghiệp vụ](docs/business-rules.md)

## Lệnh thường dùng

| Mục đích | Lệnh |
| --- | --- |
| Chạy backend trên Windows | `cd server; .\mvnw.cmd spring-boot:run` |
| Chạy kiểm thử backend | `cd server; .\mvnw.cmd test` |
| Đóng gói backend | `cd server; .\mvnw.cmd clean package` |
| Chạy frontend | `cd client; npm run dev` |
| Kiểm tra lint frontend | `cd client; npm run lint` |
| Build frontend | `cd client; npm run build` |

## Lưu ý bảo mật

- Các tệp cấu hình cục bộ như `application-local.properties`, `.env.local` và Firebase Service Account được bỏ qua bởi Git; chỉ lưu bí mật trên máy cục bộ hoặc secret manager của môi trường triển khai.
- Nếu token, mật khẩu SMTP hoặc API key từng bị đưa vào repository/log, hãy thu hồi (rotate) ngay trước khi tiếp tục sử dụng.
