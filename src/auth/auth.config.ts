import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { createAuthMiddleware, APIError } from 'better-auth/api';

const prisma = new PrismaClient();

interface AuthResponse {
  body?: {
    code?: string;
    message?: string;
  };
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ['http://localhost:3000'],
  advanced: {
    disableOriginCheck: process.env.NODE_ENV !== 'production',
  },
  hooks: {
    // eslint-disable-next-line @typescript-eslint/require-await
    after: createAuthMiddleware(async (ctx) => {
      const response = ctx.context.returned as AuthResponse | undefined;

      if (!response || !response.body) return;

      // Xử lý lỗi Đăng nhập
      if (
        ctx.path.startsWith('/sign-in') &&
        response.body.code === 'INVALID_EMAIL_OR_PASSWORD'
      ) {
        throw new APIError('UNAUTHORIZED', {
          code: response.body.code,
          message: 'Tên đăng nhập hoặc mật khẩu không chính xác',
        });
      }

      // Xử lý lỗi Đăng ký
      if (
        ctx.path.startsWith('/sign-up') &&
        response.body.code === 'USER_ALREADY_EXISTS'
      ) {
        throw new APIError('BAD_REQUEST', {
          code: response.body.code,
          message: 'Email này đã được sử dụng!',
        });
      }

      // Có thể thêm các mã lỗi khác ở đây
      if (
        ctx.path.startsWith('/sign-up') &&
        response.body.code === 'INVALID_EMAIL'
      ) {
        throw new APIError('BAD_REQUEST', {
          code: response.body.code,
          message: 'Định dạng email không hợp lệ!',
        });
      }
    }),
  },
});
