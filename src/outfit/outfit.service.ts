import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOutfitDto } from './dto/create-outfit.dto';
import { UpdateOutfitDto } from './dto/update-outfit.dto';

@Injectable()
export class OutfitService {
  constructor(private prisma: PrismaService) {}

  create(createOutfitDto: CreateOutfitDto) {
    return this.prisma.outfits.create({
      data: createOutfitDto,
    });
  }

  findAll() {
    return this.prisma.outfits.findMany();
  }

  async findOne(id: number) {
    const outfit = await this.prisma.outfits.findUnique({
      where: { id },
    });

    if (!outfit) {
      throw new NotFoundException(`Outfit dengan id ${id} tidak ditemukan`);
    }

    return outfit;
  }

  async update(id: number, updateOutfitDto: UpdateOutfitDto) {
    await this.findOne(id);

    return this.prisma.outfits.update({
      where: { id },
      data: updateOutfitDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.outfits.delete({
      where: { id },
    });
  }
}