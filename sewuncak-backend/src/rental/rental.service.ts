import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OutfitService } from '../outfit/outfit.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalStatusDto } from './dto/update-rental-status.dto';

@Injectable()
export class RentalService {
  constructor(
    private prisma: PrismaService,
    private outfitService: OutfitService,
  ) {}

  async create(createRentalDto: CreateRentalDto) {
    const { user_id, rental_date, return_date, items } = createRentalDto;

    // Hitung jumlah hari sewa
    let days = Math.ceil(
      (new Date(return_date).getTime() - new Date(rental_date).getTime()) /
        (1000 * 60 * 60 * 24),
    );

    if (days <= 0) {
      days = 1;
    }

    // Validasi tiap outfit: cek ada & stok cukup
    const itemsWithPrice = await Promise.all(
      items.map(async (item) => {
        const outfit = await this.outfitService.findOne(item.outfit_id);

        if (outfit.stock < item.quantity) {
          throw new BadRequestException(
            `Stok "${outfit.name}" tidak cukup. Tersisa: ${outfit.stock}, diminta: ${item.quantity}`,
          );
        }

        const subtotal = outfit.price_per_day * item.quantity * days;

        return {
          outfit_id: item.outfit_id,
          quantity: item.quantity,
          price_per_day: outfit.price_per_day,
          subtotal,
        };
      }),
    );

    const total_price = itemsWithPrice.reduce((sum, i) => sum + i.subtotal, 0);

    // Transaction: create rental + rental_items + kurangi stok, sekaligus atau batal semua
    return this.prisma.$transaction(async (tx) => {
      const rental = await tx.rentals.create({
        data: {
          user_id,
          rental_date: new Date(rental_date),
          return_date: new Date(return_date),
          total_price,
          status: 'PENDING',
          rental_items: {
            create: itemsWithPrice,
          },
        },
        include: { rental_items: true },
      });

      for (const item of itemsWithPrice) {
        await tx.outfits.update({
          where: { id: item.outfit_id },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return rental;
    });
  }

  findAll() {
    return this.prisma.rentals.findMany({
      include: {
        users: { select: { name: true, email: true, phone: true } },
        rental_items: {
          include: { outfits: true },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: number) {
    const rental = await this.prisma.rentals.findUnique({
      where: { id },
      include: {
        rental_items: {
          include: { outfits: true },
        },
      },
    });

    if (!rental) {
      throw new NotFoundException(`Rental dengan id ${id} tidak ditemukan`);
    }

    return rental;
  }

  findByUser(userId: number) {
    return this.prisma.rentals.findMany({
      where: { user_id: userId },
      include: {
        rental_items: {
          include: { outfits: true },
        },
      },
    });
  }

  async updateStatus(id: number, dto: UpdateRentalStatusDto) {
    await this.findOne(id);

    return this.prisma.rentals.update({
      where: { id },
      data: { status: dto.status },
    });
  }
}