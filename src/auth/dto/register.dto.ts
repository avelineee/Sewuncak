import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Admin Sewuncak',
    description: 'Nama lengkap pengguna',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'admin@sewuncak.com',
    description: 'Email pengguna',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password minimal 6 karakter',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: '081234567890',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: 'Malang',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 'ADMIN',
    enum: ['USER', 'ADMIN'],
    description: 'Role pengguna',
  })
  @IsIn(['USER', 'ADMIN'])
  role: 'USER' | 'ADMIN';
}