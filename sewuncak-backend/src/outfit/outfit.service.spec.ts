import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { UpdateOutfitDto } from './dto/update-outfit.dto';

@Injectable()
export class OutfitService {
  constructor(private prisma: PrismaService) {}

  create(createOutfitDto: CreateOutfitDto) {
    return this.prisma.outfit.create({
      data: createOutfitDto,
    });
  }

  findAll() {
    return this.prisma.outfit.findMany();
  }

  async findOne(id: string) {
    const outfit = await this.prisma.outfit.findUnique({
      where: { id },
    });

    if (!outfit) {
      throw new NotFoundException(`Outfit dengan id ${id} tidak ditemukan`);
    }

    return outfit;
  }

  async update(id: string, updateOutfitDto: UpdateOutfitDto) {
    await this.findOne(id); // memastikan outfit ada dulu sebelum update

    return this.prisma.outfit.update({
      where: { id },
      data: updateOutfitDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // memastikan outfit ada dulu sebelum delete

    return this.prisma.outfits.delete({
      where: { id },
    });
  }
}