import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5433/sewuncak?schema=public';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.users.upsert({
    where: { email: 'admin@sewuncak.com' },
    update: {},
    create: {
      name: 'Admin Sewuncak',
      email: 'admin@sewuncak.com',
      password: adminPassword,
      phone: '081234567890',
      address: 'Malang, Jawa Timur',
      role: 'ADMIN',
    },
  });
  console.log('Created Admin user:', admin.email);

  // Initial Outfits
  const outfitsData = [
    {
      name: 'Tenda Eiger North Mountain 2P',
      category: 'Tenda & Shelter',
      description: 'Tenda double layer waterproof kapasitas 2 orang tahan angin kencang.',
      size: '2 Person',
      color: 'Emerald Orange',
      price_per_day: 35000,
      stock: 8,
      image_url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800',
      status: 'AVAILABLE',
    },
    {
      name: 'Carrier Consina Tarebbi 60L',
      category: 'Carrier & Tas',
      description: 'Tas gunung kapasitas 60 liter dengan sistem sirkulasi udara di punggung.',
      size: '60 Liter',
      color: 'Navy Blue',
      price_per_day: 25000,
      stock: 12,
      image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      status: 'AVAILABLE',
    },
    {
      name: 'Sepatu Tracking SNIPE Waterproof',
      category: 'Sepatu Tracking',
      description: 'Sepatu gunung sol tinggi anti slip dengan pergelangan pelindung ankle.',
      size: '42 EU',
      color: 'Black Brown',
      price_per_day: 30000,
      stock: 6,
      image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      status: 'AVAILABLE',
    },
    {
      name: 'Jaket Windproof Mountain Hardwear',
      category: 'Jaket & Outfit',
      description: 'Jaket tahan angin dan gerimis dengan bulu sintetis bagian dalam hangat.',
      size: 'L',
      color: 'Dark Olive',
      price_per_day: 20000,
      stock: 10,
      image_url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
      status: 'AVAILABLE',
    },
    {
      name: 'Kompor Portable Camping & Cooking Set',
      category: 'Alat Masak',
      description: 'Set kompor kovar dan nesting anodized 4 in 1 praktis untuk mendaki.',
      size: 'Compact',
      color: 'Silver Gray',
      price_per_day: 15000,
      stock: 15,
      image_url: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=800',
      status: 'AVAILABLE',
    },
    {
      name: 'Headlamp LED Cob Rechargeable 500LM',
      category: 'Penerangan',
      description: 'Senter kepala terang tahan air dengan baterai charge tipe C.',
      size: 'Adjustable',
      color: 'Black Red',
      price_per_day: 10000,
      stock: 20,
      image_url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&q=80&w=800',
      status: 'AVAILABLE',
    },
  ];

  for (const item of outfitsData) {
    const existing = await prisma.outfits.findFirst({ where: { name: item.name } });
    if (!existing) {
      await prisma.outfits.create({ data: item });
    }
  }
  console.log('Outfits seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
