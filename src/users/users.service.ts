import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.users.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    role?: 'USER' | 'ADMIN';
  }) {
    return this.prisma.users.create({
      data: {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      role: data.role,
      },
    });
  }
}