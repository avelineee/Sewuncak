import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  // =====================================
  // GET PROFILE SENDIRI
  // USER & ADMIN
  // =====================================

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Profile berhasil diambil',
    schema: {
      example: {
        id: 1,
        name: 'Admin Sewuncak',
        email: 'admin@sewuncak.com',
        phone: '081234567890',
        address: 'Malang',
        role: 'ADMIN',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token tidak ditemukan atau tidak valid',
  })
  async getProfile(@Req() request: any) {
    const userId = request.user.sub;

    const user = await this.usersService.findById(userId);

    if (!user) {
      return {
        message: 'User tidak ditemukan',
      };
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    };
  }

  // =====================================
  // GET SEMUA USER
  // ADMIN ONLY
  // =====================================

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Berhasil mengambil semua user',
    schema: {
      example: {
        message: 'Berhasil mengambil semua user',
        data: [
          {
            id: 1,
            name: 'Admin Sewuncak',
            email: 'admin@sewuncak.com',
            phone: '081234567890',
            address: 'Malang',
            role: 'ADMIN',
          },
          {
            id: 2,
            name: 'User Sewuncak',
            email: 'user@sewuncak.com',
            phone: '081234567891',
            address: 'Malang',
            role: 'USER',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token tidak ditemukan atau tidak valid',
  })
  @ApiResponse({
    status: 403,
    description: 'Hanya ADMIN yang dapat melihat semua user',
  })
  async findAll() {
    return {
      message: 'Berhasil mengambil semua user',
      data: await this.usersService.findAll(),
    };
  }
}