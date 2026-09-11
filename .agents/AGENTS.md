# Project Rules

## General

- Giữ coding style hiện tại.
- Không tự ý đổi business logic.
- Không thêm dependency nếu chưa cần.
- Chỉ sửa đúng phạm vi task.

## Frontend

Applies to: `client/**`

- React functional components.
- Dùng Tailwind CSS + shadcn/ui.
- Dùng lucide-react cho icon.
- API call đặt trong service.
- Không gọi axios trực tiếp trong component.
- Tách component khi file quá dài.
- Không tách component quá vụn.
- Tránh setState trực tiếp trong effect khi không cần.
- Giữ style Prettier hiện tại.

## Backend

Applies to: `server/**`

- Java 21 + Spring Boot.
- Controller chỉ xử lý request/response.
- Business logic đặt trong Service.
- Repository chỉ truy cập database.
- Không trả Entity trực tiếp.
- Dùng DTO request/response.
- Dùng MapStruct khi phù hợp.
- Dùng AppException + ErrorCode.
- Dùng @PreAuthorize cho endpoint có phân quyền.
- Dùng @Transactional cho update nhiều dữ liệu liên quan.
