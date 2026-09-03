import { Module } from '@nestjs/common';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { OutfitModule } from 'src/outfit/outfit.module';

@Module({
  imports: [OutfitModule],
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
