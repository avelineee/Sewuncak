import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  // ==============================
  // PROFILE SENDIRI
  // USER & ADMIN
  // ==============================

  @Get('profile')
  @UseGuards(JwtAuthGuard)
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


  // ==============================
  // SEMUA USER
  // ADMIN ONLY
  // ==============================

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async findAll() {
    return {
      message: 'Berhasil mengambil semua user',
      data: await this.usersService.findAll(),
    };
  }
}