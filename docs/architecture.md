# 🏗️ Architecture Documentation - ChatBot P-Advisor

Tài liệu này mô tả chi tiết kiến trúc kỹ thuật của hệ thống **ChatBot P-Advisor**, bao gồm mô hình tổng quan các tầng ứng dụng, luồng dữ liệu, tích hợp AI RAG & OCR, kiến trúc WebSocket thời gian thực và mô hình bảo mật phân quyền.

---

## 1. Tổng Quan Kiến Trúc Hệ Thống (System Overview)

Dự án được xây dựng theo mô hình **Client-Server phân tách (Decoupled System)** với Frontend là Single Page Application (SPA) phát triển trên **React 19 + Vite**, và Backend dựa trên **Spring Boot 3.4 / Java 21** cung cấp RESTful APIs & WebSocket endpoints.

```mermaid
flowchart TB
    subgraph ClientLayer ["Client Layer (Frontend SPA)"]
        UI["React 19 SPA (Vite + Tailwind CSS)"]
        WSClient["WebSocket Client (Native / SockJS)"]
        FirebaseAuth["Firebase Client SDK"]
    end

    subgraph SecurityLayer ["Security & Ingress Layer"]
        CORS["CORS Filter & Security Config"]
        JWTDecoder["Custom JWT Decoder / OAuth2 Resource Server"]
    end

    subgraph BackendLayer ["Backend Layer (Spring Boot 3.4 / Java 21)"]
        Controllers["REST Controllers (/auth, /chat-sessions, /documents, ...)"]
        WSHandler["AdminChatWebSocketHandler (/ws/admin/chat)"]
        
        subgraph BusinessServices ["Services Core"]
            AuthService["AuthenticationService"]
            ChatAiService["ChatAiService (RAG Logic)"]
            RetrievalService["KnowledgeRetrievalService"]
            DocService["DocumentService & OCR Processor"]
            ChatMessageService["ChatMessageService"]
        end
        
        Repositories["Spring Data JPA Repositories"]
    end

    subgraph DataStorage ["Data Storage & External Services"]
        MySQL[("MySQL Database (chatbot_p_advisor)")]
        LocalFiles["Local File System (uploads/documents, uploads/chat-messages)"]
        GeminiAI["Spring AI / Gemini 3.5 Flash Lite (Google AI API)"]
        FirebaseAdmin["Firebase Admin SDK (Token Verification)"]
        SMTPMail["Gmail SMTP Server (Email Verification / Password Reset)"]
        TesseractOCR["Tess4J (Tesseract OCR Engine)"]
    end

    UI -->|HTTPS REST Request| CORS
    WSClient -->|WSS Handshake & Authenticate| WSHandler
    FirebaseAuth -->|Obtain ID Token| UI

    CORS --> JWTDecoder
    JWTDecoder --> Controllers

    Controllers --> BusinessServices
    WSHandler --> ChatMessageService

    ChatAiService --> RetrievalService
    ChatAiService -->|Prompt + Context| GeminiAI
    DocService -->|Extract Text & Scan OCR| TesseractOCR
    DocService -->|Store Files| LocalFiles
    AuthService -->|Verify Firebase Token| FirebaseAdmin
    AuthService -->|Send Email| SMTPMail

    BusinessServices --> Repositories
    Repositories --> MySQL
```

---

## 2. Kiến Trúc Phân Tầng Backend (Layered Architecture)

Backend tuân thủ nghiêm ngặt **Mô hình 3 tầng (3-Tier Layered Architecture)** nhằm đảm bảo khả năng mở rộng, bảo trì và dễ dàng kiểm thử:

```mermaid
graph TD
    Client[Client / Web Browser] <-->|JSON DTO / Multipart| Controller[Controller Layer]
    Controller <-->|Data Transfer Objects DTO| Service[Service Layer]
    Service <-->|Domain Entities| Repository[Repository Layer]
    Repository <-->|SQL Queries| DB[(MySQL Database)]
    
    subgraph Core Helpers
        Mapper[MapStruct Mappers]
        Exception[Global Exception Handler]
        Security[Spring Security Config]
    end
    
    Controller --- Exception
    Controller --- Security
    Service --- Mapper
```

1. **Controller Layer (`com.example.server.controller`)**:
   - Chỉ chịu trách nhiệm tiếp nhận HTTP Request, validate tham số đầu vào (`@Valid`), kiểm tra quyền truy cập (`@PreAuthorize`) và trả về `ApiResponse<T>`.
   - Không chứa bất kỳ logic nghiệp vụ nào.

2. **Service Layer (`com.example.server.service`)**:
   - Chứa toàn bộ Business Logic của hệ thống (Xử lý chuỗi RAG Prompt, chuyển đổi trạng thái ChatSession, trích xuất tài liệu OCR, phân công Staff).
   - Quản lý giao dịch database với annotation `@Transactional`.

3. **Repository Layer (`com.example.server.repository`)**:
   - Truy cập CSDL MySQL thông qua Spring Data JPA. Định nghĩa các hàm truy vấn tùy chỉnh (`JpaRepository`, `@Query`).

4. **DTO & Mapper Layer (`dto`, `mapper`)**:
   - Không bao giờ trả Entity trực tiếp ra Controller. Tách biệt tuyệt đối giữa `Request DTO`, `Response DTO` và `Entity` bằng **MapStruct**.

---

## 3. Các Luồng Xử Lý Chính (Sequence Flow Diagrams)

### 3.1. Luồng Chat AI với RAG & Multimodal Image/Doc Input

Luồng xử lý khi người dùng gửi câu hỏi cho Chatbot AI (có hoặc không có tệp/hình ảnh đính kèm):

```mermaid
sequenceDiagram
    autonumber
    actor User as Thí sinh / User
    participant Client as React Client
    participant Controller as ChatMessageController
    participant ChatAi as ChatAiService
    participant MsgService as ChatMessageService
    participant Retrieval as KnowledgeRetrievalService
    participant SpringAI as Spring AI (Gemini 3.5 Lite)
    participant DB as MySQL DB

    User->>Client: Nhập câu hỏi (+ Đính kèm hình ảnh nếu có)
    Client->>Controller: POST /chat-messages/{sessionToken} (Multipart Form)
    Controller->>ChatAi: chat(sessionToken, content, file)
    ChatAi->>MsgService: sendUserMessage(sessionToken, content, image)
    MsgService->>DB: Lưu ChatMessage (Sender=USER/GUEST)
    MsgService-->>ChatAi: Trả về userMessage DTO

    alt Bot không được phép trả lời (Session đang Staff xử lý)
        ChatAi-->>Controller: Trả về ChatExchangeResponse (chỉ có userMessage)
    else Bot được phép trả lời
        ChatAi->>MsgService: getMessages(sessionToken) - lấy 10 tin nhắn gần nhất
        ChatAi->>Retrieval: retrieve(userMessage.getContent())
        Retrieval->>DB: Tìm kiếm FAQ & Document chunks phù hợp
        Retrieval-->>ChatAi: Trả về chuỗi Context Tri thức (Knowledge Context)
        
        ChatAi->>ChatAi: Ghép System Prompt + Knowledge Context + Lịch sử hội thoại

        alt Không đính kèm ảnh
            ChatAi->>SpringAI: prompt().system().user(conversation).call()
        else Có đính kèm ảnh
            ChatAi->>SpringAI: prompt().system().user(conversation + media).call()
        end

        SpringAI-->>ChatAi: Trả về câu trả lời từ LLM Model
        ChatAi->>ChatAi: sanitizeSourceAttributions() (Lọc link URL web, ẩn filename nội bộ)
        ChatAi->>MsgService: saveBotMessageIfAllowed(sessionToken, answer)
        MsgService->>DB: Lưu ChatMessage (Sender=BOT)
        ChatAi-->>Controller: Trả về ChatExchangeResponse (userMessage + botMessage)
    end
    Controller-->>Client: Trả về ApiResponse<ChatExchangeResponse>
    Client-->>User: Hiển thị câu trả lời AI trên UI
```

---

### 3.2. Luồng Chuyển Tiếp & Chat Realtime với Ban Tư Vấn (Staff Handover)

Khi người dùng nhấn "Yêu cầu tư vấn viên" hoặc câu hỏi nằm ngoài phạm vi tri thức của Bot:

```mermaid
sequenceDiagram
    autonumber
    actor User as Thí sinh / User
    actor Staff as Ban tư vấn (Advisor/Admin)
    participant Client as React User Client
    participant StaffUI as React Admin Dashboard
    participant SessionCtrl as ChatSessionController
    participant SessionSvc as ChatSessionService
    participant WSHandler as AdminChatWebSocketHandler
    participant DB as MySQL DB

    StaffUI->>WSHandler: Kết nối WebSocket /ws/admin/chat
    WSHandler-->>StaffUI: Gửi message {"type":"AUTHENTICATION_REQUIRED"}
    StaffUI->>WSHandler: Gửi token {"type":"AUTHENTICATE", "token":"JWT..."}
    WSHandler-->>StaffUI: Xác thực thành công {"type":"AUTHENTICATED"}

    User->>Client: Nhấn "Gửi yêu cầu gặp Tư vấn viên"
    Client->>SessionCtrl: POST /chat-sessions/{sessionToken}/request-staff
    SessionCtrl->>SessionSvc: requestStaff(sessionToken)
    SessionSvc->>DB: Cập nhật ChatSession status = WAITING_STAFF
    SessionSvc->>WSHandler: publishAfterCommit("STAFF_REQUESTED", sessionId)
    WSHandler-->>StaffUI: Broadcast Event: {"type":"STAFF_REQUESTED", "sessionId":"..."}

    StaffUI->>Staff: Hiển thị thông báo có phiên chat chờ tiếp nhận
    Staff->>StaffUI: Nhấn "Tiếp nhận phiên chat"
    StaffUI->>SessionCtrl: POST /chat-sessions/staff/{sessionId}/assign
    SessionCtrl->>SessionSvc: assignToCurrentStaff(sessionId)
    SessionSvc->>DB: Cập nhật status = STAFF_PROCESSING, staff = currentStaff
    SessionSvc->>WSHandler: publishAfterCommit("STAFF_ASSIGNED", sessionId)
    WSHandler-->>StaffUI: Broadcast Event: {"type":"STAFF_ASSIGNED", "sessionId":"..."}

    Staff->>StaffUI: Nhập tin nhắn trả lời thí sinh
    StaffUI->>ChatMessageCtrl: POST /chat-messages/staff/{sessionId}
    ChatMessageCtrl->>DB: Lưu ChatMessage (Sender=STAFF)
    WSHandler-->>StaffUI: Broadcast Event: {"type":"USER_MESSAGE_SENT", ...}
    Client->>Client: Polling/Refresh tin nhắn hiển thị phản hồi của Staff
```

---

### 3.3. Luồng Trích Xuất Tài Liệu & Xử Lý OCR Tri Thức

Khi Ban tư vấn tải tệp văn bản hoặc hình ảnh thông báo tuyển sinh lên hệ thống:

```mermaid
sequenceDiagram
    autonumber
    actor Staff as Admin / Advisor
    participant Client as Admin Dashboard
    participant DocCtrl as DocumentController
    participant DocSvc as DocumentService
    participant Tika as Apache Tika Parser
    participant Tess4J as Tess4J OCR (Tesseract)
    participant Storage as Disk Storage (uploads/documents)
    participant DB as MySQL DB

    Staff->>Client: Tải tệp tài liệu (.pdf, .docx, .png, .jpg) + Metadata
    Client->>DocCtrl: POST /documents (Multipart Form)
    DocCtrl->>DocSvc: create(file, request)
    DocSvc->>Storage: Lưu tệp vật lý vào thư mục `uploads/documents/`
    
    alt Tệp là dạng văn bản chuẩn (PDF, DOCX, TXT)
        DocSvc->>Tika: parseToString(file)
        Tika-->>DocSvc: Trả về chuỗi văn bản thuần (Extracted Text)
    else Tệp là hình ảnh hoặc PDF dạng ảnh chụp scan
        DocSvc->>Tess4J: doOCR(image/pdf) với ngôn ngữ vie+eng
        Tess4J-->>DocSvc: Trả về văn bản trích xuất qua OCR Engine
    end

    DocSvc->>DB: Lưu Document entity (title, fileUrl, extractedContent, status=PUBLISHED)
    DocSvc-->>DocCtrl: Trả về DocumentResponse
    DocCtrl-->>Client: Hiển thị thông báo tải lên & trích xuất thành công
```

---

## 4. Kiến Trúc Bảo Mật & Phân Quyền (Security Architecture)

Hệ thống bảo mật dựa trên nền tảng **Spring Security 6** kết hợp với chuẩn **OAuth2 Resource Server** và **JWT (JSON Web Token)**:

```mermaid
graph LR
    Req[Incoming HTTP Request] --> HeaderCheck{Có Authorization Bearer Header?}
    HeaderCheck -->|Không| PublicCheck{Endpoint Công Khai?}
    HeaderCheck -->|Có| JwtDecoder[CustomJwtDecoder]
    
    JwtDecoder --> TokenCheck{Token Hợp Lệ & Không bị Revoke?}
    TokenCheck -->|Hợp lệ| Context[Set SecurityContextHolder Authentication]
    TokenCheck -->|Không| Unauth[401 Unauthorized Response]

    PublicCheck -->|Có| Pass[Cho phép truy cập]
    PublicCheck -->|Không| Unauth

    Context --> PreAuthCheck{"Đạt điều kiện @PreAuthorize?"}
    PreAuthCheck -->|Có| Execution[Xử lý Controller Logic]
    PreAuthCheck -->|Không| Forbidden[403 Forbidden Response]
```

### Các Thành Phần Bảo Mật Chính:
1. **Custom JWT Authentication Filter & Decoder (`CustomJwtDecoder.java`)**:
   - Giải mã và xác thực chữ ký JWT bằng Secret Key (`jwt.signerKey`).
   - Kiểm tra Token xem có nằm trong bảng `invalidated_tokens` (các token đã logout) hay không.
2. **Xác Thực Đăng Nhập Firebase (`firebaseLogin`)**:
   - Tiếp nhận Firebase ID Token từ Client qua SDK Google.
   - Sử dụng **Firebase Admin SDK** để kiểm tra tính hợp lệ của token và tự động đồng bộ/tạo mới tài khoản người dùng tương ứng trong CSDL.
3. **Phân Quyền Theo Vai Trò (Method Level Security)**:
   - Sử dụng annotation `@PreAuthorize("hasRole('ADMIN')")` hoặc `@PreAuthorize("hasAnyRole('ADMIN', 'ADVISOR')")` trực tiếp tại tầng Controller để kiểm soát quyền thực thi.

---

## 5. Kiến Trúc WebSocket Realtime (`AdminChatWebSocketHandler`)

Hệ thống quản lý WebSocket cho Ban tư vấn được thiết kế chuyên biệt để đảm bảo tính sẵn sàng cao và an toàn luồng dữ liệu:

- **Authentication trên WebSocket**:
  - Không cho phép kết nối vô danh. Sau khi mở kết nối (Handshake), Client phải gửi tin nhắn đầu tiên chứa Token xác thực: `{"type": "AUTHENTICATE", "token": "<JWT_ACCESS_TOKEN>"}`.
  - Handler kiểm tra quyền hạn, nếu không phải là `ADMIN` hoặc `ADVISOR` sẽ chủ động ngắt kết nối với lý do `CloseStatus.NOT_ACCEPTABLE`.
- **Tránh Xung Đột Giao Dịch CSDL (`publishAfterCommit`)**:
  - Khi có sự kiện mới (Thí sinh gửi tin nhắn, phiên chat mới được tạo), thông báo WebSocket chỉ được gửi đi **sau khi giao dịch Database được Commit thành công** (`TransactionSynchronizationManager.registerSynchronization`).
- **An Toàn Đa Luồng (Thread Safety & Concurrency)**:
  - Tất cả các phiên WebSocket được bọc bởi `ConcurrentWebSocketSessionDecorator` với thời gian chờ ghi (Send Timeout) là `5.000ms` và dung lượng bộ đệm giới hạn `64KB` để tránh nghẽn luồng khi tin nhắn dồn dập.
