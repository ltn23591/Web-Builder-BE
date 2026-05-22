# Hệ thống Authentication (Better Auth)

Dự án này sử dụng framework **Better Auth** kết hợp với thư viện `@thallesp/nestjs-better-auth` để quản lý người dùng và phiên đăng nhập (Session).

## 1. Cấu trúc Database
Better Auth tự động quản lý 4 bảng chính trong file `schema.prisma`:
- **User**: Chứa thông tin tài khoản người dùng (`name`, `email`, `password`...).
- **Session**: Quản lý các phiên đăng nhập (lưu token, thời gian hết hạn...).
- **Account**: Dành cho các tích hợp đăng nhập qua mạng xã hội (Google, Github...).
- **Verification**: Dành cho các chức năng xác thực email, đổi mật khẩu.

## 2. API Đăng nhập và Đăng ký (Có sẵn)
Thư viện đã tự động mở sẵn các endpoint API chuẩn. Bạn không cần phải code lại!

### Đăng ký tài khoản (Sign Up)
- **Method:** `POST`
- **URL:** `/api/auth/sign-up/email`
- **Body:**
```json
{
  "email": "test@example.com",
  "password": "password123",
  "name": "Tên Người Dùng"
}
```

### Đăng nhập (Sign In)
- **Method:** `POST`
- **URL:** `/api/auth/sign-in/email`
- **Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

### Đăng xuất (Sign Out)
- **Method:** `POST`
- **URL:** `/api/auth/sign-out`

## 3. Cách bảo vệ một API nội bộ của bạn
Theo mặc định của `@thallesp/nestjs-better-auth`, **TOÀN BỘ API** trong dự án đã bị khoá lại (bảo vệ bởi `AuthGuard` toàn cục). Ai không đăng nhập sẽ bị báo lỗi `401 Unauthorized`.

- Nếu bạn muốn **mở khoá** một API cho ai cũng xem được (Ví dụ: danh sách bài viết public), hãy dùng decorator `@AllowAnonymous()`:
```typescript
import { Controller, Get } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('public-data')
export class PublicDataController {
  
  @Get()
  @AllowAnonymous() // Mở khoá API này
  getPublicData() {
    return "Ai cũng xem được";
  }
}
```

- Để lấy thông tin User đang đăng nhập ở một API:
```typescript
import { Controller, Get } from '@nestjs/common';
import { Session } from '@thallesp/nestjs-better-auth';

@Controller('profile')
export class ProfileController {

  @Get()
  getProfile(@Session() session: any) {
    // Biến session chứa đầy đủ thông tin: session.user.id, session.user.email...
    return session.user;
  }
}
```
