<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Một framework <a href="http://nodejs.org" target="_blank">Node.js</a> tiên tiến để xây dựng các ứng dụng server-side hiệu quả và có khả năng mở rộng.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Mô tả

Kho lưu trữ mẫu TypeScript của framework [Nest](https://github.com/nestjs/nest).

## Cài đặt dự án

```bash
$ npm install
```

## Biên dịch và chạy dự án

```bash
# môi trường phát triển (development)
$ npm run start

# chế độ watch mode
$ npm run start:dev

# môi trường sản xuất (production)
$ npm run start:prod
```

## Chạy test

```bash
# test cục bộ (unit tests)
$ npm run test

# test e2e
$ npm run test:e2e

# kiểm tra mức độ bao phủ của test (test coverage)
$ npm run test:cov
```

## Triển khai (Deployment)

Khi bạn đã sẵn sàng triển khai ứng dụng NestJS của mình lên production, có một số bước chính bạn có thể thực hiện để đảm bảo nó chạy hiệu quả nhất có thể. Hãy tham khảo [tài liệu triển khai](https://docs.nestjs.com/deployment) để biết thêm thông tin.

Nếu bạn đang tìm kiếm một nền tảng dựa trên đám mây để triển khai ứng dụng NestJS của mình, hãy xem [Mau](https://mau.nestjs.com), nền tảng chính thức của chúng tôi để triển khai các ứng dụng NestJS trên AWS. Mau giúp việc triển khai trở nên đơn giản và nhanh chóng, chỉ yêu cầu vài bước cơ bản:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

Với Mau, bạn có thể triển khai ứng dụng của mình chỉ trong vài cú nhấp chuột, cho phép bạn tập trung vào việc xây dựng tính năng thay vì quản lý cơ sở hạ tầng.

## Cách sử dụng Controller, Route và Service

NestJS tuân theo kiến trúc Module, Controller và Service. Dưới đây là cách sử dụng cơ bản:

### 1. Route (Định tuyến)
Trong NestJS, định tuyến (Routing) được xử lý thông qua các decorator bên trong Controller. Dưới đây là các loại route phổ biến:

**Các HTTP Methods cơ bản:**
```typescript
@Get() // Lấy dữ liệu
@Post() // Tạo dữ liệu mới
@Put() // Cập nhật toàn bộ dữ liệu
@Patch() // Cập nhật một phần dữ liệu
@Delete() // Xóa dữ liệu
```

**Nhận tham số từ Route (Route Parameters & Query):**
```typescript
import { Controller, Get, Param, Query, Body, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  // VD: GET /products?sort=asc&limit=10
  @Get()
  findAll(@Query('sort') sort: string, @Query('limit') limit: number) {
    return `Lấy danh sách sản phẩm. Sort: ${sort}, Limit: ${limit}`;
  }

  // VD: GET /products/123
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Lấy sản phẩm có id là ${id}`;
  }
}
```

### 2. Controller
Controllers chịu trách nhiệm gắn kết các Route và gọi đến Service tương ứng.

Bạn có thể tạo một controller mới bằng CLI:
```bash
$ nest g controller users
```

**Ví dụ:**
```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }
}
```

### 3. Service (Xử lý logic nghiệp vụ)
Services được dùng để chứa các logic xử lý nghiệp vụ, thao tác với database và có thể được tiêm (inject) vào controller.

Tạo một service mới bằng CLI:
```bash
$ nest g service users
```

**Ví dụ một Service cơ bản:**
```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find(user => user.id === id);
  }

  create(user: any) {
    this.users.push(user);
    return user;
  }
}
```

### 4. Đăng ký vào Module
Để ứng dụng nhận diện được, bạn cần đăng ký controller và service vào một module (thường CLI sẽ tự động làm điều này cho bạn nếu bạn dùng lệnh `nest g`):

```typescript
import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
```

## Hướng dẫn sử dụng Prisma ORM
Vui lòng xem chi tiết tại [Tài liệu hướng dẫn Prisma](./prisma/README.md).

## Hệ thống Authentication (Better Auth)
Vui lòng xem chi tiết cách dùng API đăng nhập/đăng ký tại [Tài liệu hướng dẫn Better Auth](./src/auth/README.md).

## Tài nguyên

Dưới đây là một số tài nguyên hữu ích khi làm việc với NestJS:

- Truy cập [Tài liệu NestJS](https://docs.nestjs.com) để tìm hiểu thêm về framework.
- Để đặt câu hỏi và nhận hỗ trợ, vui lòng truy cập [kênh Discord](https://discord.gg/G7Qnnhy) của chúng tôi.
- Để tìm hiểu sâu hơn và có thêm kinh nghiệm thực tế, hãy xem các [khóa học](https://courses.nestjs.com/) video chính thức của chúng tôi.
- Triển khai ứng dụng của bạn lên AWS với sự trợ giúp của [NestJS Mau](https://mau.nestjs.com) chỉ trong vài cú nhấp chuột.
- Trực quan hóa biểu đồ ứng dụng của bạn và tương tác với ứng dụng NestJS theo thời gian thực bằng cách sử dụng [NestJS Devtools](https://devtools.nestjs.com).
- Cần hỗ trợ cho dự án của bạn (bán thời gian đến toàn thời gian)? Hãy xem [hỗ trợ doanh nghiệp](https://enterprise.nestjs.com) chính thức của chúng tôi.
- Để luôn cập nhật thông tin mới nhất, hãy theo dõi chúng tôi trên [X](https://x.com/nestframework) và [LinkedIn](https://linkedin.com/company/nestjs).
- Đang tìm việc, hay có công việc muốn tuyển dụng? Hãy xem [Bảng việc làm](https://jobs.nestjs.com) chính thức của chúng tôi.

## Hỗ trợ

Nest là một dự án mã nguồn mở theo giấy phép MIT. Dự án có thể phát triển nhờ vào các nhà tài trợ và sự ủng hộ của những người ủng hộ tuyệt vời. Nếu bạn muốn tham gia cùng họ, vui lòng [đọc thêm tại đây](https://docs.nestjs.com/support).

## Liên hệ

- Tác giả - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## Giấy phép

Nest được [cấp phép theo MIT](https://github.com/nestjs/nest/blob/master/LICENSE).
