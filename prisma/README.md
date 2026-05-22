# Hướng dẫn sử dụng Prisma ORM

Dự án này sử dụng Prisma làm ORM chính để thao tác với cơ sở dữ liệu.

## 1. Cấu hình kết nối Database
Trước khi sử dụng, bạn cần đảm bảo biến môi trường `DATABASE_URL` trong file `.env` đã được cấu hình đúng chuẩn kết nối PostgreSQL. Ví dụ:
```env
DATABASE_URL="postgresql://postgres:123456@localhost:5432/site_builder?schema=public"
```
*(Trong đó: `postgres` là tên đăng nhập, `123456` là mật khẩu, và `site_builder` là tên database bạn đã tạo trong pgAdmin).*

## 2. Định nghĩa Schema
Mở file `schema.prisma` và thêm các Models của bạn. Ví dụ:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

## 3. Cập nhật và đồng bộ Database
Mỗi khi bạn thay đổi file `schema.prisma`, hãy làm theo 2 bước sau:
1. Sinh lại code (để TypeScript nhận diện):
   ```bash
   $ npx prisma generate
   ```
2. Đẩy thay đổi lên Database (tạo bảng mới):
   ```bash
   $ npx prisma db push
   ```

## 4. Sử dụng Prisma trong Service
Dự án đã cấu hình sẵn `PrismaModule` toàn cục (Global). Bạn chỉ cần tiêm `PrismaService` vào bất kỳ service nào để dùng.

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Import PrismaService

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany(); // Lấy tất cả user
  }

  async create(data: any) {
    return this.prisma.user.create({ data }); // Tạo user mới
  }
}
```

## 5. Migration (Dành cho làm việc nhóm / Môi trường Production)
Lệnh `npx prisma db push` ở trên rất tiện lợi để làm nhanh (prototyping), nhưng nó sẽ không lưu lại lịch sử thay đổi của Database.
Để làm việc chuyên nghiệp, theo dõi được lịch sử các phiên bản thay đổi của CSDL, bạn nên dùng lệnh `migrate`.

### Cách tạo Migration:
Mỗi khi bạn thêm/sửa/xoá bảng trong `schema.prisma`, thay vì dùng `db push`, hãy chạy lệnh sau ở terminal:
```bash
$ npx prisma migrate dev --name ten_cua_thay_doi
```
*(Ví dụ: `npx prisma migrate dev --name init_user_table`)*

Lệnh này sẽ tự động:
1. Tạo một thư mục `prisma/migrations` chứa các file `.sql` ghi lại lịch sử thay đổi.
2. Chạy file SQL đó lên database thực tế (thay thế chức năng của db push).
3. Tự động chạy luôn `npx prisma generate` cho bạn.

### Cách apply Migration lên Server (Production):
Khi mang source code này lên Server (VPS/Hosting), bạn không dùng lệnh `dev` để tránh vô tình reset database thật. Thay vào đó, hãy chạy lệnh sau để áp dụng các file `.sql` vào CSDL của server:
```bash
$ npx prisma migrate deploy
```
