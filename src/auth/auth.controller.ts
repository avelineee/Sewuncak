import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register pengguna baru' })
  @ApiResponse({
    status: 201,
    description: 'Register berhasil',
    schema: {
      example: {
        message: 'Register berhasil',
        data: {
          id: 1,
          name: 'Admin Sewuncak',
          email: 'admin@sewuncak.com',
          phone: '081234567890',
          address: 'Malang',
          role: 'ADMIN',
        },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Email sudah digunakan',
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login pengguna' })
  @ApiResponse({
    status: 201,
    description: 'Login berhasil',
    schema: {
      example: {
        message: 'Login berhasil',
        data: {
          accessToken: 'eyJhbGciOiJIUzI1NiIs...',
          user: {
            id: 1,
            name: 'Admin Sewuncak',
            email: 'admin@sewuncak.com',
            role: 'ADMIN',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Email atau password salah',
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}